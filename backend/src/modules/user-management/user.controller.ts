import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { RequestWithUser } from 'src/common/interfaces/user.interface';
import { UserJwtAuthGuard } from 'src/guards/userGuard.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      firstname?: string;
      lastname?: string;
      email: string;
      phoneNumber: string;
      password: string;
    },
    @Res() res: Response,
  ) {
    try {
      const token = await this.userService.register(body);

      res.cookie('AccessUserToken', token, {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: 'none', // Required for cross-origin cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        message: 'user registered successfully',
        authenticated: true,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const token = await this.userService.login(body.email, body.password);
      res.cookie('AccessUserToken', token, {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: 'none', // Required for cross-origin cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        message: 'user logged in successfully',
        authenticated: true,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('me')
  @UseGuards(UserJwtAuthGuard)
  async getProfile(@Req() req: RequestWithUser) {
    try {
      const userId = req.user?.id as string;
      return await this.userService.getProfile(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('edit')
  updateProfile(
    @Req() req,
    @Body()
    body: { firstname?: string; lastname?: string; phoneNumber?: string },
  ) {
    return this.userService.updateProfile(req.user.userId, body);
  }

  @Patch('me/password')
  changePassword(
    @Req() req,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    return this.userService.changePassword(
      req.user.userId,
      body.oldPassword,
      body.newPassword,
    );
  }

  @Delete('me')
  deleteAccount(@Req() req) {
    return this.userService.deleteAccount(req.user.userId);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('AccessUserToken', {
        httpOnly: true,
        secure: true, // <-- Required for SameSite=None in production
        sameSite: 'none', // <-- Required for cross-origin cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return { message: 'logged out successfully' };
    } catch (error) {
      console.log('error logging out:', error);
      throw new Error(error.message);
    }
  }
}
