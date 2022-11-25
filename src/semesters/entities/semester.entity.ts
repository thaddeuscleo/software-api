import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Software } from './../../softwares/entities/software.entity';

@ObjectType()
export class Semester {
  @Field(() => String, { description: 'Semester ID' })
  id: string;

  @Field(() => String, { description: 'Semester Name' })
  semesterName: string;

  @Field(() => Boolean, { description: 'Is current semester' })
  isActive: boolean;

  @Field(() => [Software], { description: 'Semester softwares' })
  softwares: Software[];
}
