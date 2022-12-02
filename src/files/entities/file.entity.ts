import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field(() => String, { description: 'File Name' })
  name: string;

  @Field(() => String)
  lastModified: string;

  @Field(() => String)
  etag: string;
  
  @Field(() => Int)
  size: number;
}
