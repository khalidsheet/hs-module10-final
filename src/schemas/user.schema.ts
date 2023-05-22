import { User } from './../models/user.model';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocuemnt = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
