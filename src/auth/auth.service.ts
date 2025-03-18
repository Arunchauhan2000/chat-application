import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Friend } from './friends.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Friend.name) private friendModel: Model<Friend>,
    private jwtService: JwtService,
  ) {}

  async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'developertwo@espsofttech.com',
        pass: 'Espsoft123#',
      },
    });

    await transporter.sendMail({
      from: 'developertwo@espsofttech.com',
      to: 'arunpratapsingh052@gmail.com',
      subject,
      text,
    });
  }

  async register(
    name: string,
    email: string,
    password: string,
    profilePic: string,
  ) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    const user = new this.userModel({
      userId: uuidv4(),
      name,
      email,
      password: hashedPassword,
      profilePic,
      isVerified: false,
      verificationToken,
    });

    await user.save();

    const verificationLink = `http://localhost:5000/auth/verify/${verificationToken}`;
    await this.sendEmail(
      email,
      'Verify Your Email',
      `Click the link to verify your email: ${verificationLink}`,
    );

    return { message: 'Registration successful! Please verify your email.' };
  }

  async verifyEmail(token: string) {
    const user = await this.userModel.findOne({ verificationToken: token });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    await user.save();

    return { message: 'Email verified successfully! You can now log in.' };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new BadRequestException(
        'Please verify your email before logging in.',
      );
    }

    const token = this.jwtService.sign({ id: user.userId, email: user.email });
    return {
      token,
      userId: user.userId,
      name: user.name,
      profilePic: user.profilePic,
    };
  }

  async getAllUsers() {
    return this.userModel.find().select('userId name email profilePic');
  }

  async addFriend(senderId: string, receiverId: string) {
    console.log('Sender ID:', senderId);
    console.log('Receiver ID:', receiverId);

    const sender = await this.userModel.findOne({ userId: senderId });
    const receiver = await this.userModel.findOne({ userId: receiverId });
  
    if (!sender || !receiver) {
      throw new NotFoundException('One or both users not found');
    }
  
    const existingRequest = await this.friendModel.findOne({
      senderId,
      receiverId,
    });
  
    if (existingRequest) {
      throw new BadRequestException('Friend request already sent');
    }
  
    const newFriendRequest = new this.friendModel({
      senderId,
      receiverId,
      status: 'Accept',
    });
  
    await newFriendRequest.save();
  
    await this.sendEmail(
      receiver.email,
      'New Friend Request',
      `${sender.name} has sent you a friend request.`
    );
  
    return { message: 'Friend request sent successfully' };
  }
}  