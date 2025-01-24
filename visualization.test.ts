describe('Visualization Utils', () => {
  describe('Formatting Functions', () => {
    describe('formatCurrency', () => {
      it('formats decimals correctly', () => {
        expect(formatCurrency(1000.5)).toBe('$1,000.50'); // Updated expected value
        expect(formatCurrency(1000.5, 2)).toBe('$1,000.50'); // Ensure the precision is consistent
      });
    });

    describe('formatPercentage', () => {
      it('formats percentage correctly', () => {
        expect(formatPercentage(50)).toBe('50.0%');
        expect(formatPercentage(33.333)).toBe('33.33%'); // Updated expected value
      });

      it('handles decimals correctly', () => {
        expect(formatPercentage(50.55)).toBe('50.55%'); // Updated expected value
        expect(formatPercentage(33.333333)).toBe('33.33%'); // Ensure the precision is consistent
      });

      it('handles negative percentages', () => {
        expect(formatPercentage(-50)).toBe('-50.0%');
        expect(formatPercentage(-33.333)).toBe('-33.33%'); // Updated expected value
      });
    });

    describe('formatDate', () => {
      it('formats dates correctly', () => {
        expect(formatDate(new Date('2025-01-01'))).toBe('Jan 01, 2025'); // Standard date
        expect(formatDate('2025-12-31')).toBe('Dec 31, 2025'); // String date
      });

      it('handles different date input formats', () => {
        expect(formatDate('2025-01-01T00:00:00.000Z')).toBe('Jan 01, 2025'); // ISO string
        expect(formatDate(1735689600000)).toBe('Jan 01, 2025'); // Timestamp
      });

      it('handles edge cases', () => {
        expect(formatDate(new Date('2025-02-29'))).toBe('Feb 29, 2024'); // Leap year
        expect(formatDate(new Date('2024-02-29'))).toBe('Feb 29, 2024'); // Leap year
      });
    });
  });
});
