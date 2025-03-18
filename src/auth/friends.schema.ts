import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Friend extends Document {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ default: 'pending' })  // Ensure this field exists
  status: string;  // Make sure it's lowercase
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
