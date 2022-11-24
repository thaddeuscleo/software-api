import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SoftwaresService } from './softwares.service';
import { Software } from './entities/software.entity';
import { CreateSoftwareInput } from './dto/create-software.input';
import { UpdateSoftwareInput } from './dto/update-software.input';
import { Room } from 'src/rooms/entities/room.entity';
import { Logger } from '@nestjs/common';
import { SoftwareFind } from './dto/software-find';
import { Master } from './../masters/entities/master.entity';

@Resolver(() => Software)
export class SoftwaresResolver {
  private readonly logger = new Logger(SoftwaresResolver.name);

  constructor(private readonly softwaresService: SoftwaresService) {}

  @Mutation(() => Software)
  createSoftware(@Args('createSoftwareInput') input: CreateSoftwareInput) {
    this.logger.log('Software Create Request');
    return this.softwaresService.create(input);
  }

  @Query(() => [Software], { name: 'softwares' })
  findAll(
    @Args('find', { nullable: true, defaultValue: new SoftwareFind() })
    find?: SoftwareFind,
    @Args('skip', { type: () => Int, nullable: true, defaultValue: undefined })
    skip?: number,
    @Args('take', { type: () => Int, nullable: true, defaultValue: undefined })
    take?: number,
  ) {
    return this.softwaresService.findAll(find, skip, take);
  }

  @Query(() => Software, { name: 'software' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.softwaresService.findOne(id);
  }

  @Query(() => Int, { name: 'softwareCount' })
  softwareCount() {
    return this.softwaresService.countAllSoftwares();
  }

  @Mutation(() => Software)
  updateSoftware(
    @Args('updateSoftwareInput') updateSoftwareInput: UpdateSoftwareInput,
  ) {
    return this.softwaresService.update(
      updateSoftwareInput.id,
      updateSoftwareInput,
    );
  }

  @Mutation(() => Software)
  removeSoftware(@Args('id', { type: () => String }) id: string) {
    return this.softwaresService.remove(id);
  }

  @ResolveField(() => [Room])
  rooms(@Parent() software: Software) {
    return this.softwaresService.getRooms(software.id);
  }

  @ResolveField(() => [Master])
  masters(@Parent() software: Software) {
    return this.softwaresService.getMasters(software.id);
  }
}
