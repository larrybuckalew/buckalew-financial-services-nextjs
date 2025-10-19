export class Logger {
    constructor() {
        this.logs = [];
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(level, message, context) {
        const entry = {
            level,
            message,
            timestamp: new Date(),
            context
        };
        this.logs.push(entry);
        // Console output
        switch (level) {
            case 'info':
                console.log(`[INFO] ${message}`, context);
                break;
            case 'warn':
                console.warn(`[WARN] ${message}`, context);
                break;
            case 'error':
                console.error(`[ERROR] ${message}`, context);
                break;
        }
        // TODO: Implement remote logging or file logging
    }
    info(message, context) {
        this.log('info', message, context);
    }
    warn(message, context) {
        this.log('warn', message, context);
    }
    error(message, context) {
        this.log('error', message, context);
    }
    getLogs(level, limit = 100) {
        let filteredLogs = this.logs;
        if (level) {
            filteredLogs = filteredLogs.filter(log => log.level === level);
        }
        return filteredLogs.slice(-limit);
    }
}
// Singleton export
export const logger = Logger.getInstance();
