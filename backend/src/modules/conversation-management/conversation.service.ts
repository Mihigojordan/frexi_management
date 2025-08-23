import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationService {
    constructor(private prisma: PrismaService) { }

    // Create a conversation for a user if not exists
    async getOrCreateConversation(userId: string) {
        let conversation = await this.prisma.conversation.findUnique({
            where: { userId },
            include: {
                    messages: {
                        include: {
                            senderUser: true,
                            senderAdmin: true
                        }
                    },
                    user: true
                }
        });

        if (!conversation) {
            conversation = await this.prisma.conversation.create({
                data: { userId },
                include: {
                    messages: {
                        include: {
                            senderUser: true,
                            senderAdmin: true
                        }
                    },
                    user: true
                }
            });
        }
        return conversation;
    }

    // Get all conversations (for admins)
    async getAllConversations() {
        const conversations = await this.prisma.conversation.findMany({
            include: {
                user: true, 
                messages: {
                    include: {
                        senderUser: true,
                        senderAdmin: true
                    }
                }
            },
        });
        // console.log(conversations);
        return conversations;
        
    }

    // Get a single conversation by ID
    async getConversationById(conversationId: string) {
        return this.prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                messages: {
                    include: {
                        senderUser: true,
                        senderAdmin: true
                    }
                },
                user: true
            },
        });
    }
}
