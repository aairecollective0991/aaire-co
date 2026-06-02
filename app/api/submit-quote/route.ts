import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GOOGLE_SHEET_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxNM_KxmOjKVPlhgJHFW3HPchPuvxAxEPWsDam_PKXc-HX-DuUwbE20ddRRMcahm510/exec';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, buildingType, consentNonMarketing, consentMarketing, timestamp } = body;

    // DEBUG: Log environment variables
    console.log('=== DEBUG ENV VARS ===');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL);
    console.log('All env keys:', Object.keys(process.env).filter(k => k.includes('RESEND') || k.includes('NOTIFICATION')));
    console.log('======================');

    // Validate required fields
    if (!phone || !email) {
      return NextResponse.json(
        { error: "Phone and Email are required" },
        { status: 400 }
      );
    }

    // Setup Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format timestamp
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Send notification email to business
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "aairecollective@gmail.com";
    console.log('Sending notification email to:', notificationEmail);

    const notificationResult = await resend.emails.send({
      from: "AAIRE Quote Form <quotes@notification.aaireco.com>",
      to: notificationEmail,
      subject: `New Quote Request from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0d1b2a; padding: 20px; text-align: center;">
            <h1 style="color: #C9A96E; margin: 0;">AAIRE Co. Metal Buildings</h1>
            <p style="color: white; margin: 5px 0 0 0;">New Quote Request</p>
          </div>

          <div style="padding: 30px; background-color: #f7f5f0;">
            <p style="color: #0d1b2a; font-size: 14px; margin-bottom: 20px;">
              Submitted on ${formattedDate}
            </p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd;">
                  <strong style="color: #0d1b2a;">Name:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd; color: #0d1b2a;">
                  ${firstName} ${lastName}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd;">
                  <strong style="color: #0d1b2a;">Phone:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd; color: #0d1b2a;">
                  <a href="tel:${phone}" style="color: #C9A96E; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd;">
                  <strong style="color: #0d1b2a;">Email:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd; color: #0d1b2a;">
                  <a href="mailto:${email}" style="color: #C9A96E; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd;">
                  <strong style="color: #0d1b2a;">Building Type:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd; color: #0d1b2a;">
                  ${buildingType || "Not specified"}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd;">
                  <strong style="color: #0d1b2a;">Non-Marketing Consent:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #ddd; color: #0d1b2a;">
                  ${consentNonMarketing ? "✓ Yes" : "✗ No"}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0;">
                  <strong style="color: #0d1b2a;">Marketing Consent:</strong>
                </td>
                <td style="padding: 12px 0; color: #0d1b2a;">
                  ${consentMarketing ? "✓ Yes" : "✗ No"}
                </td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 15px; background-color: #C9A96E; border-radius: 5px;">
              <p style="margin: 0; color: #0d1b2a; font-weight: bold;">
                ⏰ Reminder: Respond within 2 hours during business hours
              </p>
            </div>
          </div>

          <div style="background-color: #0d1b2a; padding: 15px; text-align: center;">
            <p style="color: #C9A96E; margin: 0; font-size: 12px;">
              AAIRE Co. Metal Buildings | Quote Management System
            </p>
          </div>
        </div>
      `,
    });

    console.log('Notification email result:', JSON.stringify(notificationResult));

    // Send confirmation email to customer (personal note from Alex, replies route to him)
    const confirmationResult = await resend.emails.send({
      from: "Alex Esposito - AAIRE Co. Metal Buildings <alex@notification.aaireco.com>",
      to: email,
      replyTo: "aairecollective@gmail.com",
      subject: "Thank you for reaching out - AAIRE Co. Metal Buildings",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0d1b2a; padding: 20px; text-align: center;">
            <h1 style="color: #C9A96E; margin: 0;">AAIRE Co. Metal Buildings</h1>
            <p style="color: white; margin: 5px 0 0 0;">Thanks for reaching out!</p>
          </div>

          <div style="padding: 30px; background-color: #f7f5f0;">
            <p style="color: #0d1b2a; font-size: 16px; margin: 0 0 20px 0;">
              Hi ${firstName},
            </p>

            <p style="color: #0d1b2a; line-height: 1.7; margin: 0 0 18px 0;">
              Thank you for reaching out to AAIRE Co. Metal Buildings.
            </p>

            <p style="color: #0d1b2a; line-height: 1.7; margin: 0 0 18px 0;">
              Can you tell me more about your project? We specialize in keeping you informed and
              getting everything you need to know right in front of you.
            </p>

            <p style="color: #0d1b2a; line-height: 1.7; margin: 0 0 24px 0;">
              Design your building on the <a href="https://www.worldwidesteelbuildings.com/designer/" style="color: #C9A96E; font-weight: bold; text-decoration: underline;">Designer</a>, hit save and send it my way! Or you can send me
              any napkin sketch you have and I will get back to you.
            </p>

            <div style="text-align: center; margin: 28px 0;">
              <a href="https://www.worldwidesteelbuildings.com/designer/"
                 style="display: inline-block; background-color: #C9A96E; color: #0d1b2a; padding: 14px 34px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Design Your Building
              </a>
              <p style="color: #0d1b2a; font-size: 14px; margin: 14px 0 0 0;">
                Hit <strong>Save</strong> in the Designer, then just reply to this email and send it my way.
              </p>
            </div>

            ${buildingType ? `
            <div style="background-color: white; padding: 16px 20px; border-left: 4px solid #C9A96E; margin: 24px 0; color: #0d1b2a;">
              <p style="margin: 0; font-size: 14px;"><strong>Project you told us about:</strong> ${buildingType}</p>
            </div>` : ""}

            <p style="color: #0d1b2a; line-height: 1.7; margin: 28px 0 0 0;">
              Thank you,<br><br>
              <strong>Alex Esposito</strong><br>
              AAIRE Co. Metal Buildings LLC<br>
              <a href="mailto:aairecollective@gmail.com" style="color: #C9A96E; text-decoration: none;">aairecollective@gmail.com</a>
            </p>
          </div>

          <div style="background-color: #0d1b2a; padding: 15px; text-align: center;">
            <p style="color: #C9A96E; margin: 0; font-size: 12px;">
              AAIRE Co. Metal Buildings
            </p>
            <p style="color: white; margin: 5px 0 0 0; font-size: 12px;">
              Delivering quality metal buildings nationwide
            </p>
          </div>
        </div>
      `,
    });

    console.log('Confirmation email result:', JSON.stringify(confirmationResult));

    // Save to Google Sheet (same as PDF downloads)
    try {
      const sheetPayload = {
        firstName,
        lastName,
        email,
        phone,
        buildingType: buildingType || 'Not specified',
        consentNonMarketing: consentNonMarketing ? 'Yes' : 'No',
        consentMarketing: consentMarketing ? 'Yes' : 'No',
        timestamp,
        source: 'Quote Form',
      };

      console.log('Sending to Google Sheet webhook:', sheetPayload);

      const sheetResponse = await fetch(GOOGLE_SHEET_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetPayload),
      });

      const sheetResponseText = await sheetResponse.text();
      console.log('Google Sheet response status:', sheetResponse.status);
      console.log('Google Sheet response:', sheetResponseText);
    } catch (sheetError) {
      console.error('Failed to save to Google Sheet:', sheetError);
      // Don't fail the whole request if Google Sheet fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting quote:", error);
    return NextResponse.json(
      {
        error: "Failed to submit quote",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
