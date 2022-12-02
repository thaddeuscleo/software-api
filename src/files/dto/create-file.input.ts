import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-minimal';
import { FileUpload } from '../interfaces/FileUpload';


@InputType()
export class CreateFileInput {
  @Field(() => String, { description: 'File Name' })
  name: string;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>
}
