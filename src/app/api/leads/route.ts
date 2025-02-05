import { NextResponse } from 'next/server';
import { addContact, createTask, addNote } from '@/services/gohighlevel';

export async function POST(request: Request) {
  try {
    // Log the entire request body for debugging
    const body = await request.json();
    console.log('Full request body:', JSON.stringify(body, null, 2));

    const { 
      name, 
      email, 
      phone = '', 
      guideRequested = 'Unspecified Guide'
    } = body;

    // Extra verbose logging
    console.log('Processing lead:', { 
      name, 
      email, 
      phoneLength: phone.length, 
      guideRequested 
    });

    // Even more strict input validation
    if (!name || name.trim().length < 2) {
      console.error('Invalid name:', name);
      return NextResponse.json({ 
        success: false, 
        message: 'A valid name is required (at least 2 characters)' 
      }, { status: 400 });
    }

    if (!email || !email.includes('@')) {
      console.error('Invalid email:', email);
      return NextResponse.json({ 
        success: false, 
        message: 'A valid email address is required' 
      }, { status: 400 });
    }

    // Prepare contact data with more robust information
    const contactData = {
      email,
      name,
      phone: phone || undefined,
      guideRequested,
      tags: ['Guide Download', `Guide: ${guideRequested}`],
      source: 'Website Guides Page',
      customField: {
        'last_guide_downloaded': guideRequested,
        'download_source': 'Website Guides'
      }
    };

    console.log('Preparing to add contact:', contactData);

    // Add contact
    const contactResponse = await addContact(contactData);
    
    if (!contactResponse || !contactResponse.contact || !contactResponse.contact.id) {
      console.error('Contact creation failed', contactResponse);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to create contact' 
      }, { status: 500 });
    }

    const contactId = contactResponse.contact.id;
    console.log('Contact added successfully:', contactId);

    // Attempt to create a task (non-blocking)
    try {
      await createTask(
        contactId, 
        `Follow up - Guide Download: ${guideRequested}`
      );
    } catch (taskError) {
      console.error('Task creation failed:', taskError);
    }

    // Attempt to add a note (non-blocking)
    try {
      await addNote(
        contactId, 
        `Contact downloaded guide: ${guideRequested}\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}`
      );
    } catch (noteError) {
      console.error('Note addition failed:', noteError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Contact added successfully',
      contactId: contactId
    });

  } catch (error) {
    console.error('CRITICAL ERROR processing lead:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process lead', 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}