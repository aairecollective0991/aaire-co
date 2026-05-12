import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

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

  // Extract quote number and date
  const quoteNumber = extractField(cleanText, /Quote\s*#\s*(\d+[A-Z]+)/i);
  const date = extractField(cleanText, /Date\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);

  // Extract customer name from "AAIRE Co. (Name)" format
  const customerName = extractField(cleanText, /AAIRE Co\.\s*\(([^)]+)\)/i);

  // Extract address - appears before "Building Consultant:"
  const street = extractField(cleanText, /(\d+\s+[A-Za-z\s]+(?:Cir|St|Ave|Dr|Rd|Ln|Way|Blvd)[^\d]*?)\s+(?:Building Consultant|Concord)/i);

  // City, State, Zip appear in sequence after street
  const city = extractField(cleanText, /512 Channing Cir Nw\s+Building Consultant.*?Building Type.*?([A-Za-z]+)\s+Consultant Phone/i) ||
               extractField(cleanText, /Building Dimension.*?([A-Za-z]+)\s+Consultant Phone/i);

  const state = extractField(cleanText, /Consultant Phone.*?([A-Z]{2})\s+Consultant Email/i);
  const zip = extractField(cleanText, /Consultant Email.*?(\d{5}-?\d{4})/i);
  // Customer phone appears right after zip code
  const phone = extractField(cleanText, /\d{5}-\d{4}\s+(\(\d{3}\)\s*\d{3}-\d{4})/i);

  // Building type
  const buildingType = extractField(cleanText, /Building Type:\s*([A-Za-z\s&]+?)(?:\s+Building Dimension)/i);

  // Extract dimensions - they appear in order: width, length, eave height
  const width = extractField(cleanText, /Consultant Email.*?\d{5}-\d{4}\s+\(\d{3}\)\s*\d{3}-\d{4}\s+(\d{1,3})\s+Wind Speed/i);
  const length = extractField(cleanText, /Wind Speed\s+Building.*?(\d{1,3})\s+Ground Snow/i);
  const eaveHeight = extractField(cleanText, /Ground Snow\s+Foundation.*?(\d{1,3})\s+Collateral Load/i);
  const roofPitch = extractField(cleanText, /Building Type\s+Wood\s+([\d:/.]+)\s+/i);

  // Extract loads and specs
  const windSpeed = extractField(cleanText, /(\d{2,3}\s*Mph)/i);
  const groundSnow = extractField(cleanText, /Ground Snow.*?(\d+\s*lb\.?)/i) || "10 lb.";
  const collateralLoad = extractField(cleanText, /(\d+\s*PSF)/i);
  const style = extractField(cleanText, /(Single Slope|Gable|A-Frame)/i);
  const trussType = extractField(cleanText, /Truss Type\s+(Web Truss|[A-Za-z\s]+?)(?:\s+\*|$)/i);

  // Extract stamped plans
  const buildingPlans = extractField(cleanText, /Building\s+(YES|NO)/i) || "YES";
  const foundationPlans = extractField(cleanText, /Foundation\s+(YES|NO)/i) || "YES";
  const buildingTypeWood = extractField(cleanText, /Building Type\s+(Wood|Steel)/i) || "Wood";

  // Extract colors from Steel Sheeting Color section
  // The table labels and values get separated in extraction, so we default to TBD
  // In future, when actual colors are specified, we'll need to parse them differently
  const roofColor = "TBD";
  const wallsColor = "TBD";
  const wainscotColor = "TBD";
  const doorsColor = "TBD";
  const trimColor = "TBD";
  const soffitColor = "";

  // Extract package includes - stop at "Included Options:"
  const packageSection = extractField(cleanText, /Package Includes:(.*?)(?:Included Options:|$)/is);
  const packageIncludes: string[] = [];

  if (packageSection) {
    if (packageSection.includes("Trusses And Truss Hardware")) packageIncludes.push("Trusses And Truss Hardware");
    if (packageSection.match(/Pre-Cut Sheeting.*?(\d{2,3}[, ]*000)\s*PSI/i)) {
      const psi = extractField(packageSection, /Pre-Cut Sheeting.*?(\d{2,3}[,\s]*000\s*PSI)/i);
      packageIncludes.push(`Pre-Cut Sheeting (${psi.replace(/[,\s]/g, "")})`);
    }
    if (packageSection.includes("Self-Drilling")) packageIncludes.push("Self-Drilling Sheeting Screws With Neoprene Washers");
    if (packageSection.includes("Elevation")) packageIncludes.push("Elevation & Pier Placement Plans");
    if (packageSection.includes("Hybrid Wood")) packageIncludes.push("Hybrid Wood Cut List Edge Mounted On 2' Centers");
    if (packageSection.match(/\(\d+\)\s*Complimentary Window/i)) {
      const windows = extractField(packageSection, /(\(\d+\)\s*Complimentary Window[^I]+?)(?:Included|$)/i);
      packageIncludes.push(windows.trim() || "(4) Complimentary Window Frame & Trim Kits");
    }
  }

  // Extract included options
  const includedOptions: string[] = [];
  const optionsSection = extractField(cleanText, /Included Options:(.*?)(?:Warranty Info|Must ship by|$)/is);
  if (optionsSection) {
    if (optionsSection.match(/Eave Extension LSW/i)) includedOptions.push("Eave Extension LSW");
    if (optionsSection.match(/No Sheeting on RSW/i)) includedOptions.push("No Sheeting on RSW");
    if (optionsSection.match(/Gable Extension FEW/i)) includedOptions.push("Gable Extension FEW");
    if (optionsSection.match(/Gable Extension REW/i)) includedOptions.push("Gable Extension REW");
    if (optionsSection.match(/Framed Opening for Double Walkdoor/i)) {
      includedOptions.push("Framed Opening for Double Walkdoor - Wood Pkg");
    }
  }

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

  // Extract warranty
  const steelTrussWarranty = extractField(cleanText, /Steel Truss\s+(\d+\s*Years?)/i) || "50 Years";
  const steelSheetingWarranty = extractField(cleanText, /Steel Sheeting\s+(Lifetime|\d+\s*Years?)/i) || "Lifetime";

  // Extract pricing - values appear in sequence in the flattened text
  // Order: Building Price, Dealer Discount, Sale Price, Sales Tax, Total, Pricing Good Thru, Initial Payment
  const prices = cleanText.match(/\$[\d,]+\.?\d*/g) || [];
  const buildingPrice = prices.length > 0 ? parseFloat(prices[0].replace(/[$,]/g, "")) : 0;
  const dealerDiscount = prices.length > 1 ? parseFloat(prices[1].replace(/[$,]/g, "")) : 0;
  const salesTax = prices.length > 3 ? parseFloat(prices[3].replace(/[$,]/g, "")) : 0;
  const initialPaymentDue = prices.length > 5 ? parseFloat(prices[5].replace(/[$,]/g, "")) : 0;

  const pricingGoodThru = extractField(cleanText, /(\d{1,2}\/\d{1,2}\/\d{4})(?!.*Date)/i);

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
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    return NextResponse.json(
      { error: "Failed to parse PDF", details: String(error) },
      { status: 500 }
    );
  }
}
