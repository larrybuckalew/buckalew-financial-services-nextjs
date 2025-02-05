interface DownloadEvent {
  guide_name: string;
  file_name: string;
  source_page?: string;
  user_email?: string;
}

interface LeadEvent {
  email: string;
  name: string;
  guide_requested: string;
  source?: string;
}

// Track PDF downloads
export const trackDownload = (data: DownloadEvent) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'download_guide', {
      ...data,
      event_category: 'Guides',
      event_label: data.guide_name
    });
  }

  // Go High Level tracking
  const ghl_data = {
    type: 'guide_download',
    ...data,
    timestamp: new Date().toISOString()
  };

  fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ghl_data)
  }).catch(console.error);
};

// Track lead generation
export const trackLead = (data: LeadEvent) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      ...data,
      event_category: 'Leads',
      event_label: data.guide_requested
    });
  }

  // Go High Level lead creation
  fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).catch(console.error);
};

// Track guide views
export const trackGuideView = (guideName: string) => {
  if (window.gtag) {
    window.gtag('event', 'view_guide', {
      guide_name: guideName,
      event_category: 'Guides',
      event_label: guideName
    });
  }
};