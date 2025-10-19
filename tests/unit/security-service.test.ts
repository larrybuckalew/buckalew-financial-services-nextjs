import SecurityService from '@/lib/security/security-service'

describe('SecurityService', () => {
  describe('generateSecureToken', () => {
    it('should generate a token of the specified length', () => {
      const token = SecurityService.generateSecureToken(32)
      expect(token).toHaveLength(64) // hex encoding doubles the length
    })

    it('should generate unique tokens', () => {
      const token1 = SecurityService.generateSecureToken()
      const token2 = SecurityService.generateSecureToken()
      expect(token1).not.toEqual(token2)
    })
  })

  describe('validatePasswordStrength', () => {
    it('should reject weak passwords', () => {
      expect(SecurityService.validatePasswordStrength('short')).toBeFalsy()
      expect(SecurityService.validatePasswordStrength('onlylowercase')).toBeFalsy()
      expect(SecurityService.validatePasswordStrength('ONLYUPPERCASE')).toBeFalsy()
      expect(SecurityService.validatePasswordStrength('NoSpecialChars123')).toBeFalsy()
    })

    it('should accept strong passwords', () => {
      expect(SecurityService.validatePasswordStrength('StrongP@ssw0rd123!')).toBeTruthy()
      expect(SecurityService.validatePasswordStrength('C0mpl3x!Password')).toBeTruthy()
    })
  })

  describe('sanitizeInput', () => {
    it('should escape HTML special characters', () => {
      const input = '<script>alert("XSS");</script>'
      const sanitized = SecurityService.sanitizeInput(input)
      expect(sanitized).toBe('&lt;script&gt;alert("XSS");&lt;/script&gt;')
    })
  })
})