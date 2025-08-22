import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { ConversationService } from '../conversation-management/conversation.service';
import { SenderType } from '../../../generated/prisma/client';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
  ) {}

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `room_user_${data.userId}`;
    client.join(room);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      conversationId: string;
      senderType: SenderType;
      senderAdminId?: string;
      senderUserId?: string;
      text: string;
    },
  ) {
    const message = await this.messageService.sendMessage(data);
    const conversation = await this.conversationService.getConversationById(data.conversationId);
    const room = `room_user_${conversation?.userId}`;

    this.server.to(room).emit('newMessage', {
      id: message.id,
      text: message.text,
      senderType: message.senderType,
      senderAdminId: message.senderAdminId,
      senderUserId: message.senderUserId,
      createdAt: message.createdAt,
    });
  }

 
}
