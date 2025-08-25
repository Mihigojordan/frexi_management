import { Controller, Get, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get(':userId')
  getOrCreate(@Param('userId') userId: string) {
    return this.conversationService.getOrCreateConversation(userId);
  }

  @Get()
  getAll() {
    return this.conversationService.getAllConversations();
  }

  @Get('id/:conversationId')
  getById(@Param('conversationId') conversationId: string) {
    return this.conversationService.getConversationById(conversationId);
  }
}
