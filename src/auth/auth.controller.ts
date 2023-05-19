/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './guards/google/google.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/callback/google')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const data = await this.authService.signInWithGoogle(req.user);

    res.cookie('uni_auth', data.access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    return res.redirect('/gist');
  }

  @Get('signout')
  logout(@Res() res: Response) {
    res.clearCookie('uni_auth');
    return res.redirect('/');
  }
}
