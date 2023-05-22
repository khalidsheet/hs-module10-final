import { UserSchema } from 'src/schemas/user.schema';
import { User } from './../models/user.model';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategy/GoogleAuth.stratgey';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './strategy/jwt.stratgey';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, GoogleStrategy],
})
export class AuthModule {}
