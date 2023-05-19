import { UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/models/user.model';

export interface JwtPayload {
  sub: string;
  user: Partial<User>;
}

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    const jwtFromCookie = (req: any) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['uni_auth'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: jwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userModel.findOne({ email: payload.sub });

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      ...user.toJSON(),
      email: payload.sub,
    };
  }
}
