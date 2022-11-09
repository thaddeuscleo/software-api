import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Software {
  @Field(() => String, { description: 'Software Identifier' })
  id: string;

  @Field(() => String, { description: 'Software Name' })
  softwareName: string;

  @Field(() => String, { description: 'Software Group' })
  group: string;

  @Field(() => String, { description: 'Software Version' })
  version: string;

  @Field(() => String, { description: 'Is Software Licensed' })
  license: string;

  @Field(() => Int, { description: 'Number of license' })
  numberOfLicense: number;

  @Field(() => String, { description: 'Current license' })
  currentLicense: string;

  @Field(() => String, { description: 'Software installer location' })
  installerPath: string;

  @Field(() => String, { description: 'Software notes' })
  note: String;
}
