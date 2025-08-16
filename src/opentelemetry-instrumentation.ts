import * as opentelemetry from '@opentelemetry/api'
import {
  MeterProvider,
  PeriodicExportingMetricReader
} from '@opentelemetry/sdk-metrics'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'

// Configure with timeout and retry settings
const collectorOptions = {
  url: 'https://api.openobserve.ai/api/30QWFpDZcdoR8qGbMoXvpLUQGLj/v1/metrics',
  headers: {
    Authorization: 'Basic c3RyaXBhdGhpLWluZmluaXRlcGlAcHJvdG9ubWFpbC5jb206SUpwS2szdzJWTUtKRXJZcg==',
    organization: '30QWFpDZcdoR8qGbMoXvpLUQGLj'
  },
  // concurrencyLimit: 1, // an optional limit on pending requests
  timeoutMillis: 30000 // 30 second timeout
}
const metricExporter = new OTLPMetricExporter(collectorOptions)
const meterProvider = new MeterProvider({
  readers: [
    new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 30000 // Export metrics every 30 seconds
    })
  ]
})
// register the meterProvider with the OpenTelemetry API.
opentelemetry.metrics.setGlobalMeterProvider(meterProvider)
