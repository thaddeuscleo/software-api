import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SoftwaresModule } from './softwares/softwares.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitmqRoomsModule } from './rabbitmq-rooms/rabbitmq-rooms.module';
import { MastersModule } from './masters/masters.module';
import { SemestersModule } from './semesters/semesters.module';
import { FilesModule } from './files/files.module';
import { MinioModule } from "nestjs-minio-client"

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isApolloSandBox = config.get<string>('APOLLO_SANDBOX') === 'true';
        const isPlayground =
          config.get<string>('PLAYGROUND') === 'true' && !isApolloSandBox;
        const plugin = isApolloSandBox
          ? ApolloServerPluginLandingPageLocalDefault()
          : {};
        return {
          uploads: false,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          plugins: [plugin],
          playground: isPlayground,
        };
      },
    }),
    ConfigModule.forRoot(),
    SoftwaresModule,
    RoomsModule,
    RabbitmqRoomsModule,
    MastersModule,
    SemestersModule,
    FilesModule,
  ],
})
export class AppModule {}
