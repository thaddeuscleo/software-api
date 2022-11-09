import { Module } from '@nestjs/common';
import { SoftwaresService } from './softwares.service';
import { SoftwaresResolver } from './softwares.resolver';

@Module({
  providers: [SoftwaresResolver, SoftwaresService]
})
export class SoftwaresModule {}
