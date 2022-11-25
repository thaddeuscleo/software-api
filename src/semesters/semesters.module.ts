import { Module } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersResolver } from './semesters.resolver';
import { PrismaService } from './../prisma-service/prisma.service';

@Module({
  providers: [SemestersResolver, SemestersService, PrismaService],
})
export class SemestersModule {}
