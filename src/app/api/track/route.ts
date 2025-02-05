import { NextResponse } from 'next/server';

const GHL_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InlXc25MaE1xcTRwZEVCekcyVzY0IiwidmVyc2lvbiI6MSwiaWF0IjoxNzMwMzk4MjAyMzgyfQ.XZBrh6VaNNYzTiBYmpSq5f80kSJ6l9UsQzsz8AgUI_Y';
const GHL_LOCATION_ID = 'yWsnLhMqq4pdEBzG2W64';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Track event in Go High Level
    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.user_email,
        tags: ['Guide Download', `Guide: ${data.guide_name}`],
        customField: {
          'last_guide_downloaded': data.guide_name,
          'download_timestamp': new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to track event: ${response.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track event' },
      { status: 500 }
    );
  }
}