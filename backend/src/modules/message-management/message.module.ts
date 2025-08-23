import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConversationModule } from '../conversation-management/conversation.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ConversationModule],
  providers: [MessageService, ChatGateway],
  controllers: [MessageController],
})
export class MessageModule {}
