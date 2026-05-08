import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  coverPage: {
    padding: 60,
    backgroundColor: '#0d1b2a',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#C9A96E',
    lineHeight: 1.2,
  },
  coverSubtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#ffffff',
  },
  coverBranding: {
    fontSize: 14,
    color: '#C9A96E',
    marginTop: 60,
  },
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d1b2a',
    marginBottom: 20,
    marginTop: 30,
  },
  heading2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d1b2a',
    marginBottom: 15,
    marginTop: 25,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d1b2a',
    marginBottom: 12,
    marginTop: 15,
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333333',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333333',
    marginBottom: 6,
    marginLeft: 20,
  },
  image: {
    width: '48%',
    height: 'auto',
    marginBottom: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  highlight: {
    backgroundColor: '#C9A96E',
    color: '#0d1b2a',
    padding: 8,
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#666666',
    textAlign: 'center',
  },
});

// PDF Document Component
export const BuyersGuidePDF = () => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.coverTitle}>The Complete Metal{'\n'}Building Buyer's Guide</Text>
      <Text style={styles.coverSubtitle}>Your Essential Resource for Planning, Purchasing & Building</Text>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 14, color: '#ffffff', textAlign: 'center', marginBottom: 8 }}>
          Pre-Purchase Checklist
        </Text>
        <Text style={{ fontSize: 14, color: '#ffffff', textAlign: 'center', marginBottom: 8 }}>
          Site Preparation Guide
        </Text>
        <Text style={{ fontSize: 14, color: '#ffffff', textAlign: 'center', marginBottom: 8 }}>
          DIY Assembly Best Practices
        </Text>
        <Text style={{ fontSize: 14, color: '#ffffff', textAlign: 'center' }}>
          Common Mistakes to Avoid
        </Text>
      </View>
      <Text style={styles.coverBranding}>AAIRE Co. | Certified Worldwide Steel Buildings Distributor</Text>
    </Page>

    {/* Content Page 1 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading1}>The Complete Metal Building Buyer's Guide</Text>

      <Text style={styles.paragraph}>
        This comprehensive guide covers everything you need to know before purchasing and building
        your metal structure. Based on industry best practices and real-world experience from
        Worldwide Steel Buildings projects nationwide.
      </Text>

      <Text style={styles.heading2}>Part 1: Pre-Purchase Checklist</Text>

      <Text style={styles.heading3}>Define Your Needs</Text>
      <Text style={styles.bulletPoint}>Building purpose (garage, workshop, storage, barndominium, agricultural, commercial)</Text>
      <Text style={styles.bulletPoint}>Current space requirements (width × length × height)</Text>
      <Text style={styles.bulletPoint}>Future expansion plans</Text>
      <Text style={styles.bulletPoint}>Roof style: Vertical (best for snow/rain), A-frame horizontal, or single-slope</Text>
      <Text style={styles.bulletPoint}>Door requirements and window needs</Text>

      <View style={styles.imageRow}>
        <Image src="/images/gallery/arena.jpg" style={styles.image} />
        <Image src="/images/gallery/agriculture-barn-1.jpg" style={styles.image} />
      </View>

      <View style={styles.highlight}>
        <Text>Pro Tip: If you need 20' wide, go 22'. Extra space prevents door-dings and allows for structural uprights.</Text>
      </View>

      <Text style={styles.heading3}>Understand Local Requirements</Text>
      <Text style={styles.paragraph}>
        In 95% of U.S. counties, structures over 120-200 sq ft require permits. Requirements typically include:
      </Text>
      <Text style={styles.bulletPoint}>Site plan showing setbacks, structures, and utilities</Text>
      <Text style={styles.bulletPoint}>Engineered drawings with wind and snow load calculations</Text>
      <Text style={styles.bulletPoint}>Proof of property ownership or authorization</Text>
      <Text style={styles.bulletPoint}>Zoning compliance verification</Text>
      <Text style={styles.bulletPoint}>HOA approval (if applicable)</Text>

      <Text style={styles.footer}>AAIRE Co. | aaireco.com | Page 1</Text>
    </Page>

    {/* Content Page 2 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading2}>Budget Realistically</Text>

      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Building Package (40-50% of total):{'\n'}</Text>
        Pre-engineered metal building: $14-22 per sq ft{'\n'}
        Customizations: +15-30%{'\n\n'}

        <Text style={{ fontWeight: 'bold' }}>Foundation (20-25% of total):{'\n'}</Text>
        Concrete slab: $4-8 per sq ft{'\n'}
        Gravel pad: $1-3 per sq ft{'\n\n'}

        <Text style={{ fontWeight: 'bold' }}>Labor & Installation (15-25%):{'\n'}</Text>
        DIY: $0 (your time + equipment){'\n'}
        Professional erection: $3-6 per sq ft{'\n'}
        Crane rental: $500-2,000/day
      </Text>

      <Text style={styles.heading2}>Material Selection</Text>

      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>12-gauge steel:</Text> 30% thicker, recommended for buildings over 30' wide,
        high wind zones, and heavy snow load regions.{'\n\n'}

        <Text style={{ fontWeight: 'bold' }}>14-gauge steel:</Text> Industry standard for smaller buildings under 30' wide
        and moderate weather conditions.{'\n\n'}

        <Text style={{ fontWeight: 'bold' }}>Vertical Roof (Recommended):</Text> Panels run from peak to eaves for proper
        water flow. Essential for buildings over 36' long to prevent roof ponding.
      </Text>

      <Text style={styles.heading2}>Part 2: Site Preparation</Text>

      <View style={styles.highlight}>
        <Text>CRITICAL: Site prep BEFORE building delivery is non-negotiable</Text>
      </View>

      <Text style={styles.heading3}>Site Selection & Access</Text>
      <Text style={styles.bulletPoint}>• Minimum 40-ft trailer approach for delivery</Text>
      <Text style={styles.bulletPoint}>• Crane access if needed</Text>
      <Text style={styles.bulletPoint}>• Flat area with adequate drainage</Text>
      <Text style={styles.bulletPoint}>• Mark utilities (call 811 before digging)</Text>
      <Text style={styles.bulletPoint}>• Comply with setback requirements</Text>

      <Text style={styles.footer}>AAIRE Co. | aaireco.com | Page 2</Text>
    </Page>

    {/* Content Page 3 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading2}>Foundation Requirements</Text>

      <Text style={styles.heading3}>Concrete Slab (Most Common & Recommended)</Text>
      <Text style={styles.bulletPoint}>• Thickness: 4-6 inches (6" for heavy equipment)</Text>
      <Text style={styles.bulletPoint}>• Reinforcement: #4 rebar spaced 12-16" on center</Text>
      <Text style={styles.bulletPoint}>• Minimum strength: 3,000 PSI</Text>
      <Text style={styles.bulletPoint}>• Excavation: 6-8 inches below grade</Text>
      <Text style={styles.bulletPoint}>• Vapor barrier: 6-mil polyethylene under slab</Text>
      <Text style={styles.bulletPoint}>• Gravel base: 4-6 inches compacted crushed stone</Text>

      <View style={styles.highlight}>
        <Text>Curing Time: Minimum 7 days before assembly | 28 days for full cure (ideal)</Text>
      </View>

      <Text style={styles.heading3}>Critical Specifications</Text>
      <Text style={styles.bulletPoint}>• Levelness: Maximum 1/4" variation across entire foundation</Text>
      <Text style={styles.bulletPoint}>• Anchor bolts: Within 1/8" of specified locations</Text>
      <Text style={styles.bulletPoint}>• Check with 10-ft level or laser level</Text>

      <Text style={styles.heading2}>Part 3: DIY Assembly Best Practices</Text>

      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Can You DIY?{'\n'}</Text>
        Under 3,000 sq ft: Feasible with construction experience{'\n'}
        3,000-5,000 sq ft: Requires 3-4 experienced helpers{'\n'}
        Over 5,000 sq ft: Consider professional erection
      </Text>

      <Text style={styles.heading3}>Pre-Assembly Preparation</Text>
      <Text style={styles.bulletPoint}>1. Organize all components by assembly sequence</Text>
      <Text style={styles.bulletPoint}>2. Verify parts against packing list</Text>
      <Text style={styles.bulletPoint}>3. Keep fasteners organized by type</Text>
      <Text style={styles.bulletPoint}>4. Clean all metal (remove protective wax/oil)</Text>

      <Text style={styles.heading3}>Safety Equipment (Required)</Text>
      <Text style={styles.bulletPoint}>• Safety glasses (ANSI Z87.1 rated)</Text>
      <Text style={styles.bulletPoint}>• Cut-resistant work gloves</Text>
      <Text style={styles.bulletPoint}>• Steel-toe boots</Text>
      <Text style={styles.bulletPoint}>• Hard hat for overhead work</Text>

      <Text style={styles.footer}>AAIRE Co. | aaireco.com | Page 3</Text>
    </Page>

    {/* Content Page 4 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading2}>Frame Assembly - The Critical Phase</Text>

      <View style={styles.highlight}>
        <Text>"Measure Twice, Cut Never" - Metal buildings are pre-cut and pre-punched</Text>
      </View>

      <Text style={styles.heading3}>Critical Rule: SQUARE BEFORE TIGHTENING</Text>
      <Text style={styles.bulletPoint}>• Measure diagonal corner-to-corner (both directions)</Text>
      <Text style={styles.bulletPoint}>• Diagonals must match within 1/4"</Text>
      <Text style={styles.bulletPoint}>• Every frame out of square multiplies into major panel problems</Text>
      <Text style={styles.bulletPoint}>• Adjust base plates while bolts are loose</Text>
      <Text style={styles.bulletPoint}>• Only tighten after confirming square</Text>

      <Text style={styles.heading3}>Panel Installation Tips</Text>
      <Text style={styles.bulletPoint}>• Start wall panels at corner</Text>
      <Text style={styles.bulletPoint}>• Overlap panels per instructions (typically 1-2 corrugations)</Text>
      <Text style={styles.bulletPoint}>• Screw pattern: every valley at top/bottom, every other mid-span</Text>
      <Text style={styles.bulletPoint}>• Use self-tapping screws with neoprene washers</Text>
      <Text style={styles.bulletPoint}>• Do not overtighten - compress washer properly</Text>

      <Text style={styles.heading2}>Common Mistakes to Avoid</Text>
      <Text style={styles.bulletPoint}>1. Starting without reading instructions</Text>
      <Text style={styles.bulletPoint}>2. Tightening bolts before checking square</Text>
      <Text style={styles.bulletPoint}>3. Wrong fastener placement (causes leaks)</Text>
      <Text style={styles.bulletPoint}>4. Skipping temporary bracing</Text>
      <Text style={styles.bulletPoint}>5. Working in windy conditions (dangerous)</Text>
      <Text style={styles.bulletPoint}>6. Improper panel overlap (leads to leaks)</Text>
      <Text style={styles.bulletPoint}>7. Not checking levelness repeatedly</Text>

      <Text style={styles.heading2}>Your Next Steps</Text>

      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Get Your Free Quote:{'\n'}</Text>
        Website: aaireco.com{'\n'}
        Email: aairecollective@gmail.com{'\n'}
        Quote Tool: aaireco.com/configure
      </Text>

      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: 'bold' }}>Helpful Resources:{'\n'}</Text>
        Build Site Checker: aaireco.com/site-check{'\n'}
        Hawaii guidance: aaireco.com/hawaii{'\n'}
        Build process: aaireco.com/build-process
      </Text>

      <Text style={styles.footer}>AAIRE Co. | aaireco.com | Page 4</Text>
    </Page>

    {/* Back Cover */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#C9A96E', marginBottom: 30 }}>
        Ready to Build?
      </Text>
      <Text style={{ fontSize: 16, color: '#ffffff', textAlign: 'center', marginBottom: 40, lineHeight: 1.6 }}>
        AAIRE Co. is a certified Worldwide Steel Buildings distributor{'\n'}
        serving all 50 states, including Hawaii.{'\n\n'}
        We're here to help you every step of the way.
      </Text>
      <Text style={{ fontSize: 18, color: '#C9A96E', marginBottom: 10 }}>aaireco.com</Text>
      <Text style={{ fontSize: 14, color: '#ffffff' }}>aairecollective@gmail.com</Text>
      <Text style={{ fontSize: 11, color: '#ffffff', marginTop: 60, opacity: 0.7 }}>
        © 2026 AAIRE Co. Metal Buildings | 50-Year Structural Warranty
      </Text>
    </Page>
  </Document>
);
