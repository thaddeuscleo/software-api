import { Injectable, Logger } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { MinioService } from 'nestjs-minio-client';
import { PassThrough } from 'stream';
import { CreateFileInput } from './dto/create-file.input';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  private readonly XLSX_MIME =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  private readonly XLS_MIME = 'application/vnd.ms-excel';

  constructor(private readonly minioService: MinioService) {}

  async uploadToBucket({ file, name }: CreateFileInput) {
    const { createReadStream, mimetype } = await file;

    if (mimetype === this.XLSX_MIME || mimetype === this.XLS_MIME) {
      const stream = await createReadStream().pipe(new PassThrough());
      let exist = await this.minioService.client.bucketExists(
        'software-management',
      );
      if (!exist)
        await this.minioService.client.makeBucket('software-management', '');

      const fileType = mimetype === this.XLSX_MIME ? '.xlsx' : '.xls';

      return await this.minioService.client.putObject(
        'software-management',
        `excels/${name}${fileType}`,
        stream,
      );
    }

    throw new GraphQLError(
      'File format not supported, please upload xlsx or xls format',
    );
  }

  async listObjects() {
    let res = this.minioService.client.listObjects(
      'software-management',
      '',
      true,
    );
    let objectsPromise = new Promise((resolve, reject) => {
      let arr: any[] = [];

      res.on('data', (obj) => arr.push(obj));
      res.on('end', () => resolve(arr));
      res.on('error', () => reject());
    });

    return await objectsPromise;
  }
}
