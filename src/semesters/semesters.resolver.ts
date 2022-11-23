import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SemestersService } from './semesters.service';
import { Semester } from './entities/semester.entity';
import { CreateSemesterInput } from './dto/create-semester.input';
import { UpdateSemesterInput } from './dto/update-semester.input';

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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.semestersService.findOne(id);
  }

  @Mutation(() => Semester)
  updateSemester(
    @Args('updateSemesterInput') updateSemesterInput: UpdateSemesterInput,
  ) {
    return this.semestersService.update(
      updateSemesterInput.id,
      updateSemesterInput,
    );
  }

  @Mutation(() => Semester)
  removeSemester(@Args('id', { type: () => Int }) id: number) {
    return this.semestersService.remove(id);
  }
}
