import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// AAIRE Co. brand colors
const colors = {
  navy: "#0d1b2a",
  gold: "#C9A96E",
  cream: "#f7f5f0",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: colors.navy,
    padding: 20,
    marginBottom: 20,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: colors.gold,
    fontSize: 14,
    marginTop: 5,
  },
  quoteInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: `2 solid ${colors.gold}`,
  },
  quoteLabel: {
    fontSize: 10,
    color: colors.navy,
    opacity: 0.6,
    marginBottom: 3,
  },
  quoteValue: {
    fontSize: 12,
    color: colors.navy,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    color: colors.gold,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    color: colors.navy,
    opacity: 0.7,
  },
  value: {
    fontSize: 10,
    color: colors.navy,
    fontWeight: "bold",
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: colors.gold,
  },
  bulletText: {
    fontSize: 9,
    color: colors.navy,
    flex: 1,
  },
  highlightBox: {
    backgroundColor: `${colors.gold}15`,
    padding: 12,
    borderRadius: 4,
    marginVertical: 10,
  },
  pricing: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: `2 solid ${colors.gold}`,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTop: `1 solid ${colors.navy}`,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.navy,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.gold,
  },
  renderImage: {
    width: "45%",
    height: "auto",
    marginBottom: 10,
  },
  renderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 15,
  },
});

type QuoteData = {
  quoteNumber: string;
  date: string;
  buildingType: string;
  customerName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  consultant: { name: string; phone: string; email: string };
  width: string;
  length: string;
  eaveHeight: string;
  roofPitch: string;
  windSpeed: string;
  groundSnow: string;
  collateralLoad: string;
  style: string;
  trussType: string;
  roofColor: string;
  wallsColor: string;
  wainscotColor: string;
  doorsColor: string;
  trimColor: string;
  soffitColor: string;
  packageIncludes: string[];
  includedOptions: string[];
  mustShipBy: string;
  steelTrussWarranty: string;
  steelSheetingWarranty: string;
  buildingPrice: number;
  additionalDiscount: number;
  salesTax: number;
  images: string[];
};

