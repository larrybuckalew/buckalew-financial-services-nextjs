import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import axios from 'axios';

const prisma = new PrismaClient();

// Configuration for External API
const API_KEY = process.env.EXTERNAL_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InlXc25MaE1xcTRwZEVCekcyVzY0IiwidmVyc2lvbiI6MSwiaWF0IjoxNzMwMzk4MjAyMzgyfQ.XZBrh6VaNNYzTiBYmpSq5f80kSJ6l9UsQzsz8AgUI_Y';
const LOCATION_ID = process.env.LOCATION_ID || 'yWsnLhMqq4pdEBzG2W64';
const API_BASE_URL = 'https://api.example.com/v1'; // Replace with actual API base URL

// Validation Schema
const gatedContentSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone number must be in (XXX) XXX-XXXX format"),
  preferredContactMethod: z.enum(['email', 'phone', 'both']),
  interestedIn: z.array(z.string()).min(1, "Please select at least one area of interest"),
  pdfTitle: z.string()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate incoming data
    const validatedData = gatedContentSchema.parse(body);

    // Prepare data for external API and local database
    const contactData = {
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      email: validatedData.email,
      phone_number: validatedData.phoneNumber,
      location_id: LOCATION_ID,
      custom_fields: {
        preferred_contact_method: validatedData.preferredContactMethod,
        interested_in: validatedData.interestedIn.join(', '),
        downloaded_pdf: validatedData.pdfTitle
      }
    };

    // Send data to external API
    const apiResponse = await axios.post(`${API_BASE_URL}/contacts`, contactData, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Check if external API call was successful
    if (apiResponse.status !== 200 && apiResponse.status !== 201) {
      throw new Error('Failed to create contact in external system');
    }

    // Create or update local database record
    const downloadRecord = await prisma.gatedContentDownload.upsert({
      where: { email: validatedData.email },
      update: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
        contactMethod: validatedData.preferredContactMethod,
        interestedIn: validatedData.interestedIn,
        pdfTitle: validatedData.pdfTitle,
        downloadedAt: new Date()
      },
      create: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber,
        contactMethod: validatedData.preferredContactMethod,
        interestedIn: validatedData.interestedIn,
        pdfTitle: validatedData.pdfTitle
      }
    });

    // Optional: Add to marketing consent
    await prisma.marketingConsent.upsert({
      where: { email: validatedData.email },
      update: { optInMarketing: true },
      create: { 
        email: validatedData.email, 
        optInMarketing: true 
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Content download tracked successfully',
      downloadId: downloadRecord.id,
      externalContactId: apiResponse.data.id
    }, { status: 200 });

  } catch (error) {
    console.error('Gated content download error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        message: 'Validation failed',
        errors: error.flatten().fieldErrors 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Optional: Add a GET method to retrieve download information
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ 
      success: false, 
      message: 'Email is required' 
    }, { status: 400 });
  }

  try {
    const downloads = await prisma.gatedContentDownload.findMany({
      where: { email },
      orderBy: { downloadedAt: 'desc' }
    });

    return NextResponse.json({ 
      success: true, 
      downloads 
    }, { status: 200 });

  } catch (error) {
    console.error('Error retrieving download history:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to retrieve download history' 
    }, { status: 500 });
  }
}
