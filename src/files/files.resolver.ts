import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { Logger } from '@nestjs/common';

@Resolver(() => File)
export class FilesResolver {

  private readonly logger = new Logger(FilesResolver.name)

  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => Boolean)
  async uploadFile(@Args('createFileInput') input: CreateFileInput) {
    return this.filesService.uploadToBucket(input); 
  }

  @Query(()=> [File])
  async files() {
    return this.filesService.listObjects()
  }

}
