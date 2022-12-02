import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field(() => String, { description: 'File Name' })
  name: string;

  @Field(() => String)
  file: string;
}
