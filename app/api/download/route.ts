import { NextResponse } from 'next/server';

const GOOGLE_SHEET_WEBHOOK = 'https://script.google.com/macros/s/AKfycbw7we26aV4BKNKO1gH1615Izwbrb_qSsKuftNhuqklcBjQLZTNl_9yS1CcRQcBzf6c9BQ/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;
    const timestamp = new Date().toISOString();

    // Send to Google Sheet
    const sheetResponse = await fetch(GOOGLE_SHEET_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        timestamp,
        source: 'PDF Download',
      }),
    });

    if (!sheetResponse.ok) {
      console.error('Failed to save to Google Sheet:', await sheetResponse.text());
    }

    // Log locally as backup
    console.log('📥 New Guide Download:', { name, email, timestamp });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Download form error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
