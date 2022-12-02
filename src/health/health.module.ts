import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusModule } from './../prometheus/prometheus.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, PrometheusModule, HttpModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
