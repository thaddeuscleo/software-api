import { Module } from '@nestjs/common';
import { RabbitmqRoomsService } from './rabbitmq-rooms.service';
import { RabbitmqRoomsController } from './rabbitmq-rooms.controller';
import { RoomsService } from 'src/rooms/rooms.service';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Module({
  controllers: [RabbitmqRoomsController],
  providers: [RabbitmqRoomsService, RoomsService, PrismaService],
})
export class RabbitmqRoomsModule {}
