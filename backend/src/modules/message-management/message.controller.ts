import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { SenderType } from '../../../generated/prisma/client';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':conversationId')
  sendMessage(
    @Param('conversationId') conversationId: string,
    @Body()
    body: { senderType: SenderType; senderAdminId?: string; senderUserId?: string; text: string },
  ) {
    return this.messageService.sendMessage({
      conversationId,
      ...body,
    });
  }

  @Get(':conversationId')
  getMessages(@Param('conversationId') conversationId: string) {
    return this.messageService.getMessages(conversationId);
  }
}
