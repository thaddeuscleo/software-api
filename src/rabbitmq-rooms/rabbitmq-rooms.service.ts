import { Injectable, Logger } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';
import { CreateRabbitmqRoomDto } from './dto/create-rabbitmq-room.dto';
import { UpdateRabbitmqRoomDto } from './dto/update-rabbitmq-room.dto';

@Injectable()
export class RabbitmqRoomsService {
  constructor(private roomService: RoomsService) {}

  create(input: CreateRabbitmqRoomDto) {
    return this.roomService.create({
      id: input.id,
      roomNumber: input.roomNumber,
      softwares: [],
    });
  }

  update(input: UpdateRabbitmqRoomDto) {
    return this.roomService.update(input.id, {
      id: input.id,
      roomNumber: input.roomNumber,
      softwares: undefined,
    });
  }

  remove(id: string) {
    return this.roomService.remove(id);
  }
}
