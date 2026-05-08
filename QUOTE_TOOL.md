# AAIRE Co. Quote Conversion Tool

## Purpose
Internal tool to convert Worldwide Steel quotes into AAIRE Co. branded quotes.

## Access
- URL: `/admin/quote-builder`
- Password: `1234`
- Not linked publicly — admin only

## Workflow
1. Upload Worldwide Steel quote (PDF)
2. Auto-extract data into editable fields
3. Adjust fields as needed (consultant, pricing, discounts, etc.)
4. Preview AAIRE Co. branded quote
5. Download as PDF

## Key Transformations

### Contact Information
- **Remove:** Nick Cursten contact info
- **Replace with dropdown:**
  - Alex Esposito
  - Chris Page

### Pricing Logic
- **Display to customer:** Pre-discount "Building Price" (e.g., $12,263.81)
- **Do NOT show:** Dealer discount line
- **Optional:** Add 5% discount via dropdown
- **Calculate:** Final total = Building Price - (optional 5% discount) + Sales Tax

### AAIRE Co. Differentiators (Added to Quote)
✅ **Local Code Compliance Review** — Verify design meets NC building codes before ordering
✅ **Permitting Assistance** — Available for additional fees

## Data Fields to Extract

### Customer Info
- Name
- Street
- City, State, Zip
- Phone

### Building Specs
- Quote #
- Date
- Building Type
- Width, Length, Eave Height, Roof Pitch
- Wind Speed, Ground Snow, Collateral Load
- Style, Truss Type
- Stamped Plans (Building, Foundation, Building Type)

### Colors
- Roof, Walls, Wainscot, Doors, Trim, Soffit

### Package Includes
- List of included items (trusses, sheeting, screws, plans, etc.)

### Included Options
- Table: Item, Qty, PSQD, Size

### Warranty
- Steel Truss: 50 Years
- Steel Sheeting: Lifetime

### Pricing
- Building Price
- Sales Tax
- Final Delivered Building Price
- Pricing Good Thru
- Initial Payment Due

## Branding
- **Colors:** Navy #0d1b2a, Gold #C9A96E, Cream #f7f5f0
- **Header:** AAIRE Co. Metal Buildings logo
- **Fonts:** Playfair Display (serif), Inter (sans-serif)

## Tech Stack
- PDF parsing: `pdf-parse` or `pdf.js`
- Quote rendering: React components
- PDF export: `react-pdf/renderer` or `@react-pdf/renderer`

## Current Status

### ✅ Completed
- Password-protected page at `/admin/quote-builder`
- Two-panel editor interface (left: editable fields, right: live preview)
- Consultant dropdown (Alex Esposito / Chris Page) with contact info
- Optional 5% discount
- Pre-discount pricing display
- AAIRE Co. differentiators added to quote
- All quote fields editable
- Live preview with AAIRE Co. branding (navy/gold/cream)
- Responsive design
- **PDF parsing:** Extracts text data from Worldwide Steel quotes
- **Image extraction:** Pulls building renders from PDFs
- **Automatic data population:** Quote fields auto-fill from uploaded PDF
- **Render display:** Shows extracted building images in quote preview

### Installed Libraries
- ✅ `pdf-parse` v2.4.5 — text extraction
- ✅ `pdfjs-dist` — image extraction from PDFs
- ✅ `canvas` — image processing (server-side)
- ✅ `@react-pdf/renderer` v4.5.1 — PDF generation (ready for export feature)

### 🚧 TODO - PDF Export
Currently shows alert. To enable PDF download:

1. **Create PDF document component** using `@react-pdf/renderer` matching the preview layout
2. **Include extracted renders** in the exported PDF
3. **Wire up download button** to generate and trigger PDF download

### Known Limitations
- Image extraction may not work for all PDF formats (depends on how Worldwide generates their PDFs)
- Text parsing uses regex patterns — may need adjustment if Worldwide changes their quote format
- Currently limited to first 4 images in preview (all images stored, just preview limited)
