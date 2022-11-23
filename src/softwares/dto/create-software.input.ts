import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSoftwareInput {
  @Field(() => String, { description: 'Software Name' })
  softwareName: string;

  @Field(() => String, { description: 'Semester Id' })
  semesterId: string;

  @Field(() => String, { description: 'Master Id' })
  masterId: string;

  @Field(() => String, { description: 'Software Group' })
  group: string;

  @Field(() => String, { description: 'Software Version' })
  version: string;

  @Field(() => String, { description: 'Is Software Licensed' })
  license: string;

  @Field(() => Int, { description: 'Number of license' })
  numberOfLicense: number;

  @Field(() => String, { description: 'Software installer location' })
  installerPath: string;

  @Field(() => String, { description: 'Software current Installer' })
  currentLicense: string;

  @Field(() => String, { description: 'Software notes' })
  note: string | null;

  @Field(() => [String], {
    description: 'List Of Rooms Id',
    nullable: true,
    defaultValue: [],
  })
  rooms?: string[];
}
