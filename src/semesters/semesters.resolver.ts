import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SemestersService } from './semesters.service';
import { Semester } from './entities/semester.entity';
import { CreateSemesterInput } from './dto/create-semester.input';
import { UpdateSemesterInput } from './dto/update-semester.input';
import { Software } from './../softwares/entities/software.entity';

@Resolver(() => Semester)
export class SemestersResolver {
  constructor(private readonly semestersService: SemestersService) {}

  @Mutation(() => Semester)
  createSemester(
    @Args('createSemesterInput') createSemesterInput: CreateSemesterInput,
  ) {
    return this.semestersService.create(createSemesterInput);
  }

  @Query(() => [Semester], { name: 'semesters' })
  findAll() {
    return this.semestersService.findAll();
  }

  @Query(() => Semester, { name: 'semester' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.semestersService.findOne(id);
  }

  @Mutation(() => Semester)
  updateSemester(
    @Args('updateSemesterInput') updateSemesterInput: UpdateSemesterInput,
  ) {
    return this.semestersService.update(updateSemesterInput);
  }

  @Mutation(() => Semester)
  removeSemester(@Args('id', { type: () => String }) id: string) {
    return this.semestersService.remove(id);
  }

  @ResolveField(() => [Software])
  softwares(@Parent() semester: Semester) {
    return this.semestersService.getSoftwares(semester.id);
  }
}
