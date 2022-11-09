import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSoftwareInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
