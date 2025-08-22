import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  // Create a conversation for a user if not exists
  async getOrCreateConversation(userId: string) {
    let conversation = await this.prisma.conversation.findUnique({
      where: { userId },
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: { userId },
      });
    }
    return conversation;
  }

  // Get all conversations (for admins)
  async getAllConversations() {
    return this.prisma.conversation.findMany({
      include: { user: true, messages: true },
    });
  }

  // Get a single conversation by ID
  async getConversationById(conversationId: string) {
    return this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });
  }
}
