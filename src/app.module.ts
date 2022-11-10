import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SoftwaresModule } from './softwares/softwares.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const isApolloSandBox = config.get<string>('APOLLO_SANDBOX') === 'true'; 
        const isPlayground = config.get<string>('PLAYGROUND') === 'true' && !isApolloSandBox;
        const plugin = isApolloSandBox ? ApolloServerPluginLandingPageLocalDefault() : {};

        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          plugins: [plugin],
          playground: isPlayground,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    SoftwaresModule,
    RoomsModule,
  ],
})
export class AppModule {}
