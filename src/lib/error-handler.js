import * as Sentry from "@sentry/nextjs";
// Custom error classes for more specific error handling
export class InsuranceCalculationError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
        this.name = 'InsuranceCalculationError';
    }
}
export class EligibilityVerificationError extends Error {
    constructor(message, reasons) {
        super(message);
        this.reasons = reasons;
        this.name = 'EligibilityVerificationError';
    }
}
export class ErrorHandler {
    // Centralized error logging method
    static log(error, context) {
        // Log to console for local development
        console.error('Error logged:', {
            message: error.message,
            name: error.name,
            stack: error.stack,
            context
        });
        // Send to Sentry for production monitoring
        Sentry.captureException(error, {
            extra: {
                ...context,
                timestamp: new Date().toISOString()
            }
        });
    }
    // API Error Handler Middleware
    static apiErrorHandler(handler) {
        return async (req, res) => {
            try {
                await handler(req, res);
            }
            catch (error) {
                // Log the error
                this.log(error, {
                    path: req.url,
                    method: req.method,
                    body: req.body,
                    query: req.query
                });
                // Determine error response based on error type
                if (error instanceof InsuranceCalculationError) {
                    res.status(400).json({
                        error: 'Calculation Error',
                        message: error.message,
                        details: error.details
                    });
                }
                else if (error instanceof EligibilityVerificationError) {
                    res.status(422).json({
                        error: 'Eligibility Verification Failed',
                        message: error.message,
                        reasons: error.reasons
                    });
                }
                else {
                    // Generic server error for unexpected issues
                    res.status(500).json({
                        error: 'Internal Server Error',
                        message: 'An unexpected error occurred'
                    });
                }
            }
        };
    }
    // Create a wrapper for async functions to handle errors consistently
    static asyncHandler(fn) {
        return (async (...args) => {
            try {
                return await fn(...args);
            }
            catch (error) {
                this.log(error);
                throw error;
            }
        });
    }
}
// Global error boundary for React components
export class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Log the error
        ErrorHandler.log(error);
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // Additional error logging if needed
        ErrorHandler.log(error, { componentStack: errorInfo.componentStack });
    }
    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return role = "alert";
            className = "error-boundary bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                >
                    Something;
            went;
            wrong. < /h2>
                < p > We;
            apologize;
            for (the; inconvenience.Please; )
                try { }
                finally { }
            again;
            later. < /p>
                < button;
            onClick = {}();
            this.setState({ hasError: false });
        }
        className = "mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Try;
        Again
            < /button>
            < /div>;
        ;
    }
}
return this.props.children;