export const QuotePDF = ({ quote }: { quote: QuoteData }) => {
  const discount = quote.buildingPrice * (quote.additionalDiscount / 100);
  const finalPrice = quote.buildingPrice - discount + quote.salesTax;
  const deposit = Math.round(finalPrice * 0.25 * 100) / 100; // Round to 2 decimal places

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={styles.headerText}>AAIRE Co.</Text>
              <Text style={styles.subHeaderText}>Metal Buildings</Text>
            </View>
            <Image
              src="/images/logos/aaire-logo-white.jpg"
              style={{ width: 60, height: 60 }}
            />
          </View>
        </View>

        {/* Quote Info */}
        <View style={styles.quoteInfo}>
          <View>
            <Text style={styles.quoteLabel}>QUOTE #</Text>
            <Text style={styles.quoteValue}>{quote.quoteNumber}</Text>
          </View>
          <View>
            <Text style={styles.quoteLabel}>DATE</Text>
            <Text style={styles.quoteValue}>{quote.date}</Text>
          </View>
        </View>

        {/* Customer & Consultant */}
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Customer</Text>
            <Text style={[styles.value, { marginBottom: 3 }]}>{quote.customerName}</Text>
            <Text style={styles.label}>{quote.street}</Text>
            <Text style={styles.label}>
              {quote.city}, {quote.state} {quote.zip}
            </Text>
            <Text style={styles.label}>{quote.phone}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Building Consultant</Text>
            <Text style={[styles.value, { marginBottom: 3 }]}>{quote.consultant.name}</Text>
            <Text style={styles.label}>{quote.consultant.phone}</Text>
            <Text style={styles.label}>{quote.consultant.email}</Text>
          </View>
        </View>

        {/* Building Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Building Specifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{quote.buildingType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dimensions:</Text>
            <Text style={styles.value}>
              {quote.width}' W x {quote.length}' L x {quote.eaveHeight}' H
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Roof Pitch:</Text>
            <Text style={styles.value}>{quote.roofPitch}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wind Speed:</Text>
            <Text style={styles.value}>{quote.windSpeed}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Snow Load:</Text>
            <Text style={styles.value}>{quote.groundSnow}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Truss Type:</Text>
            <Text style={styles.value}>{quote.trussType}</Text>
          </View>
        </View>

        {/* Steel Sheeting Colors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Steel Sheeting Colors</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Roof:</Text>
            <Text style={styles.value}>{quote.roofColor}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Walls:</Text>
            <Text style={styles.value}>{quote.wallsColor}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Trim:</Text>
            <Text style={styles.value}>{quote.trimColor}</Text>
          </View>
        </View>

        {/* Package Includes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Includes</Text>
          <View style={styles.bulletList}>
            {quote.packageIncludes.map((item, i) => (
              <View key={i} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Included Options */}
        {quote.includedOptions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Included Options</Text>
            <View style={styles.bulletList}>
              {quote.includedOptions.map((item, i) => (
                <View key={i} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
            {quote.mustShipBy && (
              <Text style={[styles.label, { marginTop: 5 }]}>Must ship by: {quote.mustShipBy}</Text>
            )}
          </View>
        )}

        {/* What's Included with AAIRE Co. */}
        <View style={styles.highlightBox}>
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>What's Included with AAIRE Co.</Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>✓</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: "bold" }}>Local Code Compliance Review</Text> — We verify your design
                meets NC building codes before ordering
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>✓</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: "bold" }}>Permitting Assistance</Text> — Available for additional fees
                to help navigate county requirements
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>✓</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: "bold" }}>Shipping Included</Text> — Delivery to your site is included
                in the price
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>✗</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: "bold" }}>Unloading Not Included</Text> — Customer is responsible for
                unloading materials at delivery site
              </Text>
            </View>
          </View>
        </View>

        {/* Warranty */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Warranty</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Steel Truss</Text>
            <Text style={styles.value}>{quote.steelTrussWarranty} (Manufacturer's Warranty)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Steel Sheeting</Text>
            <Text style={styles.value}>{quote.steelSheetingWarranty} (Manufacturer's Warranty)</Text>
          </View>
        </View>

        {/* Worldwide Steel Dealer Badge */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15, paddingTop: 15, borderTop: `1 solid ${colors.navy}` }}>
          <Image
            src="/images/logos/worldwide-logo.png"
            style={{ width: 80, height: 40, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontSize: 10, color: colors.navy, fontWeight: "bold" }}>
              Official Worldwide Steel Buildings Dealer
            </Text>
            <Text style={{ fontSize: 8, color: colors.navy, opacity: 0.7, marginTop: 2 }}>
              Authorized distributor of premium metal building systems
            </Text>
          </View>
        </View>

        {/* Building Renders Preview */}
        {quote.images.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Building Renders</Text>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
              {quote.images.slice(0, 2).map((img, i) => (
                <View key={i} style={{ width: "48%", border: `1 solid ${colors.navy}`, padding: 5 }}>
                  <Image
                    src={img}
                    style={{ width: "100%", height: "auto" }}
                  />
                </View>
              ))}
            </View>
            <Text style={{ fontSize: 8, color: colors.navy, opacity: 0.6, textAlign: "center" }}>
              See page 2 for additional renders
            </Text>
          </View>
        )}

        {/* Investment */}
        <View style={styles.pricing}>
          <Text style={styles.sectionTitle}>Investment</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.label}>Building Price</Text>
            <Text style={styles.value}>${quote.buildingPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</Text>
          </View>
          {quote.additionalDiscount > 0 && (
            <View style={styles.pricingRow}>
              <Text style={[styles.label, { color: colors.gold }]}>Discount ({quote.additionalDiscount}%)</Text>
              <Text style={[styles.value, { color: colors.gold }]}>
                -${discount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
            </View>
          )}
          <View style={styles.pricingRow}>
            <Text style={styles.label}>Sales Tax</Text>
            <Text style={styles.value}>${quote.salesTax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Investment</Text>
            <Text style={styles.totalValue}>${finalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={[styles.pricingRow, { marginTop: 10 }]}>
            <Text style={styles.label}>Initial Payment Due (25%)</Text>
            <Text style={styles.value}>${deposit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>
      </Page>

      {/* Second page with renders */}
      {quote.images.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Building Component Design</Text>
          </View>
          <View style={styles.renderContainer}>
            {quote.images.slice(0, 4).map((img, i) => {
              try {
                // Ensure proper data URL format
                const imgSrc = img.startsWith('data:') ? img : `data:image/png;base64,${img}`;
                return <Image key={i} src={imgSrc} style={styles.renderImage} />;
              } catch (error) {
                console.error(`Failed to render image ${i}:`, error);
                return (
                  <View key={i} style={styles.renderImage}>
                    <Text style={{ fontSize: 10, textAlign: 'center' }}>Image {i + 1} unavailable</Text>
                  </View>
                );
              }
            })}
          </View>
          {quote.images.length === 0 && (
            <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 20, color: colors.navy }}>
              No building renders available
            </Text>
          )}
        </Page>
      )}
    </Document>
  );
};
