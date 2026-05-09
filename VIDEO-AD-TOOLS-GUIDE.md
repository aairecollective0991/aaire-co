# Video Ad Creation Tools & Screen Recording Guide

## How to Screen Record (Windows)

### Method 1: Xbox Game Bar (Built-in, Easiest)

**Steps:**
1. Press **Win + G** (opens Game Bar)
2. Click the **Record button** (circle icon) or press **Win + Alt + R**
3. Play your video
4. Press **Win + Alt + R** again to stop
5. Video saves to: `C:\Users\[YourName]\Videos\Captures`

**Settings:**
- Press **Win + G** → Settings (gear icon)
- Video Quality: Standard or High
- Audio: Turn OFF (you don't want system sounds)
- Frame rate: 60 fps

**Pros:**
✅ Already installed
✅ No watermark
✅ Simple to use

**Cons:**
❌ Can't select specific area
❌ Records full screen only

---

### Method 2: OBS Studio (Free, Professional)

**Download:** https://obsproject.com

**Setup:**
1. Download and install OBS Studio
2. Open OBS
3. Click **+** under Sources
4. Select **Window Capture**
5. Choose your browser window
6. Click **Start Recording**
7. Play your video
8. Click **Stop Recording**

**Settings for High Quality:**
- Settings → Output → Recording Quality: High Quality, Medium File Size
- Output Format: MP4
- Video Bitrate: 6000-8000 Kbps
- Encoder: x264
- Resolution: 1920x1080
- FPS: 30

**Pros:**
✅ Professional quality
✅ Select specific window
✅ No watermark
✅ Advanced controls

**Cons:**
❌ Slight learning curve

---

### Method 3: ScreenRec (Free, Lightweight)

**Download:** https://screenrec.com

**Steps:**
1. Download and install
2. Press **Alt + S** to start
3. Select area (choose your video window)
4. Click record
5. Stop when done

**Pros:**
✅ Very simple
✅ Select area
✅ Auto-saves

---

## Free Video Editing Tools (MUST HAVE)

### 1. CapCut (HIGHLY RECOMMENDED)

**Download:** https://capcut.com

**Why:**
- ✅ Professional quality
- ✅ NO WATERMARK
- ✅ Easy text overlays
- ✅ Templates
- ✅ Export square videos (1:1)

**Best For:**
- Adding text to videos
- Cropping to square format
- Basic editing
- Facebook/Instagram ads

**Tutorial:**
1. Import video
2. Tap **Text** → Add text overlays
3. Set timing for each text
4. Export → 1080x1080 (square)

---

### 2. DaVinci Resolve (Advanced, Free)

**Download:** https://www.blackmagicdesign.com/products/davinciresolve

**Why:**
- ✅ Hollywood-grade (100% free)
- ✅ No watermark
- ✅ Color grading
- ✅ Professional effects

**Best For:**
- Color correction
- Advanced editing
- Multiple video layers
- Professional projects

**Warning:** Steep learning curve, overkill for simple ads

---

### 3. Canva (Web-based)

**URL:** https://canva.com

**Free Features:**
- ✅ 1,000+ video templates
- ✅ Text animations
- ✅ Easy drag-and-drop
- ✅ Export MP4

**Limitations (Free):**
- ⚠️ Canva watermark (upgrade to Pro $13/mo to remove)
- ⚠️ Limited templates in free version

**Best For:**
- Quick social media videos
- Template-based ads
- Non-editors

---

## Recommended Software Stack (All Free)

**Tier 1: Basics (Start Here)**
1. **Xbox Game Bar** - Screen recording (built-in)
2. **CapCut** - Video editing & text overlays
3. **Canva Free** - Graphics & templates

**Tier 2: Better Quality**
1. **OBS Studio** - Professional screen recording
2. **CapCut** - Video editing
3. **GIMP** - Image editing (Photoshop alternative)

**Tier 3: Professional**
1. **OBS Studio** - Recording
2. **DaVinci Resolve** - Video editing
3. **GIMP** - Images
4. **Audacity** - Audio editing

---

## Optional Paid Tools (Worth It)

### Canva Pro ($12.99/month)
**What You Get:**
- No watermark
- 100+ million stock photos/videos
- Background remover
- Magic resize (one-click resize for all platforms)
- Brand kit (save your colors/fonts)

**ROI:** If you make 2+ ads per month, worth it

### Adobe Express ($9.99/month)
**What You Get:**
- Similar to Canva Pro
- Adobe stock library
- Better integration with Photoshop/Illustrator

---

## Screen Recording: Step-by-Step Guide

### For Video Ad Preview (HTML Page)

1. **Open the preview:**
   ```
   http://localhost:3000/video-ad-preview.html
   ```

2. **Set up recording:**
   - **OBS Method:**
     - Open OBS
     - Add "Window Capture" source
     - Select browser window
     - Adjust crop to 1080x1080 square
   
   - **Game Bar Method:**
     - Press Win + G
     - Make sure browser window is fullscreen
     - Click Record

3. **Record:**
   - Click **Play** button on preview
   - Let video play completely (30 seconds)
   - Stop recording

4. **Edit (if needed):**
   - Open in CapCut
   - Trim start/end if needed
   - Export as 1080x1080 MP4

---

## Export Settings for Facebook Ads

**Video Specs:**
- **Format:** MP4
- **Resolution:** 1080x1080 (square - 1:1 ratio)
- **Frame Rate:** 30 fps
- **Video Codec:** H.264
- **Audio:** AAC (or remove audio for silent ad)
- **Bitrate:** 6,000-8,000 Kbps
- **File Size:** Under 4 GB (Facebook max)
- **Length:** 15-30 seconds (recommended)

**Alternative Sizes:**
- **Feed (Square):** 1080x1080
- **Stories (Vertical):** 1080x1920
- **In-Stream (Horizontal):** 1920x1080

---

## Quick Start Workflow

**Today:**
1. ✅ Download CapCut
2. ✅ Test Xbox Game Bar (Win + G)
3. ✅ Open video preview (localhost:3000/video-ad-preview.html)
4. ✅ Screen record the preview
5. ✅ Upload to Facebook Ads Manager

**This Week:**
1. Download OBS Studio for better quality
2. Practice with CapCut text overlays
3. Create 2-3 video variations
4. A/B test different opening hooks

---

## Troubleshooting

**"Video is choppy when recording"**
- Lower video quality in OBS/Game Bar
- Close other programs
- Record to SSD (not external drive)

**"File size too large"**
- Use CapCut to compress
- Settings → Export → Quality: Medium
- Or use HandBrake (free compression tool)

**"Can't see preview page"**
- Make sure dev server is running
- Check: http://localhost:3000/video-ad-preview.html
- Refresh page (Ctrl + R)

**"Game Bar won't open"**
- Enable in Settings → Gaming → Game Bar → ON
- Check keyboard: Try Win + Alt + G
- Restart computer

---

## Next Steps

1. **Install CapCut** - Your main video editor
2. **Test Game Bar** - Press Win + G right now
3. **Record the preview** - Create your first video ad
4. **Upload to Facebook** - Test with $5/day budget

**Need help?** Reference FACEBOOK-AD-STRATEGY.md for launch plan.
