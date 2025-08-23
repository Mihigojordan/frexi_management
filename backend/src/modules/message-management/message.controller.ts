import { Controller, Post, Get, Param, Body, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { MessageService } from './message.service';
import { SenderType } from '../../../generated/prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ChatFileField, ChatUploadConfig } from 'src/common/utils/file-upload.util';
import { ConversationService } from '../conversation-management/conversation.service';
import { ChatGateway } from './chat.gateway';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
    private readonly chatGateWay: ChatGateway,
  ) {}

  @Post(':conversationId')
  @UseInterceptors(FileFieldsInterceptor(ChatFileField, ChatUploadConfig))
  async sendMessage(
    @Param('conversationId') conversationId: string,
    @Body()
    body: { senderType: SenderType; senderAdminId?: string; senderUserId?: string; text: string },
    @UploadedFiles() file: {
      chatImg?: Express.Multer.File[]
    }
  ) {
    // Fixed: Check if file and chatImg array exist before accessing
    const imageUrl = file?.chatImg?.[0]?.filename 
      ? `uploads/chat_photos/${file.chatImg[0].filename}` 
      : undefined;

    const message = await this.messageService.sendMessage({
      conversationId,
      ...body,
      imageUrl,
    });

    const conversation = await this.conversationService.getConversationById(conversationId);
    const room = `room_user_${conversation?.id}`;
    console.log('sent message to room : ', room);
    
    return {conversation,message}
  }

  @Get(':conversationId')
  getMessages(@Param('conversationId') conversationId: string) {
    return this.messageService.getMessages(conversationId);
  }
}