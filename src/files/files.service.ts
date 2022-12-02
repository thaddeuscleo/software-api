import { Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { PassThrough } from 'stream';
import { CreateFileInput } from './dto/create-file.input';

@Injectable()
export class FilesService {
  constructor(private readonly minioService: MinioService) {}
  
  async uploadToBucket({file} : CreateFileInput) {
    const { createReadStream, filename } = await file;
    let exist = await this.minioService.client.bucketExists('test')
    if(!exist) await this.minioService.client.makeBucket('test', '')
    
    const stream = await createReadStream();
    let res = await this.minioService.client.putObject('test',`images/${filename}.jpg`, stream.pipe(new PassThrough()))
    return res
  }
}
