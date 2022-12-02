import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endPoint: config.get('MINIO_ENDPOINT'),
          port: parseInt(config.get('MINIO_PORT')),
          useSSL: false,
          accessKey: config.get('MINIO_ACCESS_KEY'),
          secretKey: config.get('MINIO_SECRET_KEY'),
        };
      },
    }),
  ],
  providers: [FilesResolver, FilesService],
})
export class FilesModule {}
