import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Software {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
