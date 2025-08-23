import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SenderType } from '../../../generated/prisma/client';
import { ConversationService } from '../conversation-management/conversation.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private conversationService: ConversationService,
  ) {}

  async sendMessage(data: {
    conversationId: string;
    senderType: SenderType;
    senderAdminId?: string;
    senderUserId?: string;
    text: string;
  }) {
     console.log(data);
        
    return this.prisma.message.create({
      data: {
        conversationId: data.conversationId,
        senderType: data.senderType,
        senderAdminId: data.senderAdminId,
        senderUserId: data.senderUserId,
        text: data.text,
      },
    });
  }

  async getMessages(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: { senderAdmin: true, senderUser: true },
    });
  }
}
