import { hash, verify } from 'argon2';
export class AuthService {
    constructor(sessionService, userRepository, db) {
        this.sessionService = sessionService;
        this.userRepository = userRepository;
        this.db = db;
    }
    async signUp(email, password, userData) {
        const existingUser = await this.userRepository.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const passwordHash = await hash(password);
        const user = await this.userRepository.create({
            ...userData,
            email,
            password_hash: passwordHash,
        });
        return user;
    }
    async signIn(email, password) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const validPassword = await verify(user.password_hash, password);
        if (!validPassword) {
            throw new Error('Invalid credentials');
        }
        const session = await this.sessionService.createSession(user.id);
        await this.userRepository.update(user.id, { last_login: new Date() });
        return session;
    }
    async signOut(sessionId) {
        await this.sessionService.revokeSession(sessionId);
    }
    async resetPassword(email) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            // Return silently to prevent email enumeration
            return;
        }
        // TODO: Implement password reset token generation and email sending
        throw new Error('Not implemented');
    }
    async confirmResetPassword(token, newPassword) {
        // TODO: Implement password reset confirmation
        throw new Error('Not implemented');
    }
}
