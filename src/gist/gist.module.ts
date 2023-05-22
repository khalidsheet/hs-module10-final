import { Gist } from './../models/gist.model';
import { Module } from '@nestjs/common';
import { GistService } from './gist.service';
import { GistController } from './gist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GistSchema } from './../schemas/gist.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gist.name, schema: GistSchema }]),
  ],
  providers: [GistService],
  controllers: [GistController],
})
export class GistModule {}
