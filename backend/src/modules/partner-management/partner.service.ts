import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { deleteFile } from 'src/common/utils/file-upload.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartnerService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.partner.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.partner.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const partner = await this.prisma.partner.findUnique({ where: { id } });
      if (!partner) throw new NotFoundException('Partner not found');
      return partner;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, data: any) {
    try {
      const  partner = await this.findOne(id); // ensure exists

      if(data.imageUrl){
        deleteFile(String(partner.imageUrl))
      }
      return await this.prisma.partner.update({ where: { id }, data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      return await this.prisma.partner.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
