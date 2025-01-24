export class AccessibilityHelper {
  /**
   * Generate a unique ID for form elements
   * @param prefix Optional prefix for the ID
   * @returns Unique ID string
   */
  static generateUniqueId(prefix: string = 'a11y'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Add aria labels dynamically
   * @param element HTML Element
   * @param label Aria label text
   */
  static addAriaLabel(element: HTMLElement, label: string) {
    element.setAttribute('aria-label', label);
  }

  /**
   * Check color contrast ratio
   * @param foreground Foreground color
   * @param background Background color
   * @returns Contrast ratio
   */
  static checkColorContrast(foreground: string, background: string): number {
    const luminance1 = this.calculateLuminance(foreground);
    const luminance2 = this.calculateLuminance(background);
    
    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Calculate relative luminance of a color
   * @param color Color in hex or rgb
   * @returns Luminance value
   */
  private static calculateLuminance(color: string): number {
    const rgb = this.parseColor(color);
    const a = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  /**
   * Parse color to RGB values
   * @param color Color in hex or rgb
   * @returns RGB array
   */
  private static parseColor(color: string): number[] {
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const bigint = parseInt(hex, 16);
      return [
        (bigint >> 16) & 255,
        (bigint >> 8) & 255,
        bigint & 255
      ];
    }
    
    // Handle rgb(r,g,b) format
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10)
      ];
    }

    throw new Error('Unsupported color format');
  }

  /**
   * Validate WCAG 2.1 color contrast requirements
   * @param foreground Foreground color
   * @param background Background color
   * @returns Boolean indicating if contrast meets WCAG standards
   */
  static meetsWCAGContrast(foreground: string, background: string): boolean {
    const contrastRatio = this.checkColorContrast(foreground, background);
    
    // WCAG 2.1 Level AA requires:
    // - 4.5:1 for normal text
    // - 3:1 for large text
    return contrastRatio >= 4.5;
  }

  /**
   * Add keyboard navigation support
   * @param element Element to add keyboard navigation
   * @param onActivate Callback when element is activated via keyboard
   */
  static addKeyboardSupport(
    element: HTMLElement, 
    onActivate: (event: KeyboardEvent) => void
  ) {
    element.setAttribute('tabindex', '0');
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onActivate(event);
      }
    });
  }
}

export default AccessibilityHelper;
