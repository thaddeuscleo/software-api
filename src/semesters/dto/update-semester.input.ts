import { CreateSemesterInput } from './create-semester.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSemesterInput extends PartialType(CreateSemesterInput) {
  @Field(() => String, { description: 'Semester ID' })
  id: string;
}
