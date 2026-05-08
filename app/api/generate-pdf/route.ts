import { NextResponse } from 'next/server';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { BuyersGuidePDF } from '../../components/BuyersGuidePDF';

export async function GET() {
  try {
    // Generate PDF as buffer using React.createElement (no JSX in API routes)
    const pdfBuffer = await renderToBuffer(
      React.createElement(BuyersGuidePDF)
    );

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="AAIRE-Metal-Building-Buyers-Guide.pdf"',
      },
    });
  } catch (error: any) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
