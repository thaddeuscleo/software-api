import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MastersService } from './masters.service';
import { Master } from './entities/master.entity';
import { CreateMasterInput } from './dto/create-master.input';
import { UpdateMasterInput } from './dto/update-master.input';
import { MasterFind } from './dto/master-find';
import { Software } from './../softwares/entities/software.entity';
import { Room } from './../rooms/entities/room.entity';

@Resolver(() => Master)
export class MastersResolver {
  constructor(private readonly mastersService: MastersService) {}

  @Mutation(() => Master)
  createMaster(
    @Args('createMasterInput') createMasterInput: CreateMasterInput,
  ) {
    return this.mastersService.create(createMasterInput);
  }

  @Query(() => [Master], { name: 'masters' })
  findAll(
    @Args('find', { nullable: true, defaultValue: new MasterFind() })
    find?: MasterFind,
    @Args('skip', { type: () => Int, nullable: true, defaultValue: undefined })
    skip?: number,
    @Args('take', { type: () => Int, nullable: true, defaultValue: undefined })
    take?: number,
  ) {
    return this.mastersService.findAll(find, skip, take);
  }

  @Query(() => Master, { name: 'master' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.mastersService.findOne(id);
  }

  @Mutation(() => Master)
  updateMaster(
    @Args('updateMasterInput') updateMasterInput: UpdateMasterInput,
  ) {
    return this.mastersService.update(updateMasterInput);
  }

  @Mutation(() => Master)
  removeMaster(@Args('id', { type: () => String }) id: string) {
    return this.mastersService.remove(id);
  }

  @ResolveField(() => [Software])
  softwares(@Parent() master: Master) {
    return this.mastersService.getSoftwares(master.id);
  }

  @ResolveField(() => [Room])
  rooms(@Parent() master: Master) {
    return this.mastersService.getRooms(master.id);
  }
}
