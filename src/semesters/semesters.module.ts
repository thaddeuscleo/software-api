import { Module } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersResolver } from './semesters.resolver';

@Module({
  providers: [SemestersResolver, SemestersService]
})
export class SemestersModule {}
