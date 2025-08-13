import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  Query,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFiles,
  HttpException
} from '@nestjs/common';
import { DestinationService } from './destination.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DestinationFileFields, DestinationUploadConfig } from 'src/common/utils/file-upload.util';

@Controller('destinations')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(DestinationFileFields,DestinationUploadConfig)
  )
  async create(@Body() createDestinationData: any, @UploadedFiles() files:{
    mainPhotoUrl?: Express.Multer.File[],
    gallery?:Express.Multer.File[]
  }) {
    try {
        const mainPhotoUrl = `uploads/destination-main-photos/${files.mainPhotoUrl?.[0].filename}`
        const gallery =  files.gallery?.map(
            (file) => `uploads/gallery/${file.filename}`
        )
      return await this.destinationService.create({
        ...createDestinationData,
        mainPhotoUrl,
        gallery
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.destinationService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('active')
  async findActive() {
    try {
      return await this.destinationService.findActive();
    } catch (error) {
     throw new HttpException(error.message, error.status);
    }
  }

  @Get('search')
  async search(@Query('q') query: string) {
    try {
      return await this.destinationService.search(query);
    } catch (error) {
     throw new HttpException(error.message, error.status);
    }
  }

  @Get('country/:country')
  async findByCountry(@Param('country') country: string) {
    try {
      return await this.destinationService.findByCountry(country);
    } catch (error) {
     throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.destinationService.findOne(id);
    } catch (error) {
     throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(DestinationFileFields,DestinationUploadConfig)
  )
  async update(@Param('id') id: string, @Body() updateDestinationData: any, @UploadedFiles() files?:{
    mainPhotoUrl?: Express.Multer.File[],
    gallery?:Express.Multer.File[]
  } ) {
    try {
        if(files?.mainPhotoUrl){
            updateDestinationData.mainPhotoUrl = `uploads/destination-main-photos/${files.mainPhotoUrl[0].filename}`
        }
      return await this.destinationService.update(id, updateDestinationData);
    } catch (error) {
     throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.destinationService.remove(id);
    } catch (error) {
     throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id/soft-delete')
  async softDelete(@Param('id') id: string) {
    try {
      return await this.destinationService.softDelete(id);
    } catch (error) {
     throw new HttpException(error.message, error.status);
    }
  }
}
