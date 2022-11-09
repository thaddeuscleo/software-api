import { Module } from '@nestjs/common';
import { SoftwaresService } from './softwares.service';
import { SoftwaresResolver } from './softwares.resolver';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Module({
  providers: [SoftwaresResolver, SoftwaresService, PrismaService],
})
export class SoftwaresModule {}
