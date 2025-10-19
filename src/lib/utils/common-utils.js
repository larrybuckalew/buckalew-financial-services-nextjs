import crypto from 'crypto';
import { validate as validateUuid } from 'uuid';
export class CommonUtils {
    // Generate a cryptographically secure random string
    static generateSecureToken(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
    // Sanitize input to prevent XSS
    static sanitizeInput(input) {
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    }
    // Validate email format
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // Validate UUID
    static isValidUuid(uuid) {
        return validateUuid(uuid);
    }
    // Deep clone an object
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepClone(item));
        }
        const clonedObj = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clonedObj[key] = this.deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
    // Debounce function
    static debounce(func, delay) {
        let timeoutId = null;
        return ((...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
                timeoutId = null;
            }, delay);
        });
    }
    // Throttle function
    static throttle(func, limit) {
        let inThrottle;
        return ((...args) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        });
    }
    // Convert camelCase to snake_case
    static camelToSnakeCase(str) {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    // Convert snake_case to camelCase
    static snakeToCamelCase(str) {
        return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }
    // Mask sensitive information
    static maskSensitiveInfo(value, visibleChars = 4) {
        if (value.length <= visibleChars * 2) {
            return value;
        }
        const start = value.slice(0, visibleChars);
        const end = value.slice(-visibleChars);
        const maskLength = value.length - (visibleChars * 2);
        const mask = '*'.repeat(maskLength);
        return `${start}${mask}${end}`;
    }
    // Generate a unique identifier
    static generateUniqueId() {
        return crypto
            .randomBytes(16)
            .toString('hex');
    }
    // Retry an async operation with exponential backoff
    static async retryOperation(operation, maxRetries = 3, baseDelay = 1000) {
        let lastError = null;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                const delay = baseDelay * Math.pow(2, attempt);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    }
}
