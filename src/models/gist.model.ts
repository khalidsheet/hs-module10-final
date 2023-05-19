import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.model';
import mongoose from 'mongoose';

@Schema()
export class Gist {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  code: string;

  @Prop()
  tags: string[];

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop()
  isPrivate: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: User;
}
