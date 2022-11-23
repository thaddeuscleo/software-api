import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMasterInput {
  @Field(() => String, { description: 'Master Name' })
  masterName: string;

  @Field(() => [String], {
    description: 'Master Rooms',
    nullable: true,
    defaultValue: [],
  })
  rooms?: string[];

  @Field(() => [String], {
    description: 'Master Softwares',
    nullable: true,
    defaultValue: [],
  })
  softwares?: string[];
}
