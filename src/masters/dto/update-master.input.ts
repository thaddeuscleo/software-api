import { CreateMasterInput } from './create-master.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMasterInput extends PartialType(CreateMasterInput) {
  @Field(() => String)
  id: string;
}
