import winston from 'winston';
import path from 'path';
// Create logs directory
const logDirectory = path.join(process.cwd(), 'logs');
// Configure Winston logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json()),
    defaultMeta: { service: 'buckalew-financial-services' },
    transports: [
        // Console transport for development
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        }),
        // File transport for errors
        new winston.transports.File({
            filename: path.join(logDirectory, 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // File transport for combined logs
        new winston.transports.File({
            filename: path.join(logDirectory, 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5
        })
    ]
});
// Audit log function
export function auditLog(action, userId, details) {
    logger.info('AUDIT_LOG', {
        action,
        userId,
        details,
        timestamp: new Date().toISOString()
    });
}
// Error logging function
export function logApplicationError(error, context) {
    logger.error('APPLICATION_ERROR', {
        message: error.message,
        stack: error.stack,
        context
    });
}
// Performance logging
export function logPerformance(operation, duration, details) {
    logger.info('PERFORMANCE_LOG', {
        operation,
        duration,
        details,
        timestamp: new Date().toISOString()
    });
}
export default logger;
