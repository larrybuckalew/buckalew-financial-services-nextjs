import * as Sentry from "@sentry/nextjs"
import { performance } from 'perf_hooks'
import { logger } from '../logging/logger'

export class PerformanceMonitor {
  // Measure and log function performance
  static async measurePerformance<T>(
    functionName: string, 
    fn: () => Promise<T>, 
    threshold: number = 1000
  ): Promise<T> {
    const start = performance.now()
    
    try {
      const result = await fn()
      
      const duration = performance.now() - start
      
      // Log performance metrics
      if (duration > threshold) {
        logger.warn(`Slow function execution`, {
          function: functionName,
          duration: `${duration.toFixed(2)}ms`
        })

        // Track performance in Sentry
        Sentry.captureMessage(`Slow function: ${functionName}`, {
          level: 'warning',
          extra: {
            duration,
            threshold
          }
        })
      }

      return result
    } catch (error) {
      // Measure performance even if function fails
      const duration = performance.now() - start
      
      logger.logError(
        logger.createError(
          `Performance measurement failed for ${functionName}`, 
          'PERFORMANCE', 
          { 
            duration: `${duration.toFixed(2)}ms`,
            error: String(error)
          }
        )
      )

      throw error
    }
  }

  // Track API request performance
  static trackApiPerformance(req, res, next) {
    const start = performance.now()

    // Hook into response finish event
    res.on('finish', () => {
      const duration = performance.now() - start
      
      const performanceData = {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${duration.toFixed(2)}ms`
      }

      // Log performance for slow requests
      if (duration > 1000) {
        logger.warn('Slow API request', performanceData)
        
        Sentry.captureMessage('Slow API Request', {
          level: 'warning',
          extra: performanceData
        })
      }

      // Optional: Track performance metrics
      Sentry.metrics.timing('api.request.duration', duration)
    })

    next()
  }

  // Memory usage monitoring
  static monitorMemoryUsage() {
    const memoryUsage = process.memoryUsage()
    
    // Log high memory usage
    if (memoryUsage.heapUsed / memoryUsage.heapTotal > 0.8) {
      logger.warn('High memory usage', {
        total: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        used: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`
      })

      Sentry.captureMessage('High Memory Usage', {
        level: 'warning',
        extra: {
          total: memoryUsage.heapTotal,
          used: memoryUsage.heapUsed
        }
      })
    }
  }

  // Periodic memory check
  static startMemoryMonitoring(interval: number = 300000) { // 5 minutes
    setInterval(() => {
      this.monitorMemoryUsage()
    }, interval)
  }
}