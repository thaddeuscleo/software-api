import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Software } from 'src/softwares/entities/software.entity';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll() {
    return this.roomsService.findAll();
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.update(updateRoomInput.id, updateRoomInput);
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => String }) id: string) {
    return this.roomsService.remove(id);
  }

  @ResolveField(() => [Software])
  softwares(@Parent() room: Room) {
    return this.roomsService.getSoftwares(room.id);
  }
}
