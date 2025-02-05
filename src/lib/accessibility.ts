import React from 'react';

export interface AccessibilityProps {
  label?: string;
  description?: string;
}

export class AccessibilityUtility {
  // Generate ARIA attributes
  static generateAriaProps(props: AccessibilityProps) {
    return {
      'aria-label': props.label,
      'aria-description': props.description
    };
  }

  // Color contrast utility
  static validateColorContrast(foreground: string, background: string): boolean {
    const getLuminance = (color: string) => {
      const rgb = parseInt(color.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >>  8) & 0xff;
      const b = (rgb >>  0) & 0xff;
      
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928
          ? v / 12.92
          : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const contrast = (color1: string, color2: string) => {
      const lum1 = getLuminance(color1);
      const lum2 = getLuminance(color2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    };

    // WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1
    return contrast(foreground, background) >= 4.5;
  }

  // Keyboard navigation enhancement
  static enhanceKeyboardNavigation(
    element: React.RefObject<HTMLElement>, 
    options?: {
      trapFocus?: boolean;
      customKeys?: {[key: string]: (e: KeyboardEvent) => void}
    }
  ) {
    if (!element.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Trap focus within the element
      if (options?.trapFocus && e.key === 'Tab') {
        const focusableElements = element.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements && focusableElements.length > 0) {
          const first = focusableElements[0] as HTMLElement;
          const last = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }

      // Custom key handlers
      options?.customKeys?.[e.key]?.(e);
    };

    element.current.addEventListener('keydown', handleKeyDown);
    return () => {
      element.current?.removeEventListener('keydown', handleKeyDown);
    };
  }

  // Screen reader friendly content wrapper
  static screenReaderContent(content: string, hidden?: boolean) {
    return (
      <span 
        style={{ 
          position: 'absolute', 
          width: '1px', 
          height: '1px', 
          padding: 0,
          margin: '-1px', 
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
          ...(hidden ? { display: 'none' } : {})
        }}
      >
        {content}
      </span>
    );
  }
}
