import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SoftwaresModule } from './softwares/softwares.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PrismaService } from './prisma-service/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // playground: false,
    }),
    SoftwaresModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
