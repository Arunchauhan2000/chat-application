import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async sendMessage(senderId: string, receiverId: string, message: string) {
    const newMessage = new this.chatModel({ senderId, receiverId, message });
    return newMessage.save();
  }

  async getMessages(senderId: string, receiverId: string) {
    return this.chatModel
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ createdAt: 1 })
      .exec();
  }
}
