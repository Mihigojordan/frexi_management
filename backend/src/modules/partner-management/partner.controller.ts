import { Controller, Get, Post, Patch, Delete, Body, Param, UseInterceptors, UploadedFile, UploadedFiles, Put } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PartnerFileField, PartnerUploadConfig } from 'src/common/utils/file-upload.util';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor( PartnerFileField, PartnerUploadConfig ))
  create(@Body() body: any , @UploadedFiles() file: {
    partnerImg: Express.Multer.File[]
  } ) {
    const imageUrl = `uploads/partners_photos/${file.partnerImg[0]?.filename}`
    return this.partnerService.create({
        ...body,
        imageUrl
    });
  }

  @Get()
  findAll() {
    return this.partnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(id);
  }

  @Put(':id')
   @UseInterceptors(FileFieldsInterceptor( PartnerFileField, PartnerUploadConfig ))
  update(@Param('id') id: string, @Body() body: any , @UploadedFiles() file: {
    partnerImg?: Express.Multer.File[]
  }) {
    if(file.partnerImg){
        body.imageUrl = `uploads/partners_photos/${file.partnerImg[0]?.filename}`
    }
    return this.partnerService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerService.remove(id);
  }
}
