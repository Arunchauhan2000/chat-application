import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers() {
    return [{ name: 'John Doe', email: 'john@example.com' }];
  }
}
