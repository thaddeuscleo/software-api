import { Histogram } from 'prom-client';

export default interface MapHistogram {
  [key: string]: Histogram<string>;
}
