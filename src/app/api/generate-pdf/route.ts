import { NextRequest, NextResponse } from 'next/server';
import { generatePDF, pdfTypes } from '@/services/pdfGenerationService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !Object.values(pdfTypes).includes(type)) {
      return NextResponse.json(
        { error: 'Invalid PDF type' },
        { status: 400 }
      );
    }

    const pdfBuffer = await generatePDF(type, data);

    // Return the PDF with appropriate headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${type}-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint for benefit guides
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    
    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    const pdfBuffer = await generatePDF(pdfTypes.BENEFITS_GUIDE, { insuranceType: type });

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="benefits-guide-${type}-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating benefits guide:', error);
    return NextResponse.json(
      { error: 'Failed to generate benefits guide' },
      { status: 500 }
    );
  }
}