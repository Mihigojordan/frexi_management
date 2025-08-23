import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';

@Module({
  providers: [ConversationService],
  controllers: [ConversationController],
  exports: [ConversationService], // export so MessageService can use it
})
export class ConversationModule {}
