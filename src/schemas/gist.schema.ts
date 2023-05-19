import { SchemaFactory } from '@nestjs/mongoose';
import { Gist } from '../models/gist.model';
import { HydratedDocument } from 'mongoose';

export type GistDocuemnt = HydratedDocument<Gist>;
export const GistSchema = SchemaFactory.createForClass(Gist);
