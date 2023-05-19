import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/models/user.model';

export type UserDocuemnt = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
