import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { deleteFile } from 'src/common/utils/file-upload.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestimonialService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.testimonial.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const testimonial = await this.prisma.testimonial.findUnique({
        where: { id },
      });
      if (!testimonial) throw new NotFoundException('Testimonial not found');
      return testimonial;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, data: any) {
    try {
      await this.findOne(id); // ensure exists
      return await this.prisma.testimonial.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const testimonial = await this.findOne(id); // ensure exists
      // ✅ Delete main image if exists
      if (testimonial.imageUrl) {
        deleteFile(testimonial.imageUrl);
      }
      return await this.prisma.testimonial.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
