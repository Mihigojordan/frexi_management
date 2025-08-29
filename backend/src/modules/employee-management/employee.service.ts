// src/employee/employee.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EmailService } from 'src/global/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  // Helper: generate 6-digit random number as password
  private generateRandomPassword(): string {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // ensures 6 digits
    return randomNum.toString();
  }

  // Helper: placeholder email sender
  private async sendEmail(to: string, subject: string, text: string) {
    // Replace with your own email gateway
    console.log(`📧 Sending email to ${to}: ${subject} - ${text}`);
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    profilePhoto?: string;
  }) {
    try {
      const password = this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(password, 10);

      const emailExist = await this.prisma.employee.findUnique({
        where: { email: data.email },
      });
      if (emailExist) {
        throw new BadRequestException('Email already exists');
      }
      const employee = await this.prisma.employee.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      // Send email with generated password
      await this.sendEmail(
        data.email,
        'Welcome to Frexi',
        `Hello ${data.firstName}, your account has been created. Your password is: ${password}`,
      );

      await this.emailService.sendEmail(
        String(data.email),
        '',
        `
      <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Frexi</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 20px;
        border: 1px solid #e0e0e0;
      }
      .header {
        text-align: center;
        background: #007bff;
        color: white;
        padding: 15px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        margin: 20px 0;
      }
      .password-box {
        background: #f0f4ff;
        padding: 10px;
        border: 1px dashed #007bff;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #007bff;
        margin: 20px 0;
        border-radius: 6px;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Welcome to Frexi!</h2>
      </div>
      <div class="content">
        <p>Hi ${data.firstName},</p>
        <p>
          You have been successfully registered as an employee in our system.
          Below is your temporary login password. Please log in and change it as soon as possible.
        </p>
        <div class="password-box">
          ${password}
        </div>
        <p>
          If you did not expect this email, please contact the administrator.
        </p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Frexi. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

      `,
      );

      return employee;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create employee');
    }
  }

  async findAll() {
    try {
      return await this.prisma.employee.findMany();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch employees');
    }
  }

  async findOne(id: string) {
    try {
      const employee = await this.prisma.employee.findUnique({ where: { id } });
      if (!employee) throw new NotFoundException('Employee not found');
      return employee;
    } catch (error) {
      console.error(error);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch employee');
    }
  }

  async update(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      address?: string;
      profilePhoto?: string;
    },
  ) {
    try {
      return await this.prisma.employee.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update employee');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.employee.delete({ where: { id } });
      return { message: 'Employee deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete employee');
    }
  }
}
