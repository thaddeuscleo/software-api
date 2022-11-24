import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Software } from './../softwares/entities/software.entity';
import { Master } from './../masters/entities/master.entity';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true, defaultValue: undefined })
    skip?: number,
    @Args('take', { type: () => Int, nullable: true, defaultValue: undefined })
    take?: number,
  ) {
    return this.roomsService.findAll(skip, take);
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.roomsService.findOne(id);
  }

  @Query(() => Int, { name: 'roomCount' })
  count() {
    return this.roomsService.count();
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

  @ResolveField(() => Master)
  master(@Parent() room: Room) {
    return this.roomsService.getMaster(room.id);
  }
}
