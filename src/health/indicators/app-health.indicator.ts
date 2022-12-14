import { HealthIndicatorResult, HttpHealthIndicator } from '@nestjs/terminus';
import { PrometheusService } from 'src/prometheus/prometheus.service';
import { HealthIndicator } from '../interfaces/health-indicator';
import { BaseHealthIndicator } from './base-health.indicator';

export class AppHealthIndicator
  extends BaseHealthIndicator
  implements HealthIndicator
{
  public readonly name = 'SoftwareAPI';
  protected readonly help = 'Status of ' + this.name;
  protected readonly promClientService: PrometheusService | undefined;

  private readonly url: string;
  private readonly httpHealthIndicator: HttpHealthIndicator;

  constructor(
    httpHealthIndicator: HttpHealthIndicator,
    url: string | undefined,
    promClientService?: PrometheusService,
  ) {
    super();
    this.httpHealthIndicator = httpHealthIndicator;
    this.promClientService = promClientService;
    this.url = url || '';
    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    if (this.isDefined(this.url)) {
      const result: Promise<HealthIndicatorResult> =
        this.httpHealthIndicator.pingCheck(this.name, this.url);
      this.updatePrometheusData(true);
      return result;
    } else {
      return {};
    }
  }
}
