// GoHighLevel Workflow IDs
export const WORKFLOW_IDS = {
  GUIDE_DOWNLOAD: 'your_workflow_id_here',
  MEDICARE_GUIDE_DOWNLOAD: 'your_medicare_workflow_id_here',
  INSURANCE_GUIDE_DOWNLOAD: 'your_insurance_workflow_id_here'
};

// Email Templates
export const EMAIL_TEMPLATES = {
  GUIDE_THANK_YOU: 'template_id_here',
  FOLLOW_UP_1: 'follow_up_1_template_id',
  FOLLOW_UP_2: 'follow_up_2_template_id'
};

// Tags
export const TAGS = {
  // Lead Source Tags
  WEBSITE_VISITOR: 'Website Visitor',
  GUIDE_DOWNLOAD: 'Guide Download',
  
  // Interest Tags
  MEDICARE_INTEREST: 'Medicare Interest',
  LIFE_INSURANCE_INTEREST: 'Life Insurance Interest',
  HEALTH_INSURANCE_INTEREST: 'Health Insurance Interest',
  
  // Status Tags
  LEAD: 'Lead',
  PROSPECT: 'Prospect',
  QUALIFIED: 'Qualified Lead',
  
  // Action Tags
  NEEDS_FOLLOW_UP: 'Needs Follow Up',
  CONTACTED: 'Contacted',
  APPOINTMENT_SET: 'Appointment Set'
};

// Custom Fields
export const CUSTOM_FIELDS = {
  LAST_GUIDE_DOWNLOADED: 'last_guide_downloaded',
  DOWNLOAD_DATE: 'guide_download_date',
  LEAD_SOURCE: 'lead_source',
  LEAD_SOURCE_DETAILS: 'lead_source_details',
  INTERESTED_IN: 'interested_in',
  FOLLOW_UP_DATE: 'follow_up_date',
  PREFERRED_CONTACT_METHOD: 'preferred_contact_method'
};

// Follow-up Schedule (in days)
export const FOLLOW_UP_SCHEDULE = {
  FIRST_FOLLOW_UP: 2,
  SECOND_FOLLOW_UP: 5,
  THIRD_FOLLOW_UP: 10
};

// Task Templates
export const TASK_TEMPLATES = {
  GUIDE_FOLLOW_UP: {
    title: 'Follow up - Guide Download: {guide_name}',
    description: 'Contact downloaded {guide_name} on {date}. Email: {email}'
  },
  APPOINTMENT_REMINDER: {
    title: 'Appointment Reminder - {name}',
    description: 'Appointment scheduled for {date} regarding {topic}'
  }
};