import * as opentelemetry from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/node';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

class PerformanceMetrics {
  private static provider: NodeTracerProvider;
  private static tracer: opentelemetry.Tracer;

  static init() {
    this.provider = new NodeTracerProvider();
    
    const exporter = new JaegerExporter({
      serviceName: 'buckalew-financial-services',
      endpoint: process.env.JAEGER_ENDPOINT
    });

    this.provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    this.provider.register();

    this.tracer = opentelemetry.trace.getTracer('buckalew-performance-tracer');
  }

  static startTrace(name: string) {
    return this.tracer.startSpan(name);
  }

  static recordMetric(span: opentelemetry.Span, key: string, value: number) {
    span.setAttribute(key, value);
  }

  static endTrace(span: opentelemetry.Span) {
    span.end();
  }

  static measureExecutionTime<T>(fn: () => T, metricName: string): T {
    const span = this.startTrace(metricName);
    const start = performance.now();

    try {
      const result = fn();
      const end = performance.now();
      
      this.recordMetric(span, 'execution_time_ms', end - start);
      this.endTrace(span);

      return result;
    } catch (error) {
      this.recordMetric(span, 'error', 1);
      this.endTrace(span);
      throw error;
    }
  }
}

export default PerformanceMetrics;
