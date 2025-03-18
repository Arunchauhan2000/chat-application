import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(
    @Body() body: { senderId: string; receiverId: string; message: string },
  ) {
    return this.chatService.sendMessage(
      body.senderId,
      body.receiverId,
      body.message,
    );
  }

  @Get('messages')
  async getMessages(
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string,
  ) {
    return this.chatService.getMessages(senderId, receiverId);
  }
}
