import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMasterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
