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
  HttpException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  DestinationFileFields,
  DestinationUploadConfig,
} from 'src/common/utils/file-upload.util';
import { TourService } from './tour.service';

@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(DestinationFileFields, DestinationUploadConfig),
  )
  async create(
    @Body() createDestinationData: any,
    @UploadedFiles()
    files: {
      mainPhotoUrl?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
  ) {
    try {
      const mainPhotoUrl = `uploads/destination-main-photos/${files.mainPhotoUrl?.[0].filename}`;
      const gallery = files.gallery?.map(
        (file) => `uploads/gallery/${file.filename}`,
      );
      return await this.tourService.create({
        ...createDestinationData,
        mainPhotoUrl,
        gallery,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tourService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('active')
  async findActive() {
    try {
      return await this.tourService.findActive();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('search')
  async search(@Query('q') query: string) {
    try {
      return await this.tourService.search(query);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('country/:country')
  async findByCountry(@Param('country') country: string) {
    try {
      return await this.tourService.findByCountry(country);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.tourService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(DestinationFileFields, DestinationUploadConfig),
  )
  async update(
    @Param('id') id: string,
    @Body() updateDestinationData: any,
    @UploadedFiles()
    files?: {
      mainPhotoUrl?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
  ) {
    try {
      if (files?.mainPhotoUrl) {
        updateDestinationData.mainPhotoUrl = `uploads/destination-main-photos/${files.mainPhotoUrl[0].filename}`;
      }
      return await this.tourService.update(id, updateDestinationData);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.tourService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id/soft-delete')
  async softDelete(@Param('id') id: string) {
    try {
      return await this.tourService.softDelete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
