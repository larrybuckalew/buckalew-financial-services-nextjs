import posthog from 'posthog-js';

class UserAnalytics {
  static init() {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        posthog.opt_in_capturing(); // Optional: explicitly opt-in
      }
    });
  }

  static identify(userId: string, userProperties?: Record<string, any>) {
    posthog.identify(userId, userProperties);
  }

  static track(eventName: string, properties?: Record<string, any>) {
    posthog.capture(eventName, properties);
  }

  static trackPageView(pagePath: string) {
    posthog.capture('$pageview', { 
      $current_url: pagePath 
    });
  }

  static setUserProperties(properties: Record<string, any>) {
    posthog.people.set(properties);
  }
}

export default UserAnalytics;
