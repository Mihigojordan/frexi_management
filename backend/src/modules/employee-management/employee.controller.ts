// src/employee/employee.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  EmployeeFileFields,
  EmployeeUploadConfig,
} from 'src/common/utils/file-upload.util';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(EmployeeFileFields, EmployeeUploadConfig),
  )
  async create(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      address?: string;
      profilePhoto?: string;
    },
    @UploadedFiles()
    file: {
      profilePhoto: Express.Multer.File[];
    },
  ) {
    try {
      if (file.profilePhoto) {
        body.profilePhoto = `/uploads/profile_photos/${file.profilePhoto[0]?.filename}`;
      }
      return await this.employeeService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.employeeService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.employeeService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(EmployeeFileFields, EmployeeUploadConfig),
  )
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      address?: string;
      profilePhoto?: string;
    },
    @UploadedFiles()
    file: {
      profilePhoto: Express.Multer.File[];
    },
  ) {
    try {
      if (file.profilePhoto) {
        body.profilePhoto = `/uploads/profile_photos/${file.profilePhoto[0]?.filename}`;
      }
      return await this.employeeService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.employeeService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
