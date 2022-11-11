import { Module } from '@nestjs/common';
import { RabbitmqRoomsService } from './rabbitmq-rooms.service';
import { RabbitmqRoomsController } from './rabbitmq-rooms.controller';

@Module({
  controllers: [RabbitmqRoomsController],
  providers: [RabbitmqRoomsService]
})
export class RabbitmqRoomsModule {}
