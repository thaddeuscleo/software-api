import { CreateMasterInput } from './create-master.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMasterInput extends PartialType(CreateMasterInput) {
  @Field(() => Int)
  id: number;
}
