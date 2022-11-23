import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MastersService } from './masters.service';
import { Master } from './entities/master.entity';
import { CreateMasterInput } from './dto/create-master.input';
import { UpdateMasterInput } from './dto/update-master.input';

@Resolver(() => Master)
export class MastersResolver {
  constructor(private readonly mastersService: MastersService) {}

  @Mutation(() => Master)
  createMaster(@Args('createMasterInput') createMasterInput: CreateMasterInput) {
    return this.mastersService.create(createMasterInput);
  }

  @Query(() => [Master], { name: 'masters' })
  findAll() {
    return this.mastersService.findAll();
  }

  @Query(() => Master, { name: 'master' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mastersService.findOne(id);
  }

  @Mutation(() => Master)
  updateMaster(@Args('updateMasterInput') updateMasterInput: UpdateMasterInput) {
    return this.mastersService.update(updateMasterInput.id, updateMasterInput);
  }

  @Mutation(() => Master)
  removeMaster(@Args('id', { type: () => Int }) id: number) {
    return this.mastersService.remove(id);
  }
}
