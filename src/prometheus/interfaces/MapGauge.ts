import { Gauge } from 'prom-client';

export default interface MapGauge {
  [key: string]: Gauge<string>;
}
