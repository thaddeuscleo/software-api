import { PartialType } from '@nestjs/mapped-types';
import { CreateRabbitmqRoomDto } from './create-rabbitmq-room.dto';

export class UpdateRabbitmqRoomDto extends PartialType(CreateRabbitmqRoomDto) {
  id: number;
}
