import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

// Force Node.js runtime for native dependencies
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Use pdf-parse for server-side parsing
async function parsePdf(buffer: Buffer): Promise<{ text: string; numpages: number }> {
  console.log("  - Parsing PDF with PDFParse...");

  const parser = new PDFParse({
    data: buffer,
    useWorkerFetch: false,
    isEvalSupported: false,
  });

  await parser.load();

  // Extract text from all pages
  let fullText = '';
  const numPages = parser.doc?.numPages || 0;

  for (let i = 1; i <= numPages; i++) {
    const page = await parser.doc!.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  console.log("  - Text extraction complete, pages:", numPages, "length:", fullText.length);
  return { text: fullText, numpages: numPages };
}

type ParsedQuote = {
  quoteNumber: string;
  date: string;
  buildingType: string;
  customerName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  width: string;
  length: string;
  eaveHeight: string;
  roofPitch: string;
  windSpeed: string;
  groundSnow: string;
  collateralLoad: string;
  style: string;
  trussType: string;
  buildingPlans: string;
  foundationPlans: string;
  buildingTypeWood: string;
  roofColor: string;
  wallsColor: string;
  wainscotColor: string;
  doorsColor: string;
  trimColor: string;
  soffitColor: string;
  packageIncludes: string[];
  includedOptions: string[];
  mustShipBy: string;
  faqs: string[];
  steelTrussWarranty: string;
  steelSheetingWarranty: string;
  buildingPrice: number;
  dealerDiscount: number;
  salesTax: number;
  pricingGoodThru: string;
  initialPaymentDue: number;
  images: string[]; // Base64 encoded images
};

function extractField(text: string, pattern: RegExp): string {
  const match = text.match(pattern);
  return match ? match[1].trim() : "";
}

function extractNumber(text: string, pattern: RegExp): number {
  const match = text.match(pattern);
  if (!match) return 0;
  const numStr = match[1].replace(/[$,]/g, "");
  return parseFloat(numStr) || 0;
}

function parseQuoteText(text: string): Omit<ParsedQuote, "images"> {
  // Clean up text - remove extra whitespace but keep structure
  const cleanText = text.replace(/\s+/g, " ").trim();

  // Quote number — trailing letters are optional (e.g. 868282HW or 868344)
  const quoteNumber = extractField(cleanText, /Quote\s*#\s*(\d+[A-Z]*)/i);
  const date = extractField(cleanText, /Date\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);

  // Customer name from "AAIRE Co. (Name)" format
  const customerName = extractField(cleanText, /AAIRE Co\.\s*\(([^)]+)\)/i);

  // Street address — number + street + suffix, terminated by "Building Consultant"
  const street = extractField(cleanText, /(\d+\s+[A-Za-z\s]+(?:Cir|St|Ave|Dr|Rd|Ln|Way|Blvd)[^\d]*?)\s+Building Consultant/i);

  // City — between "Stamped Engineered Plans" and "Consultant Phone" (handles multi-word cities)
  const city = extractField(cleanText, /Stamped Engineered Plans\s+([A-Za-z]+(?:\s+[A-Za-z]+)*?)\s+Consultant Phone/i);

  const state = extractField(cleanText, /Consultant Phone.*?([A-Z]{2})\s+Consultant Email/i);
  const zip = extractField(cleanText, /Consultant Email.*?(\d{5}-?\d{4})/i);
  const phone = extractField(cleanText, /\d{5}-\d{4}\s+(\(\d{3}\)\s*\d{3}-\d{4})/i);

  // Building type — terminator varies by PDF: either "Building Dimension" follows, or it's at end of text
  const buildingType = extractField(cleanText, /Building Type:\s+([A-Za-z& ]+?)(?=\s+Building Dimension|\s*$)/i);

  // Dimensions — value-before-label so they survive text-order variations across PDFs
  const width = extractField(cleanText, /(\d{1,3})\s+Wind Speed/i);
  const length = extractField(cleanText, /(\d{1,3})\s+Ground Snow/i);
  const eaveHeight = extractField(cleanText, /(\d{1,3})\s+Collateral Load/i);
  // Pitch like 1:12 or 2:12, anchored on the style word that follows
  const roofPitch = extractField(cleanText, /(\d+:\d+)\s+(?:Single Slope|Gable|A-Frame)/i);

  // Loads and specs
  const windSpeed = extractField(cleanText, /(\d{2,3}\s*Mph)/i);
  const groundSnow = extractField(cleanText, /(\d+\s*lb\.?)/i);
  const collateralLoad = extractField(cleanText, /(\d+\s*PSF)/i);
  // Style — anchor on preceding pitch to avoid matching "Gable Extension"
  const style = extractField(cleanText, /\d+:\d+\s+(Single Slope|Gable|A-Frame)/i);
  // Truss type — flexible terminator (asterisk, digit, or end-of-string)
  const trussType = extractField(cleanText, /Truss Type\s+([A-Za-z]+(?:\s+[A-Za-z]+)*?)(?=\s+\*|\s+\d|\s*$)/i);

  // Stamped plans
  const buildingPlans = extractField(cleanText, /Building\s+(YES|NO)/i);
  const foundationPlans = extractField(cleanText, /Foundation\s+(YES|NO)/i);
  const buildingTypeWood = extractField(cleanText, /Building Type\s+(Wood|Steel)/i);

  // Colors — flattened table makes per-position extraction unreliable.
  // Left blank rather than hardcoding "TBD"; UI can prompt for these when needed.
  const roofColor = "";
  const wallsColor = "";
  const wainscotColor = "";
  const doorsColor = "";
  const trimColor = "";
  const soffitColor = "";

  // Package includes — scan the entire text so item order across PDFs doesn't matter
  const packageIncludes: string[] = [];
  if (cleanText.match(/Trusses And Truss Hardware/i)) packageIncludes.push("Trusses And Truss Hardware");
  const psiMatch = cleanText.match(/Pre-Cut Sheeting\s+(\d{2,3}[,\s‚]*000)\s*PSI/i);
  if (psiMatch) {
    packageIncludes.push(`Pre-Cut Sheeting (${psiMatch[1].replace(/[,\s‚]/g, "")} PSI)`);
  }
  if (cleanText.match(/Self-Drilling Sheeting Screws/i)) packageIncludes.push("Self-Drilling Sheeting Screws With Neoprene Washers");
  if (cleanText.match(/Elevation & Pier Placement Plans/i)) packageIncludes.push("Elevation & Pier Placement Plans");
  if (cleanText.match(/Hybrid Wood Cut List/i)) packageIncludes.push("Hybrid Wood Cut List Edge Mounted On 2' Centers");
  if (cleanText.match(/Steel Purlins\/Girts/i)) packageIncludes.push("Steel Purlins/Girts Edge Mounted On 2' Centers");
  const windowsMatch = cleanText.match(/\((\d+)\)\s*Complimentary Window Frame & Trim Kits/i);
  if (windowsMatch) packageIncludes.push(`(${windowsMatch[1]}) Complimentary Window Frame & Trim Kits`);

  // Included options — scan the entire text for known option names
  const includedOptions: string[] = [];
  if (cleanText.match(/Eave Extension LSW/i)) includedOptions.push("Eave Extension LSW");
  if (cleanText.match(/Eave Extension RSW/i)) includedOptions.push("Eave Extension RSW");
  if (cleanText.match(/No Sheeting on RSW/i)) includedOptions.push("No Sheeting on RSW");
  if (cleanText.match(/Gable Extension FEW/i)) includedOptions.push("Gable Extension FEW");
  if (cleanText.match(/Gable Extension REW/i)) includedOptions.push("Gable Extension REW");
  if (cleanText.match(/Framed Opening for Double Walkdoor/i)) includedOptions.push("Framed Opening for Double Walkdoor - Wood Pkg");
  if (cleanText.match(/Framed Opening for Walkdoor(?! - Wood)/i)) includedOptions.push("Framed Opening for Walkdoor");
  if (cleanText.match(/Framed Opening for Overhead Sectional Door/i)) includedOptions.push("Framed Opening for Overhead Sectional Door");
  if (cleanText.match(/Framed Opening for Windows/i)) includedOptions.push("Framed Opening for Windows");
  if (cleanText.match(/Portal Frame LF/i)) includedOptions.push("Portal Frame LF");
  if (cleanText.match(/Thermal Break Walls/i)) includedOptions.push("Thermal Break Walls");
  if (cleanText.match(/Thermal Break Roof/i)) includedOptions.push("Thermal Break Roof");
  if (cleanText.match(/Mezzanine \(Post Supported\)/i)) includedOptions.push("Mezzanine (Post Supported)");

  // Extract must ship by date
  const mustShipBy = extractField(cleanText, /Must ship by (\d{1,2}\/\d{1,2}\/\d{2,4})/i);

  // Extract FAQs from the PDF
  const faqs: string[] = [];
  const faqSection = extractField(cleanText, /Frequently Asked Questions(.*?)(?:Contact|$)/is);
  if (faqSection) {
    // Extract common FAQ topics
    const faqTopics = [
      "How long does it take to receive my building",
      "What is included in my building package",
      "Do I need a concrete foundation",
      "Can I customize my building",
      "What colors are available",
      "Do you offer installation",
      "What is the warranty",
      "Can I add windows and doors later"
    ];

    faqTopics.forEach(topic => {
      if (faqSection.toLowerCase().includes(topic.toLowerCase())) {
        faqs.push(topic);
      }
    });
  }

  // Warranty
  const steelTrussWarranty = extractField(cleanText, /Steel Truss\s+(\d+\s*Years?)/i);
  const steelSheetingWarranty = extractField(cleanText, /Steel Sheeting\s+(Lifetime|\d+\s*Years?)/i);

  // Pricing — value sequence in the flattened text is reliably:
  //   [0] Building Price, [1] Dealer Discount, [2] Sale Price, [3] Sales Tax,
  //   [4] Total, then DATE (pricing good thru), [5] Initial Payment Due
  const prices = cleanText.match(/\$[\d,]+\.?\d*/g) || [];
  const buildingPrice = prices.length > 0 ? parseFloat(prices[0].replace(/[$,]/g, "")) : 0;
  const dealerDiscount = prices.length > 1 ? parseFloat(prices[1].replace(/[$,]/g, "")) : 0;
  const salesTax = prices.length > 3 ? parseFloat(prices[3].replace(/[$,]/g, "")) : 0;
  const initialPaymentDue = prices.length > 5 ? parseFloat(prices[5].replace(/[$,]/g, "")) : 0;

  // Pricing Good Thru — date that sits between the 5th price (Total) and 6th (Initial Payment).
  // More reliable than the old "any date not followed by 'Date'" heuristic.
  const pricingGoodThru = extractField(cleanText, /\$[\d,]+\.?\d*\s+(\d{1,2}\/\d{1,2}\/\d{4})\s+\$[\d,]+\.?\d*/);

  return {
    quoteNumber,
    date,
    buildingType,
    customerName,
    street,
    city,
    state,
    zip,
    phone,
    width,
    length,
    eaveHeight,
    roofPitch,
    windSpeed,
    groundSnow,
    collateralLoad,
    style,
    trussType,
    buildingPlans,
    foundationPlans,
    buildingTypeWood,
    roofColor,
    wallsColor,
    wainscotColor,
    doorsColor,
    trimColor,
    soffitColor,
    packageIncludes,
    includedOptions,
    mustShipBy,
    faqs,
    steelTrussWarranty,
    steelSheetingWarranty,
    buildingPrice,
    dealerDiscount,
    salesTax,
    pricingGoodThru,
    initialPaymentDue,
  };
}

async function extractImagesFromPDF(buffer: ArrayBuffer): Promise<string[]> {
  const images: string[] = [];

  try {
    console.log("Starting image extraction...");
    // @ts-ignore
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    // Set worker path - use the one we copied to .next folder
    const path = require("path");
    const workerPath = path.join(
      process.cwd(),
      ".next/dev/server/chunks/pdf.worker.mjs"
    );
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;
    console.log("PDF.js loaded, worker path set");

    console.log("Loading PDF document for image extraction...");
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdfDoc = await loadingTask.promise;
    console.log("PDF loaded, pages:", pdfDoc.numPages);

    // Process pages 13-14 (Building Component Design pages with renders)
    const startPage = 13;
    const endPage = 14;
    console.log(`Processing pages ${startPage}-${endPage} for building renders...`);

    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      console.log(`Processing page ${pageNum}...`);
      const page = await pdfDoc.getPage(pageNum);
      const operatorList = await page.getOperatorList();
      console.log(`Page ${pageNum} has ${operatorList.fnArray.length} operators`);

      // Look for image operators
      const imagePromises = [];
      for (let i = 0; i < operatorList.fnArray.length; i++) {
        const fn = operatorList.fnArray[i];
        // OPS.paintImageXObject = 85
        if (fn === 85) {
          console.log(`Found image operator on page ${pageNum}`);
          const imageName = operatorList.argsArray[i][0];
          imagePromises.push(
            (async () => {
              try {
                const image = await page.objs.get(imageName);

                if (image && image.data) {
                  // Only extract larger images (building renders), skip small logos/icons
                  const minWidth = 600;
                  const minHeight = 400;

                  if (image.width < minWidth || image.height < minHeight) {
                    console.log(`Skipping small image: ${image.width}x${image.height}`);
                    return null;
                  }

                  // Detect the number of channels based on data length
                  const pixelCount = image.width * image.height;
                  const channels = Math.floor(image.data.length / pixelCount);

                  console.log(`Extracting image: ${image.width}x${image.height}, data: ${image.data.length} bytes, channels: ${channels}`);

                  // Use sharp to convert raw image data to PNG
                  const sharp = (await import("sharp")).default;

                  const pngBuffer = await sharp(Buffer.from(image.data), {
                    raw: {
                      width: image.width,
                      height: image.height,
                      channels: channels
                    }
                  }).png().toBuffer();

                  const base64 = `data:image/png;base64,${pngBuffer.toString('base64')}`;
                  console.log("Successfully converted image to base64");
                  return base64;
                }
              } catch (err) {
                console.error("Error extracting image:", err);
                return null;
              }
            })()
          );
        }
      }

      const pageImages = await Promise.all(imagePromises);
      images.push(...pageImages.filter((img): img is string => img !== null));
      console.log(`Page ${pageNum} extracted ${pageImages.filter(img => img !== null).length} images`);
    }
    console.log(`Total images extracted: ${images.length}`);
  } catch (error) {
    console.error("Error extracting images from PDF:", error);
  }

  return images;
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== PDF Parse Start ===");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("File received:", file.name, file.size, "bytes");

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("Buffer created, size:", buffer.length);

    // Extract text using pdf-parse
    console.log("Starting text extraction...");
    const pdfData = await parsePdf(buffer);
    console.log("Text extracted, type:", typeof pdfData.text, "pages:", pdfData.numpages);
    const text = typeof pdfData.text === 'string' ? pdfData.text : String(pdfData.text);

    // Parse the text to extract quote fields
    console.log("Parsing quote text...");
    console.log("Full extracted text:", text);
    const parsedData = parseQuoteText(text);
    console.log("Quote parsed:", parsedData.quoteNumber);
    console.log("Parsed data summary:", {
      quoteNumber: parsedData.quoteNumber,
      customerName: parsedData.customerName,
      buildingPrice: parsedData.buildingPrice,
      street: parsedData.street
    });

    // Extract images
    console.log("Starting image extraction...");
    const images = await extractImagesFromPDF(arrayBuffer);
    console.log("Images extracted:", images.length);

    const result: ParsedQuote = {
      ...parsedData,
      images,
    };

    console.log("=== PDF Parse Complete ===");
    return NextResponse.json(result);
  } catch (error) {
    console.error("!!! Error parsing PDF:", error);
    console.error("Error type:", typeof error);
    console.error("Error name:", error instanceof Error ? error.name : "Unknown");
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");

    // Return detailed error for debugging
    return NextResponse.json(
      {
        error: "Failed to parse PDF",
        details: error instanceof Error ? error.message : String(error),
        type: error instanceof Error ? error.name : typeof error,
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
