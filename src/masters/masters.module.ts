import { Module } from '@nestjs/common';
import { MastersService } from './masters.service';
import { MastersResolver } from './masters.resolver';

@Module({
  providers: [MastersResolver, MastersService]
})
export class MastersModule {}
