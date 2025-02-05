const GHL_API_KEY = process.env.GHL_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InlXc25MaE1xcTRwZEVCekcyVzY0IiwidmVyc2lvbiI6MSwiaWF0IjoxNzMwMzk4MjAyMzgyfQ.XZBrh6VaNNYzTiBYmpSq5f80kSJ6l9UsQzsz8AgUI_Y';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'yWsnLhMqq4pdEBzG2W64';
const GHL_BASE_URL = 'https://rest.gohighlevel.com/v1';

interface ContactData {
  email: string;
  name: string;
  phone?: string;
  guideRequested?: string;
  source?: string;
}

export async function addContact(data: ContactData) {
  const names = data.name.split(' ');
  const firstName = names[0];
  const lastName = names.slice(1).join(' ');

  try {
    const response = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Location-Id': GHL_LOCATION_ID
      },
      body: JSON.stringify({
        email: data.email,
        phone: data.phone,
        firstName,
        lastName,
        tags: [
          'Guide Download',
          `Guide: ${data.guideRequested || 'Unspecified'}`,
          'Lead Source: Website'
        ],
        source: 'Website Guide Download',
        customField: {
          'last_guide_downloaded': data.guideRequested || 'Unspecified',
          'download_date': new Date().toISOString(),
          'lead_source_details': data.source || 'Educational Resources Page'
        }
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Contact creation error:', {
        status: response.status,
        body: errorBody
      });
      throw new Error(`Failed to add contact: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Contact created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
}

export async function createTask(contactId: string, title: string, dueDate?: string) {
  try {
    console.log('Attempting to create task with:', { 
      contactId, 
      title, 
      dueDate: dueDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() 
    });

    const response = await fetch(`${GHL_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Location-Id': GHL_LOCATION_ID
      },
      body: JSON.stringify({
        contactId,
        title,
        dueDate: dueDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'open',
        priority: 'medium'
      })
    });

    // Log full response details for debugging
    const responseBody = await response.text();
    console.log('Task Creation Response:', {
      status: response.status,
      body: responseBody
    });

    if (!response.ok) {
      console.error('Task creation failed:', {
        status: response.status,
        body: responseBody
      });
      throw new Error(`Failed to create task: ${response.statusText} - ${responseBody}`);
    }

    return JSON.parse(responseBody);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function addNote(contactId: string, note: string) {
  try {
    const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Location-Id': GHL_LOCATION_ID
      },
      body: JSON.stringify({
        body: note
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Note creation error:', {
        status: response.status,
        body: errorBody
      });
      throw new Error(`Failed to add note: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
}