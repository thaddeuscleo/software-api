import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Module({
  providers: [RoomsResolver, RoomsService, PrismaService],
})
export class RoomsModule {}
