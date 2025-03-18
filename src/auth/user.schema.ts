import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profilePic: string;

  @Prop({ default: false })  // Ensure this field exists
  isVerified: boolean;

  @Prop()
  verificationToken: string;  // Ensure this field exists
}

export const UserSchema = SchemaFactory.createForClass(User);
