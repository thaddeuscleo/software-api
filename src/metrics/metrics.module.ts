import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { PrometheusModule } from 'src/prometheus/prometheus.module';
import { HealthModule } from 'src/health/health.module';

@Module({
  imports: [PrometheusModule, HealthModule],
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
