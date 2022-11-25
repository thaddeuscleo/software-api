import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSemesterInput {
  @Field(() => String, { description: 'Semester Name' })
  semesterName: string;

  @Field(() => Boolean, { description: 'Define semester is currently active' })
  isActive: boolean;

  @Field(() => [String], {
    description: 'List of softwares id',
    nullable: true,
    defaultValue: undefined,
  })
  softwares?: string[];
}
