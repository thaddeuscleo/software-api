import { Module } from '@nestjs/common';
import { MastersService } from './masters.service';
import { MastersResolver } from './masters.resolver';
import { PrismaService } from './../prisma-service/prisma.service';

@Module({
  providers: [MastersResolver, MastersService, PrismaService]
})
export class MastersModule {}
