import { CreateSoftwareInput } from './create-software.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSoftwareInput extends PartialType(CreateSoftwareInput) {
  @Field(() => Int)
  id: number;
}
