import { CreateSoftwareInput } from './create-software.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSoftwareInput extends PartialType(CreateSoftwareInput) {
  @Field(() => String, { description: 'Software Identifier' })
  id: string;

  @Field(() => String, { description: 'Software Name', nullable: true })
  softwareName: string;

  @Field(() => String, { description: 'Software Group', nullable: true })
  group: string;

  @Field(() => String, { description: 'Software Version', nullable: true })
  version: string;

  @Field(() => String, { description: 'Is Software Licensed', nullable: true })
  license: string;

  @Field(() => Int, { description: 'Number of license', nullable: true })
  numberOfLicense: number;

  @Field(() => String, {
    description: 'Software installer location',
    nullable: true,
  })
  installerPath: string;

  @Field(() => String, {
    description: 'Software current Installer',
    nullable: true,
  })
  currentLicense: string;

  @Field(() => String, { description: 'Software notes', nullable: true })
  note: string | null;
}
