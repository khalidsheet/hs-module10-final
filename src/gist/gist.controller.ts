import { JwtGuard } from './../auth/guards/jwt/jwt.guard';
import { Gist } from './../models/gist.model';
import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';

@Controller('gist')
export class GistController {
  constructor(@InjectModel(Gist.name) private gistModel: Model<Gist>) {}

  @Get()
  @UseGuards(JwtGuard)
  @Render('gists/index')
  async index(@Req() req: Request) {
    const { user } = req as any;
    const gists = await this.gistModel.find({ owner: user._id }, null, {
      sort: { createdAt: -1 },
    });

    return { gists, user };
  }

  @Get('new')
  @UseGuards(JwtGuard)
  @Render('gists/new')
  create(@Req() req: Request) {
    return {
      user: req.user,
    };
  }

  @Post('new')
  @UseGuards(JwtGuard)
  @Redirect()
  async createGist(@Req() req: Request) {
    const { user } = req as any;
    const { description, code, isPrivate } = req.body;
    await this.gistModel.create({
      description,
      code,
      isPrivate: isPrivate !== 'on' ? true : false,
      owner: user._id,
    });

    return {
      url: '/gist',
    };
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @Render('gists/show')
  async show(@Req() req: Request) {
    const { id } = req.params;
    const gist = await this.gistModel.findById(id);
    const { user } = req as any;

    if (!gist) {
      return {
        user: req.user,
        error: 'Gist not found',
      };
    }

    if (gist.isPrivate && gist.owner.toString() !== user._id.toString())
      return {
        user: req.user,
        error: 'You are not authorized to view this gist',
      };

    return {
      gist,
      user: req.user,
    };
  }
}
