import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  sendMessage() {
    return { message: 'Message sent!' };
  }
}
    