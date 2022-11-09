import { Module } from '@nestjs/common';
import { SoftwaresService } from './softwares.service';
import { SoftwaresResolver } from './softwares.resolver';
import { PrismaServiceService } from 'src/prisma-service/prisma-service.service';

@Module({
  providers: [SoftwaresResolver, SoftwaresService, PrismaServiceService],
})
export class SoftwaresModule {}
