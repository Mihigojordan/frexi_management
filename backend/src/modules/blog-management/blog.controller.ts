import { Controller, Get, Post, Patch, Delete, Body, Param, UseInterceptors, UploadedFile, UploadedFiles, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BlogFileField, BlogUploadConfig } from 'src/common/utils/file-upload.util';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor(BlogFileField, BlogUploadConfig))
  create(@Body() body: any, @UploadedFiles() file: {
    blogImg: Express.Multer.File[]
  }) {
    const imageUrl = `uploads/blog_photos/${file.blogImg[0]?.filename}`;
    return this.blogService.create({
      ...body,
      imageUrl
    });
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor(BlogFileField, BlogUploadConfig))
  update(@Param('id') id: string, @Body() body: any, @UploadedFiles() file: {
    blogImg?: Express.Multer.File[]
  }) {
    if (file.blogImg) {
      body.imageUrl = `uploads/blog_photos/${file.blogImg[0]?.filename}`;
    }
    return this.blogService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}