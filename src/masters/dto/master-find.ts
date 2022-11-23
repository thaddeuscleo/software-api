import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MasterFind {
  @Field(() => String, {
    description: 'Master Id',
    nullable: true,
    defaultValue: undefined,
  })
  id?: string;

  @Field(() => String, {
    description: 'Master Name',
    nullable: true,
    defaultValue: undefined,
  })
  masterName?: string;
}
