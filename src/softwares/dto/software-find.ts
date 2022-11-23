import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SoftwareFind {
  @Field(() => String, {
    description: 'Software Identifier',
    nullable: true,
    defaultValue: undefined,
  })
  id?: string;

  @Field(() => String, {
    description: 'Software Name',
    nullable: true,
    defaultValue: undefined,
  })
  softwareName?: string;
}
