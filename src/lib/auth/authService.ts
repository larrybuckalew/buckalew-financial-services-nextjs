export interface AuthService {
  refreshToken?: () => Promise<string>;
}

export const AuthService: AuthService = {
  refreshToken: async () => 'placeholder-token'
};