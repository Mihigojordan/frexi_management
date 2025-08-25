import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContactMessageService {
  constructor(private prisma: PrismaService) {}

  // Create new message
  async create(data: { firstName: string; email: string; message: string }) {
    return this.prisma.contactMessage.create({ data });
  }

  // Get all messages
  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get single message by ID
  async findOne(id: number) {
    return this.prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  // Delete message by ID
  async remove(id: number) {
    return this.prisma.contactMessage.delete({
      where: { id },
    });
  }
}
