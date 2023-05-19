import { Prop, Schema } from '@nestjs/mongoose';
import { Gist } from './gist.model';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  avatar: string;

  @Prop()
  googleId: string;

  @Prop([Gist])
  gists: Gist[];
}
