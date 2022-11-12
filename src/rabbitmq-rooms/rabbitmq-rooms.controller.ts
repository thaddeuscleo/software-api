import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RabbitmqRoomsService } from './rabbitmq-rooms.service';

@Controller()
export class RabbitmqRoomsController {
  constructor(private readonly rabbitmqRoomsService: RabbitmqRoomsService) {}

  private readonly logger = new Logger(RabbitmqRoomsController.name);

  private getChannelAndMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    return [channel, message]
  }

  @EventPattern('room_created')
  async roomCreated(@Payload() data, @Ctx() context: RmqContext) {
    const [channel, message] = this.getChannelAndMessage(context);
    await this.rabbitmqRoomsService.create(data);
    this.logger.log(`Successfully inserted room: ${data.id}`);
    channel.ack(message);
  }

  @EventPattern('room_updated')
  async roomUpdated(@Payload() data, @Ctx() context: RmqContext) {
    const [channel, message] = this.getChannelAndMessage(context);
    await this.rabbitmqRoomsService.update(data);
    this.logger.log(`Successfully updated room: ${data.id}`);
    channel.ack(message);
  }

  @EventPattern('room_deleted')
  async roomDeleted(@Payload() data, @Ctx() context: RmqContext) {
    const [channel, message] = this.getChannelAndMessage(context);
    await this.rabbitmqRoomsService.remove(data);
    this.logger.log(`Successfully deleted room: ${data.id}`);
    channel.ack(message);
  }
}
