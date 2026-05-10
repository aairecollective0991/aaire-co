# AAIRE Co. Facebook Ads - Ready to Launch

## Ad Creatives Completed

### ✅ Video Ad
**File:** `public/video-ad-preview.html`
**Preview:** http://localhost:3000/video-ad-preview.html

**Specifications:**
- **Length:** 20 seconds (optimized for Facebook)
- **Format:** Square 1080x1080
- **Source Video:** donald_ryan_web.mp4 (assembly animation)

**Text Overlay Timing:**
- **0-5s:** "Planning a Metal Building?"
- **5-9s:** "Expert Guidance From Design to Delivery"
- **9-20s:** "Get Your FREE Buyer's Guide" + aaireco.com/download

**Branding:**
- Gold stripe at top (matches business card)
- AAIRE Co. logo bottom left
- "METAL BUILDINGS" tagline
- "Certified Worldwide Steel Buildings Distributor"
- Fonts: Playfair Display (headings) + Inter (body)
- Colors: Navy (#0d1b2a) + Gold (#C9A96E)

**How to Record:**
1. Open preview page
2. Press Win + G (Xbox Game Bar)
3. Click Record
4. Click Play on video
5. Let run for 20 seconds
6. Stop recording
7. Video saves to: `C:\Users\[YourName]\Videos\Captures`

---

### ✅ Static Image Ad
**File:** `public/static-ad-preview.html`
**Preview:** http://localhost:3000/static-ad-preview.html

**Specifications:**
- **Format:** 1080x1080 square
- **Type:** Lead generation ad for PDF guide

**Content:**
- **Eyebrow:** "Free Download"
- **Headline:** "Don't Make These Costly Mistakes"
- **Subheadline:** "Get the Complete Metal Building Buyer's Guide"

**Benefits (Checkmarks):**
✓ Pre-purchase checklist with all critical considerations
✓ Site prep & foundation requirements explained
✓ DIY assembly best practices from experts
✓ Common mistakes that cost thousands

**CTA:**
- Button: "GET FREE GUIDE"
- URL: aaireco.com/download

**Branding:**
- Gold stripe at top
- AAIRE Co. Metal Buildings logo
- "Certified Worldwide Steel Buildings Distributor"
- 50-Year Warranty badge
- "All 50 States"

**How to Screenshot:**
1. Open preview page
2. Click "Prepare for Screenshot" button
3. Press Win + Shift + S
4. Select the square ad area
5. Save as JPG

---

## Campaign Setup

### Video Ad Campaign

**Objective:** Conversions (Leads)
**Placement:** Facebook Feed, Instagram Feed
**Budget:** Start $10-15/day

**Ad Copy:**
```
Planning a metal building project? 🏗️

See how we guide you from design to delivery.

Download our FREE Complete Buyer's Guide:
✅ Site preparation checklist
✅ Foundation requirements
✅ Assembly tips from pros
✅ Mistakes that cost thousands

More than a supplier—your partner in building right.

Get your free guide → [Link]
```

**CTA Button:** "Download"
**Landing Page:** aaireco.com/download

---

### Static Image Ad Campaign

**Objective:** Conversions (Leads)
**Placement:** Facebook Feed, Instagram Feed, Stories
**Budget:** Start $10-15/day

**Ad Copy:**
```
❌ Don't make these costly metal building mistakes!

Our FREE Buyer's Guide shows you:
✓ What to check BEFORE you buy
✓ Site prep that saves thousands
✓ DIY assembly secrets
✓ Common mistakes to avoid

Download now—no strings attached.
Just expert guidance from people who've done this 1,000+ times.

Free guide → [Link]

AAIRE Co. | Certified Worldwide Steel Buildings Distributor
Serving all 50 states including Hawaii
```

**CTA Button:** "Learn More" or "Download"
**Landing Page:** aaireco.com/download

---

## A/B Testing Plan

### Test 1: Video vs Static (Week 1-2)
- Run both ads at $10/day each
- Compare cost per lead
- Winner gets more budget in Week 3

### Test 2: Headlines (Week 3-4)
**Static Ad Variations:**
1. "Don't Make These Costly Mistakes" (current)
2. "Planning a Metal Building? Read This First"
3. "Free Metal Building Buyer's Guide"

**Video Ad Variations:**
- Same video, different ad copy
1. Current version (emotional - mistakes)
2. Practical version (step-by-step guide)
3. Authority version (trusted by 1,000+ customers)

### Test 3: Audiences (Month 2)
1. Broad: Homeowners 35-65, construction interest
2. Specific: Barndominium enthusiasts
3. Geographic: Hawaii-only campaign
4. Lookalike: Based on leads from Month 1

---

## Assets Location

**All files in:** `C:\Users\alexe\aaire-co`

```
public/
├── video-ad-preview.html      (Video ad with overlays)
├── static-ad-preview.html     (Static image ad)
└── videos/
    └── donald_ryan_web.mp4    (Source video)

FACEBOOK-AD-STRATEGY.md        (Full strategy guide)
VIDEO-AD-TOOLS-GUIDE.md        (Recording tools & setup)
FACEBOOK-ADS-READY.md          (This file)
```

---

## Next Steps to Launch

### 1. Export Ad Creatives ⏳

**Video Ad:**
- [ ] Open video-ad-preview.html
- [ ] Screen record 20-second video
- [ ] Save as: `aaire-video-ad-20s.mp4`

**Static Ad:**
- [ ] Open static-ad-preview.html
- [ ] Screenshot the ad
- [ ] Save as: `aaire-static-ad.jpg`

### 2. Set Up Facebook Business Manager ⏳

- [ ] Go to business.facebook.com
- [ ] Create Business Manager account
- [ ] Add AAIRE Co. page
- [ ] Create Ad Account
- [ ] Install Facebook Pixel on website

**Facebook Pixel Code Location:**
Add to: `app/layout.tsx` in `<head>` section

### 3. Install Facebook Pixel ⏳

**In website code:**
```typescript
// Add to app/layout.tsx
<Script id="facebook-pixel">
{`
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
`}
</Script>
```

**Track Conversions:**
Add to download page success:
```typescript
fbq('track', 'Lead');
```

### 4. Create First Campaign ⏳

**Campaign 1: PDF Guide - Video**
- Objective: Conversions → Leads
- Budget: $10/day
- Duration: 7 days
- Creative: Video ad
- Landing Page: aaireco.com/download
- Target: Homeowners 35-65, construction interest

**Campaign 2: PDF Guide - Static**
- Same settings as above
- Creative: Static image ad
- Run simultaneously for comparison

### 5. Monitor & Optimize (Daily) ⏳

**Key Metrics:**
- Cost Per Lead: Target $15-40
- Click-Through Rate: Target 1-3%
- Landing Page Conversion: Target 5-10%
- Lead Quality: Check Google Sheet

**When to Adjust:**
- CPL > $50: Pause and review targeting
- CTR < 0.5%: Change ad copy/creative
- LP Conversion < 3%: Test new landing page copy

---

## Budget Scenarios

### Conservative Start: $20/day = $600/month
- $10/day Video ad
- $10/day Static ad
- Expected: 20-30 leads/month
- Expected: 2-3 quote requests
- Expected: 0-1 sale

### Recommended: $30/day = $900/month
- $15/day on winner from first week
- $10/day on secondary ad
- $5/day retargeting
- Expected: 30-45 leads/month
- Expected: 3-5 quote requests
- Expected: 1-2 sales

### Aggressive: $50/day = $1,500/month
- $25/day scaled winner
- $15/day on variations
- $10/day retargeting
- Expected: 50-75 leads/month
- Expected: 5-8 quote requests
- Expected: 2-3 sales

---

## Success Checklist

### Before Launch
- [x] Video ad created and tested
- [x] Static ad created and tested
- [x] Landing page live (aaireco.com/download)
- [x] Google Sheets lead capture working
- [x] PDF download working
- [ ] Facebook Pixel installed
- [ ] Conversion tracking configured
- [ ] Business Manager set up
- [ ] Payment method added

### Week 1
- [ ] Both ads launched
- [ ] Daily metric checks
- [ ] Lead quality review
- [ ] Respond to leads within 24hrs

### Week 2
- [ ] Identify winning ad
- [ ] Scale budget on winner
- [ ] Create 2-3 variations
- [ ] Set up retargeting

### Month 1 Review
- [ ] Calculate actual CPL
- [ ] Review lead to quote rate
- [ ] Calculate ROI
- [ ] Plan Month 2 budget
- [ ] Create new ad variations

---

## Important Notes

**Lead Response Time:**
- Respond to leads within 4 hours (optimal)
- Check Google Sheet 3x per day minimum
- Set up email notifications for new leads (future)

**Ad Fatigue:**
- Expect CTR to drop after 7-14 days
- Refresh creative every 2-3 weeks
- Always have new ad variations ready

**Quality Over Quantity:**
- One $20k sale beats 100 unqualified leads
- Track lead quality, not just quantity
- Ask leads how they heard about you

**Budget Flexibility:**
- Start small, scale what works
- Don't panic if first week is slow
- Facebook needs 3-7 days to optimize

---

**Created:** 2026-05-08
**Status:** Ready to launch
**Next Action:** Export video ad recording + screenshot static ad
**Owner:** AAIRE Co. Marketing

**Questions?** Reference:
- FACEBOOK-AD-STRATEGY.md (full strategy)
- VIDEO-AD-TOOLS-GUIDE.md (recording help)
