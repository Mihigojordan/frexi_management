import { Module } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import { ContactMessageController } from './contact-message.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ContactMessageController],
  providers: [ContactMessageService, PrismaService],
})
export class ContactMessageModule {}
