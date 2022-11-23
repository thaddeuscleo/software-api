import { Injectable } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';
import { CreateRabbitmqRoomDto } from './dto/create-rabbitmq-room.dto';
import { UpdateRabbitmqRoomDto } from './dto/update-rabbitmq-room.dto';

@Injectable()
export class RabbitmqRoomsService {
  constructor(private roomService: RoomsService) {}

  create({id, masterId, roomNumber}: CreateRabbitmqRoomDto) {
    return this.roomService.create({
      id,
      roomNumber,
      masterId,
      softwares: [],
    });
  }

  update({id, masterId, roomNumber}: UpdateRabbitmqRoomDto) {
    return this.roomService.update(id, {
      id,
      roomNumber,
      masterId,
      softwares: undefined,
    });
  }

  remove(id: string) {
    return this.roomService.remove(id);
  }
}
