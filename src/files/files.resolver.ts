import { Resolver,  Mutation, Args} from '@nestjs/graphql';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';

@Resolver(() => File)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => Boolean)
  async uploadFile(@Args('createFileInput') input: CreateFileInput) {
    return this.filesService.uploadToBucket(input); 
  }

}
