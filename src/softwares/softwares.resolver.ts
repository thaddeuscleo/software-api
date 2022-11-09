import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SoftwaresService } from './softwares.service';
import { Software } from './entities/software.entity';
import { CreateSoftwareInput } from './dto/create-software.input';
import { UpdateSoftwareInput } from './dto/update-software.input';

@Resolver(() => Software)
export class SoftwaresResolver {
  constructor(private readonly softwaresService: SoftwaresService) {}

  @Mutation(() => Software)
  createSoftware(@Args('createSoftwareInput') createSoftwareInput: CreateSoftwareInput) {
    return this.softwaresService.create(createSoftwareInput);
  }

  @Query(() => [Software], { name: 'softwares' })
  findAll() {
    return this.softwaresService.findAll();
  }

  @Query(() => Software, { name: 'software' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.softwaresService.findOne(id);
  }

  @Mutation(() => Software)
  updateSoftware(@Args('updateSoftwareInput') updateSoftwareInput: UpdateSoftwareInput) {
    return this.softwaresService.update(updateSoftwareInput.id, updateSoftwareInput);
  }

  @Mutation(() => Software)
  removeSoftware(@Args('id', { type: () => Int }) id: number) {
    return this.softwaresService.remove(id);
  }
}
