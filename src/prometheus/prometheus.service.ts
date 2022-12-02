import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Gauge, Histogram, Registry } from 'prom-client';
import MapGauge from './interfaces/MapGauge';
import MapHistogram from './interfaces/MapHistogram';

export type PrometheusHistogram = Histogram<string>;

@Injectable()
export class PrometheusService {
  private readonly SERVICE_NAME = 'SoftwareAPI';
  private readonly SERVICE_PREFIX = 'BackendMetrics_';
  private registeredMetrics: MapHistogram = {};
  private registeredGauges: MapGauge = {};
  private readonly registry: Registry;

  public get metrics(): Promise<string> {
    return this.registry.metrics();
  }

  constructor() {
    this.registry = new Registry();
    this.registry.setDefaultLabels({
      app: this.SERVICE_NAME,
    });
    collectDefaultMetrics({
      register: this.registry,
      prefix: this.SERVICE_PREFIX,
    });
  }

  public registerMetrics(
    name: string,
    help: string,
    labelNames: string[],
    buckets: number[],
  ): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      const histogram = new Histogram({ name, help, labelNames, buckets });
      this.registry.registerMetric(histogram);
      this.registeredMetrics[name] = histogram;
    }
    return this.registeredMetrics[name];
  }

  public registerGauge(name: string, help: string): Gauge<string> {
    if (this.registeredGauges[name] === undefined) {
      const gauge = (this.registeredGauges[name] = new Gauge({
        name: this.SERVICE_PREFIX + name,
        help,
      }));
      this.registry.registerMetric(gauge);
      this.registeredGauges[name] = gauge;
    }
    return this.registeredGauges[name];
  }

  public removeSingleMetric(name: string): void {
    return this.registry.removeSingleMetric(name);
  }

  public clearMetrics(): void {
    this.registry.resetMetrics();
    return this.registry.clear();
  }
}
