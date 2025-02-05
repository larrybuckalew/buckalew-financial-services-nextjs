import { PrismaClient } from '@prisma/client';

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async login(email: string, password: string) {
    // Placeholder login method
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // In a real app, you'd use bcrypt to compare passwords
    return user;
  }
}
