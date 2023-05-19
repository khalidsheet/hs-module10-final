import { Module } from '@nestjs/common';
import { GistService } from './gist.service';
import { GistController } from './gist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GistSchema } from 'src/schemas/gist.schema';
import { Gist } from 'src/models/gist.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gist.name, schema: GistSchema }]),
  ],
  providers: [GistService],
  controllers: [GistController],
})
export class GistModule {}
