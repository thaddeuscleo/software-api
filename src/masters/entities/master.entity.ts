import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Master {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
