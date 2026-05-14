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

    // Send confirmation email to customer
    const confirmationResult = await resend.emails.send({
      from: "AAIRE Co. Metal Buildings <noreply@notification.aaireco.com>",
      to: email,
      subject: "Thank you for your quote request - AAIRE Co.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0d1b2a; padding: 20px; text-align: center;">
            <h1 style="color: #C9A96E; margin: 0;">AAIRE Co. Metal Buildings</h1>
            <p style="color: white; margin: 5px 0 0 0;">We received your quote request!</p>
          </div>

          <div style="padding: 30px; background-color: #f7f5f0;">
            <p style="color: #0d1b2a; font-size: 16px; margin-bottom: 20px;">
              Hi ${firstName},
            </p>

            <p style="color: #0d1b2a; line-height: 1.6; margin-bottom: 20px;">
              Thank you for your interest in AAIRE Co. Metal Buildings! We've received your quote request and our team will respond within <strong>2 hours during business hours</strong>.
            </p>

            <div style="background-color: white; padding: 20px; border-left: 4px solid #C9A96E; margin: 25px 0;">
              <h3 style="color: #0d1b2a; margin-top: 0;">Your Request Details:</h3>
              <p style="color: #0d1b2a; margin: 5px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p style="color: #0d1b2a; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="color: #0d1b2a; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
              ${buildingType ? `<p style="color: #0d1b2a; margin: 5px 0;"><strong>Building Type:</strong> ${buildingType}</p>` : ""}
            </div>

            <div style="background-color: #C9A96E; padding: 20px; border-radius: 5px; margin: 25px 0; text-align: center;">
              <h3 style="color: #0d1b2a; margin-top: 0;">Design Your Building</h3>
              <p style="color: #0d1b2a; margin-bottom: 15px;">
                AAIRE Co. specializes in thorough pre-planning that helps you select the design you want.
              </p>
              <a href="https://www.worldwidesteelbuildings.com/designer/"
                 style="display: inline-block; background-color: #0d1b2a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Use Our Design Tool
              </a>
              <p style="color: #0d1b2a; font-size: 14px; margin-top: 15px; margin-bottom: 0;">
                Be sure to click Save and send us the results!
              </p>
            </div>

            <p style="color: #0d1b2a; line-height: 1.6;">
              In the meantime, feel free to explore our design tool above or reach out if you have any questions.
            </p>

            <p style="color: #0d1b2a; margin-top: 25px;">
              Best regards,<br>
              <strong>The AAIRE Co. Team</strong>
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
