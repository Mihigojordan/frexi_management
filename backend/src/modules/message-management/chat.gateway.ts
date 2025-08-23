import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ConversationService } from '../conversation-management/conversation.service';
import { SenderType } from '../../../generated/prisma/client';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    private adminMap = new Map<string, Socket>();
    private userMap = new Map<string, Socket>();
    // Reverse maps to track which user/admin ID corresponds to each socket
    private socketToAdminMap = new Map<string, string>();
    private socketToUserMap = new Map<string, string>();

    constructor(
        private readonly conversationService: ConversationService,
    ) {}

    /**
     * Handle client disconnection
     */
    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        
        // Check if disconnected client was an admin
        const adminId = this.socketToAdminMap.get(client.id);
        if (adminId) {
            this.removeAdmin(adminId);
            console.log(`Admin ${adminId} disconnected`);
        }

        // Check if disconnected client was a user
        const userId = this.socketToUserMap.get(client.id);
        if (userId) {
            this.removeUser(userId);
            console.log(`User ${userId} disconnected`);
        }
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @MessageBody() data: { userId: string, adminId: string, conversationId: string },
        @ConnectedSocket() client: Socket,
    ) {
        if (data.conversationId && data.adminId) {
            const conversation = await this.conversationService.getConversationById(data.conversationId);
            const room = `room_user_${conversation?.id}`;
            
            this.adminMap.set(data.adminId, client);
            this.socketToAdminMap.set(client.id, data.adminId);
            
            console.log('joined room admin : ', room);
            client.join(room);
        }
        else if (data.userId) {
            const conversation = await this.conversationService.getOrCreateConversation(data.userId);
            const room = `room_user_${conversation?.id}`;
            
            this.userMap.set(data.userId, client);
            this.socketToUserMap.set(client.id, data.userId);
            
            console.log('joined room user : ', room);
            client.join(room);
        }
    }

    @SubscribeMessage('goOnline')
    async handleGoOnline(
        @MessageBody() data: { userId: string, adminId: string },
        @ConnectedSocket() client: Socket,
    ) {
        if (data.adminId) {
            this.adminMap.set(data.adminId, client);
            this.socketToAdminMap.set(client.id, data.adminId);

            
        }
        else if (data.userId) {
            this.userMap.set(data.userId, client);
            this.socketToUserMap.set(client.id, data.userId);
                        
        }
        
        this.server.emit('onlineAdmin', {
            isOnline: Boolean(Number(this.adminMap.size))
        });
        const users = Array.from(this.userMap.keys());
            console.log('online users', users);
            
            this.server.emit('onlineUsers', {
                onlineUsers: users
            });
        console.log( 'this user Online',Number(this.userMap.size));
        console.log( 'this admin Online', Number(this.adminMap.size));
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody()
        data: {
            conversation: any;
        },
        @ConnectedSocket() client: Socket,
    ) {
        const room = `room_user_${data.conversation?.id}`;
        console.log('sent message to room : ', room);
        console.log('conversation', data.conversation);

        client.to(room).emit('newMessage', {
            conversation: data.conversation
        });
    }

    @SubscribeMessage('goOffline')
    async handleGoOffline(
        @MessageBody() data: { userId: string, adminId: string },
        @ConnectedSocket() client: Socket,
    ) {
        if (data.adminId) {
            this.removeAdmin(data.adminId);
            console.log(`Admin ${data.adminId} manually went offline`);
        }
        else if (data.userId) {
            this.removeUser(data.userId);
            console.log(`User ${data.userId} manually went offline`);
        }
    }

    /**
     * Remove admin from online maps and emit offline event
     */
    private removeAdmin(adminId: string) {
        const adminSocket = this.adminMap.get(adminId);
        if (adminSocket) {
            this.adminMap.delete(adminId);
            this.socketToAdminMap.delete(adminSocket.id);
            
            console.log(`Admin ${adminId} removed. Remaining admins: ${this.adminMap.size}`);
            
            // Emit admin offline status
            this.server.emit('onlineAdmin', {
                isOnline: Boolean(Number(this.adminMap.size))
            });
            
            // Emit specific admin offline event
            this.server.emit('adminOffline', {
                adminId: adminId,
                totalOnlineAdmins: this.adminMap.size
            });
        }
    }

    /**
     * Remove user from online maps and emit offline event
     */
    private removeUser(userId: string) {
        const userSocket = this.userMap.get(userId);
        if (userSocket) {
            this.userMap.delete(userId);
            this.socketToUserMap.delete(userSocket.id);
            
            const users = Array.from(this.userMap.keys());
            console.log(`User ${userId} removed. Online users:`, users);
            
            // Emit updated online users list
            this.server.emit('onlineUsers', {
                onlineUsers: users
            });
            
            // Emit specific user offline event
            this.server.emit('userOffline', {
                userId: userId,
                onlineUsers: users
            });
        }
    }

    /**
     * Get current online users
     */
    getOnlineUsers(): string[] {
        return Array.from(this.userMap.keys());
    }

    /**
     * Get current online admins
     */
    getOnlineAdmins(): string[] {
        return Array.from(this.adminMap.keys());
    }

    /**
     * Check if a specific user is online
     */
    isUserOnline(userId: string): boolean {
        return this.userMap.has(userId);
    }

    /**
     * Check if any admin is online
     */
    isAdminOnline(): boolean {
        return this.adminMap.size > 0;
    }

    /**
     * Emit a custom event to a specific room
     * @param room - Room ID or name
     * @param event - Event name
     * @param data - Data to send
     */
    emitToRoom(room: string, event: string, data: any) {
        console.log('sent messages');
        this.server.to(room).emit(event, data);
    }
}