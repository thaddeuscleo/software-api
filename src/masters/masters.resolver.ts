import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MastersService } from './masters.service';
import { Master } from './entities/master.entity';
import { CreateMasterInput } from './dto/create-master.input';
import { UpdateMasterInput } from './dto/update-master.input';
import { MasterFind } from './dto/master-find';

@Resolver(() => Master)
export class MastersResolver {
  constructor(private readonly mastersService: MastersService) {}

  @Mutation(() => Master)
  createMaster(@Args('createMasterInput') createMasterInput: CreateMasterInput) {
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
    return this.mastersService.findAll();
  }

  @Query(() => Master, { name: 'master' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.mastersService.findOne(id);
  }

  @Mutation(() => Master)
  updateMaster(@Args('updateMasterInput') updateMasterInput: UpdateMasterInput) {
    return this.mastersService.update(updateMasterInput);
  }

  @Mutation(() => Master)
  removeMaster(@Args('id', { type: () => String }) id: string) {
    return this.mastersService.remove(id);
  }
}
