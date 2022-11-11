import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RabbitmqRoomsService } from './rabbitmq-rooms.service';
import { CreateRabbitmqRoomDto } from './dto/create-rabbitmq-room.dto';
import { UpdateRabbitmqRoomDto } from './dto/update-rabbitmq-room.dto';

@Controller()
export class RabbitmqRoomsController {
  constructor(private readonly rabbitmqRoomsService: RabbitmqRoomsService) {}

  private readonly logger = new Logger(RabbitmqRoomsController.name);

  @EventPattern('room_created')
  roomInserted(@Payload() data, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    this.logger.debug(JSON.stringify(data))
    channel.ack(message);
  }
}
