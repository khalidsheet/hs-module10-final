import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async generateJwt(payload: any) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1y',
    });
  }

  async signInWithGoogle(user: any) {
    console.log({ user });

    const userDocument = await this.userModel.findOneAndUpdate(
      { email: user.email },
      {
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        avatar: user.picture,
      },
      { upsert: true, new: true },
    );

    const payload = { ...userDocument, sub: user.email };

    return {
      access_token: await this.generateJwt(payload),
      user: user,
    };
  }
}
