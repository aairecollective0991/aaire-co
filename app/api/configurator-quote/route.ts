import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GOOGLE_SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbxNM_KxmOjKVPlhgJHFW3HPchPuvxAxEPWsDam_PKXc-HX-DuUwbE20ddRRMcahm510/exec";

type SpecPayload = {
  dimensions: { width: number; length: number; eaveHeight: number };
  roof: { style: string; pitch: number; trussType: string };
  colors: { roof: string; walls: string; trim: string };
  porches: Array<{ side: string; depth: number; pitch: number }>;
  openings: Array<{ type: string; side: string; positionFromCorner: number; width: number; height: number }>;
  addons: string[];
};

const TRUSS_LABEL: Record<string, string> = {
  "open-web": "Open Web Truss",
  "flush-column": "Residential Flush Column",
};

const row = (label: string, value: string) => `
  <tr>
    <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong style="color:#0d1b2a;">${label}:</strong></td>
    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; color:#0d1b2a;">${value}</td>
  </tr>`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, notes, spec, specText } = body as {
      firstName: string; lastName: string; email: string; phone: string; notes?: string;
      spec: SpecPayload; specText: string;
    };

    if (!email || !phone || !spec || !specText) {
      return NextResponse.json({ error: "Email, phone, and build configuration are required" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "aairecollective@gmail.com";
    const sizeLabel = `${spec.dimensions.width}x${spec.dimensions.length}`;
    const timestamp = new Date().toLocaleString("en-US", {
      month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
    });

    const openingsSummary = spec.openings.length
      ? spec.openings.map((o) => `${o.type} ${o.width}'x${o.height}' (${o.side}, ${o.positionFromCorner}' from corner)`).join("<br>")
      : "None";
    const porchesSummary = spec.porches.length
      ? spec.porches.map((p) => `${p.side}: ${p.depth}' deep, ${p.pitch}:12`).join("<br>")
      : "None";
    const addonsSummary = spec.addons.length ? spec.addons.join(", ") : "None";

    // --- Notification email to the business, with the spec sheet attached ---
    const notificationResult = await resend.emails.send({
      from: "AAIRE Configurator <quotes@notification.aaireco.com>",
      to: notificationEmail,
      replyTo: email,
      subject: `New Configurator Quote (${sizeLabel}) from ${firstName} ${lastName}`,
      attachments: [{ filename: `aaire-${sizeLabel}-spec.txt`, content: Buffer.from(specText, "utf-8") }],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background-color:#0d1b2a; padding:20px; text-align:center;">
            <h1 style="color:#C9A96E; margin:0;">AAIRE Co. Metal Buildings</h1>
            <p style="color:white; margin:5px 0 0 0;">New Building Configurator Quote</p>
          </div>
          <div style="padding:28px; background-color:#f7f5f0;">
            <p style="color:#0d1b2a; font-size:14px; margin:0 0 18px 0;">Submitted on ${timestamp}</p>
            <h3 style="color:#0d1b2a; margin:0 0 8px 0;">Customer</h3>
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
              ${row("Name", `${firstName} ${lastName}`)}
              ${row("Phone", `<a href="tel:${phone}" style="color:#C9A96E; text-decoration:none;">${phone}</a>`)}
              ${row("Email", `<a href="mailto:${email}" style="color:#C9A96E; text-decoration:none;">${email}</a>`)}
              ${notes ? row("Notes", String(notes).replace(/\n/g, "<br>")) : ""}
            </table>
            <h3 style="color:#0d1b2a; margin:0 0 8px 0;">Build</h3>
            <table style="width:100%; border-collapse:collapse;">
              ${row("Size", `${spec.dimensions.width}' W x ${spec.dimensions.length}' L x ${spec.dimensions.eaveHeight}' eave`)}
              ${row("Roof", `${spec.roof.style}, ${spec.roof.pitch}:12 pitch`)}
              ${row("Framing", TRUSS_LABEL[spec.roof.trussType] || spec.roof.trussType)}
              ${row("Colors", `Roof: ${spec.colors.roof} &middot; Walls: ${spec.colors.walls} &middot; Trim: ${spec.colors.trim}`)}
              ${row("Openings", openingsSummary)}
              ${row("Porches", porchesSummary)}
              ${row("Inquire about", addonsSummary)}
            </table>
            <div style="margin-top:24px; padding:14px 18px; background-color:#C9A96E; border-radius:5px;">
              <p style="margin:0; color:#0d1b2a; font-weight:bold;">The full spec sheet is attached as a .txt file. Respond within 2 hours during business hours.</p>
            </div>
          </div>
          <div style="background-color:#0d1b2a; padding:15px; text-align:center;">
            <p style="color:#C9A96E; margin:0; font-size:12px;">AAIRE Co. Metal Buildings | Configurator</p>
          </div>
        </div>`,
    });
    console.log("Configurator notification result:", JSON.stringify(notificationResult));

    // --- Confirmation email to the customer ---
    try {
      await resend.emails.send({
        from: "Alex Esposito - AAIRE Co. Metal Buildings <alex@notification.aaireco.com>",
        to: email,
        replyTo: "aairecollective@gmail.com",
        subject: "We got your building design - AAIRE Co. Metal Buildings",
        html: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
            <div style="background-color:#0d1b2a; padding:20px; text-align:center;">
              <h1 style="color:#C9A96E; margin:0;">AAIRE Co. Metal Buildings</h1>
              <p style="color:white; margin:5px 0 0 0;">Your design is in!</p>
            </div>
            <div style="padding:30px; background-color:#f7f5f0;">
              <p style="color:#0d1b2a; font-size:16px; margin:0 0 18px 0;">Hi ${firstName},</p>
              <p style="color:#0d1b2a; line-height:1.7; margin:0 0 18px 0;">
                Thanks for designing your ${spec.dimensions.width}' x ${spec.dimensions.length}' steel building with us. We have your configuration and will follow up shortly with pricing and next steps.
              </p>
              <p style="color:#0d1b2a; line-height:1.7; margin:0 0 24px 0;">
                If you want to add or change anything, just reply to this email.
              </p>
              <p style="color:#0d1b2a; line-height:1.7; margin:28px 0 0 0;">
                Thank you,<br><br><strong>Alex Esposito</strong><br>AAIRE Co. Metal Buildings LLC<br>
                <a href="mailto:aairecollective@gmail.com" style="color:#C9A96E; text-decoration:none;">aairecollective@gmail.com</a>
              </p>
            </div>
            <div style="background-color:#0d1b2a; padding:15px; text-align:center;">
              <p style="color:#C9A96E; margin:0; font-size:12px;">AAIRE Co. Metal Buildings</p>
            </div>
          </div>`,
      });
    } catch (e) {
      console.error("Confirmation email failed:", e);
    }

    // --- Log to Google Sheet (best-effort) ---
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName, lastName, email, phone,
          buildingType: `Configurator ${sizeLabel} (${TRUSS_LABEL[spec.roof.trussType] || spec.roof.trussType})`,
          consentNonMarketing: "Yes", consentMarketing: "No",
          timestamp: new Date().toISOString(), source: "Configurator",
        }),
      });
    } catch (e) {
      console.error("Sheet webhook failed:", e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send quote";
    console.error("Configurator quote error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
