import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Put,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { TestimonialService } from './testmonial.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  TestmonialFileFields,
  TestmonialUploadConfig,
} from 'src/common/utils/file-upload.util';

@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(TestmonialFileFields, TestmonialUploadConfig),
  )
  async create(
    @Body() body: any,
    @UploadedFiles()
    files: {
      imageUrl?: Express.Multer.File[];
    },
  ) {
    const imageUrl = `uploads/testmonial-photos/${files.imageUrl?.[0].filename}`;
    return await this.testimonialService.create({
      ...body,
      imageUrl,
      rating: Number(body.rating)
    });
  }

  @Get()
  async findAll() {
    return await this.testimonialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.testimonialService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(TestmonialFileFields, TestmonialUploadConfig),
  )
  async update(@Param('id') id: string, @Body() body: any, @UploadedFiles() files: {
    imageUrl?: Express.Multer.File[]
  } ) {
    if(files.imageUrl){
        body.imageUrl = `uploads/testmonial-photo/${files.imageUrl?.[0].filename}`
    }
    return await this.testimonialService.update(id, {
        ...body,
        rating: Number(body.rating)
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.testimonialService.remove(id);
  }
}
