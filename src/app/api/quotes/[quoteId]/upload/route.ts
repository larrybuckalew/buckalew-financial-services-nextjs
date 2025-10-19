import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest, { params }: { params: { quoteId: string } }) {
  const { quoteId } = params;

  if (!quoteId) {
    return NextResponse.json({ message: 'Quote ID is required' }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Basic file validation
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ message: 'Invalid file type. Only PDF, JPEG, PNG are allowed.' }, { status: 400 });
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      return NextResponse.json({ message: 'File size exceeds 5MB limit.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${quoteId}-${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', quoteId); // Store in public/uploads/quoteId/

    // Ensure the upload directory exists
    await require('fs').promises.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // In a real application, you would also save file metadata to the database
    // e.g., prisma.document.create({ data: { quoteId, filename, filePath, mimeType: file.type, size: file.size } });

    return NextResponse.json({ message: 'File uploaded successfully', filename, filePath: `/uploads/${quoteId}/${filename}` }, { status: 200 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ message: 'Failed to upload file', error: (error as Error).message }, { status: 500 });
  }
}
