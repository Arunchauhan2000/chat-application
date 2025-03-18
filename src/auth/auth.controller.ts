import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      profilePic: string;
    },
  ) {
    return this.authService.register(
      body.name,
      body.email,
      body.password,
      body.profilePic,
    );
  }

  @Post('verify/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Get('getAllUsers')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Post('addFriend')
  async addFriend(@Body() body: { senderId: string; receiverId: string }) {
    if (!body.senderId || !body.receiverId) {
      throw new BadRequestException(
        'Both senderId and receiverId are required',
      );
    }
    return this.authService.addFriend(body.senderId, body.receiverId);
  }
}
