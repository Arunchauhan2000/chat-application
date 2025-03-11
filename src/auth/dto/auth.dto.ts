export class RegisterDto {
    name: string;
    email: string;
    password: string;
    profilePic?: string;
  }
  
  export class LoginDto {
    email: string;
    password: string;
  }
  