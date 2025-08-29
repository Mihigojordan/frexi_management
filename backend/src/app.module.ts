import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './modules/admin-management/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { DestinationModule } from './modules/destination-managment/destination.module';
import { TestimonialModule } from './modules/testmonial-managment/testmonial.module';
import { TourModule } from './modules/tour-managmanr/tour.module';
import { PartnerModule } from './modules/partner-management/partner.module';
import { UserModule } from './modules/user-management/user.module';
import { BlogModule } from './modules/blog-management/blog.module';
import { ContactMessageModule } from './modules/contact-message-management/contact-message.module';
import { ConversationModule } from './modules/conversation-management/conversation.module';
import { MessageModule } from './modules/message-management/message.module';
import { ClientModule } from './modules/client-managment/client.module';
import { EmployeeModule } from './modules/employee-management/employee.module';
import { EmailModule } from './global/email/email.module';

@Module({
  imports: [
    AdminModule,
    PrismaModule,
    DestinationModule,
    TestimonialModule,
    TourModule,
    PartnerModule,
    UserModule,
    ContactMessageModule,
    BlogModule,
    ConversationModule,
    MessageModule,
    ClientModule,
    EmployeeModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
