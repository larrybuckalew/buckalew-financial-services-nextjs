import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { templateName, data, recipientEmail } = await request.json();

    if (!templateName || !data || !recipientEmail) {
      return NextResponse.json({ error: 'Missing required parameters: templateName, data, recipientEmail' }, { status: 400 });
    }

    const scriptPath = path.resolve(process.cwd(), 'email-templates-standalone', 'sendEmail.js');

    // Execute the standalone script as a child process
    exec(`node ${scriptPath} ${templateName} ${JSON.stringify(data)} ${recipientEmail}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    return NextResponse.json({ message: 'Email sending process initiated.' }, { status: 200 });
  } catch (error) {
    console.error('Error in send-templated-email API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
