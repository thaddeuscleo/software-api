import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitmqRoomsService } from './rabbitmq-rooms.service';
import { CreateRabbitmqRoomDto } from './dto/create-rabbitmq-room.dto';
import { UpdateRabbitmqRoomDto } from './dto/update-rabbitmq-room.dto';

@Controller()
export class RabbitmqRoomsController {
  constructor(private readonly rabbitmqRoomsService: RabbitmqRoomsService) {}

  @MessagePattern('createRabbitmqRoom')
  create(@Payload() createRabbitmqRoomDto: CreateRabbitmqRoomDto) {
    return this.rabbitmqRoomsService.create(createRabbitmqRoomDto);
  }

  @MessagePattern('findAllRabbitmqRooms')
  findAll() {
    return this.rabbitmqRoomsService.findAll();
  }

  @MessagePattern('findOneRabbitmqRoom')
  findOne(@Payload() id: number) {
    return this.rabbitmqRoomsService.findOne(id);
  }

  @MessagePattern('updateRabbitmqRoom')
  update(@Payload() updateRabbitmqRoomDto: UpdateRabbitmqRoomDto) {
    return this.rabbitmqRoomsService.update(updateRabbitmqRoomDto.id, updateRabbitmqRoomDto);
  }

  @MessagePattern('removeRabbitmqRoom')
  remove(@Payload() id: number) {
    return this.rabbitmqRoomsService.remove(id);
  }
}
