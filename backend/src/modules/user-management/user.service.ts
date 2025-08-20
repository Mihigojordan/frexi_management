import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // REGISTER and LOGIN directly
  async register(data: { firstname?: string; lastname?: string; email: string; phoneNumber: string; password: string }) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.user.create({
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: hashedPassword,
        },
      });

      const token = await this.generateToken(user.id);

      return token ;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log('error:',error)
      throw new InternalServerErrorException('An error occurred during registration');
    }
  }

  // LOGIN
  async login(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

      const token = await this.generateToken(user.id);

      return token ;
    } catch (error) {
        console.log('error:',error)
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('An error occurred during login');
    }
  }

  // GET logged-in user's info
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, firstname: true, lastname: true, email: true, phoneNumber: true, createdAt: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // UPDATE logged-in user's info
  async updateProfile(userId: string, data: { firstname?: string; lastname?: string; phoneNumber?: string }) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data,
        select: { id: true, firstname: true, lastname: true, email: true, phoneNumber: true, createdAt: true },
      });
      return user;
    } catch(error) {
        console.log('error:',error)
      throw new InternalServerErrorException('Failed to update profile');
    }
  }
  // CHANGE password
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) throw new ForbiddenException('Old password is incorrect');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }
  // DELETE account
  async deleteAccount(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
    return { message: 'Account deleted successfully' };
  }
  // GENERATE TOKEN
  private async generateToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }
}
