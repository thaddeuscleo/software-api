import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Injectable()
export class FilesService {
  
  async uploadToBucket({file} : CreateFileInput) {
    const { createReadStream, filename } = await file;
    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(
          createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
        )
        .on('finish', () => resolve(true))
        .on('error', () => reject(false));
    });
  }
}
