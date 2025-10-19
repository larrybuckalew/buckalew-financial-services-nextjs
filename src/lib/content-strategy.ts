export interface Testimonial {
  name: string;
  role?: string;
  quote: string;
  location?: string;
  rating?: number;
}

export interface CallToAction {
  primary: {
    text: string;
    href: string;
  };
  secondary?: {
    text: string;
    href: string;
  };
}

export interface ComparisonTableColumn {
  key: string;
  label: string;
  formatter?: (value: any) => string;
}

export class ContentStrategyUtility {
  // Generate testimonials
  static generateTestimonials(category: 'life-insurance' | 'health-insurance'): Testimonial[] {
    const testimonialMap = {
      'life-insurance': [
        {
          name: 'Michael Johnson',
          role: 'Small Business Owner',
          quote: 'Buckalew helped me find the perfect term life insurance that gives my family peace of mind.',
          location: 'Tampa, FL',
          rating: 5
        },
        {
          name: 'Sarah Mitchell',
          role: 'Young Professional',
          quote: 'I never thought life insurance could be this straightforward and affordable.',
          location: 'Orlando, FL',
          rating: 4.5
        }
      ],
      'health-insurance': [
        {
          name: 'Robert Garcia',
          role: 'Freelancer',
          quote: 'The ACA plan I found through Buckalew is comprehensive and fits my budget perfectly.',
          location: 'Miami, FL',
          rating: 5
        },
        {
          name: 'Emily Chen',
          role: 'Small Business Employee',
          quote: 'Navigating Medicare was complicated until Buckalew guided me through my options.',
          location: 'St. Petersburg, FL',
          rating: 4.5
        }
      ]
    };

    return testimonialMap[category];
  }

  // Generate calls to action
  static generateCTA(type: 'quote' | 'consultation' | 'compare-plans'): CallToAction {
    const ctaMap = {
      'quote': {
        primary: {
          text: 'Get Your Free Quote',
          href: '/quote-request'
        },
        secondary: {
          text: 'Compare Plans',
          href: '/plan-comparison'
        }
      },
      'consultation': {
        primary: {
          text: 'Schedule Consultation',
          href: '/schedule-consultation'
        }
      },
      'compare-plans': {
        primary: {
          text: 'Compare Insurance Plans',
          href: '/plan-comparison'
        },
        secondary: {
          text: 'Talk to an Expert',
          href: '/contact'
        }
      }
    };

    return ctaMap[type];
  }

  // Create comparison table
  static createComparisonTable(
    data: any[], 
    columns: ComparisonTableColumn[]
  ) {
    return {
      headers: columns.map(col => col.label),
      rows: data.map(item => 
        columns.map(col => 
          col.formatter 
            ? col.formatter(item[col.key]) 
            : item[col.key]
        )
      )
    };
  }

  // Generate schema markup for social proof
  static generateTestimonialSchema(testimonials: Testimonial[]) {
    return testimonials.map(testimonial => ({
      '@context': 'https://schema.org',
      '@type': 'Review',
      'reviewBody': testimonial.quote,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': testimonial.rating || 5
      },
      'author': {
        '@type': 'Person',
        'name': testimonial.name,
        ...(testimonial.role ? { 'jobTitle': testimonial.role } : {}),
        ...(testimonial.location ? { 'address': testimonial.location } : {})
      }
    }));
  }
}
