import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrometheusService } from './../prometheus/prometheus.service';
import { AppHealthIndicator } from './indicators/app-health.indicator';
import { HealthIndicator } from './interfaces/health-indicator';

@Injectable()
export class HealthService {
  private readonly indicators: HealthIndicator[];

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private promClientService: PrometheusService,
  ) {
    this.indicators = [
      new AppHealthIndicator(
        this.http,
        'https://docs.nestjs.com',
        this.promClientService,
      ),
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult | undefined> {
    return await this.health.check(
      this.indicators.map((apiIndicator: HealthIndicator) => async () => {
        try {
          return await apiIndicator.isHealthy();
        } catch (e) {
          Logger.warn(e);
          return apiIndicator.reportUnhealthy();
        }
      }),
    );
  }
}
