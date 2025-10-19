import { rateLimiter } from '@/middleware/security/rate-limit';
import { DatabaseService } from '@/lib/db/db-service';
jest.mock('@/lib/db/db-service');
describe('Rate Limiter Middleware', () => {
    let mockReq;
    let mockRes;
    let mockNext;
    let db;
    beforeEach(() => {
        mockReq = {
            headers: {
                'x-real-ip': '127.0.0.1',
            },
            socket: {
                remoteAddress: '127.0.0.1',
            },
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn(),
        };
        mockNext = jest.fn();
        db = new DatabaseService();
    });
    it('should allow requests within rate limit', async () => {
        db.executeQuery.mockResolvedValueOnce({ count: 5 });
        const middleware = rateLimiter({ max: 10 });
        await middleware(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalledWith(429);
    });
    it('should block requests exceeding rate limit', async () => {
        db.executeQuery.mockResolvedValueOnce({ count: 15 });
        const middleware = rateLimiter({ max: 10 });
        await middleware(mockReq, mockRes, mockNext);
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(429);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Too many requests, please try again later.',
        });
    });
    it('should track requests by IP address', async () => {
        db.executeQuery.mockResolvedValue({ count: 1 });
        const middleware = rateLimiter({ max: 10 });
        const ips = ['1.1.1.1', '2.2.2.2', '3.3.3.3'];
        for (const ip of ips) {
            await middleware({ ...mockReq, headers: { 'x-real-ip': ip } }, mockRes, mockNext);
        }
        expect(db.executeQuery).toHaveBeenCalledTimes(ips.length * 2); // increment + getCount for each IP
        ips.forEach(ip => {
            expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), expect.arrayContaining([ip]));
        });
    });
    it('should handle missing IP address gracefully', async () => {
        db.executeQuery.mockResolvedValueOnce({ count: 1 });
        const middleware = rateLimiter({ max: 10 });
        await middleware({ headers: {} }, mockRes, mockNext);
        expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), expect.arrayContaining(['unknown']));
        expect(mockNext).toHaveBeenCalled();
    });
    it('should respect window time limit', async () => {
        const windowMs = 1000; // 1 second
        db.executeQuery.mockResolvedValue({ count: 1 });
        const middleware = rateLimiter({ max: 10, windowMs });
        await middleware(mockReq, mockRes, mockNext);
        expect(db.executeQuery).toHaveBeenCalledWith(expect.stringContaining('INTERVAL'), expect.any(Array));
    });
    it('should handle cleanup of expired entries', async () => {
        db.executeQuery.mockResolvedValueOnce({ count: 1 });
        const middleware = rateLimiter({ max: 10 });
        await middleware(mockReq, mockRes, mockNext);
        expect(db.executeQuery).toHaveBeenCalledWith(expect.stringContaining('expires > NOW()'), expect.any(Array));
    });
    it('should set correct remaining requests header', async () => {
        const max = 10;
        const currentCount = 4;
        db.executeQuery.mockResolvedValueOnce({ count: currentCount });
        const middleware = rateLimiter({ max });
        await middleware(mockReq, mockRes, mockNext);
        expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Limit', max);
        expect(mockRes.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', max - currentCount - 1);
    });
});
