import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './modules/admin-management/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { DestinationModule } from './modules/destination-managment/destination.module';
import { TestimonialModule } from './modules/testmonial-managment/testmonial.module';
import { TourModule } from './modules/tour-managmanr/tour.module';
import { PartnerModule } from './modules/partner-management/partner.module';

@Module({
  imports: [
    AdminModule,
    PrismaModule,
    DestinationModule,
    TestimonialModule,
    TourModule,
    PartnerModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
