# Social Media Preview Debugging Guide

## Issue: Product URL Not Showing Preview Image

### Current Problem:
When sharing `https://shreedhargroup.com/products/rtp-integrity-tester`, the social media preview (WhatsApp, Facebook, etc.) doesn't show:
- ❌ Product thumbnail image
- ❌ Product title
- ❌ Product description

---

## 🔍 Root Cause Analysis

### 1. **Domain Mismatch** ⚠️

**Code Configuration:**
```javascript
// In src/app/products/[slug]/page.jsx
url: `https://shreedharinstruments.com/products/${slug}`
```

**Actual URL Being Shared:**
```
https://shreedhargroup.com/products/rtp-integrity-tester
```

**Problem:** The URLs don't match!
- Code uses: `shreedharinstruments.com`
- You're sharing: `shreedhargroup.com`

**This causes:**
- ❌ Canonical URL mismatch
- ❌ Open Graph URL points to wrong domain
- ❌ Social platforms might not recognize the page

---

### 2. **Static Generation Required**

Next.js 15 App Router requires metadata to be generated at **build time** for optimal social sharing.

**Current Setup:**
```javascript
export async function generateMetadata({ params }) {
  // This runs on-demand (ISR)
  const response = await apiService.getProductBySlug(slug);
  // ...
}
```

**For best social sharing, we need:**
- Pre-rendered pages at build time
- Static metadata in HTML
- Fast server response for social crawlers

---

## ✅ Solutions

### Solution 1: Fix Domain Configuration (CRITICAL)

You need to decide which domain to use and configure it everywhere.

**Option A: Use shreedhargroup.com**
```javascript
// Update src/app/products/[slug]/page.jsx
url: `https://shreedhargroup.com/products/${slug}`,

// Update src/app/sitemap.js
const BASE_URL = "https://shreedhargroup.com";

// Update src/app/layout.js
canonical: "https://shreedhargroup.com",
```

**Option B: Use shreedharinstruments.com**
- Keep current code as is
- Update your DNS/deployment to use shreedharinstruments.com
- Redirect shreedhargroup.com → shreedharinstruments.com

---

### Solution 2: Add Static Generation

Generate product pages at build time for faster loading and better social sharing.

**Add to `/src/app/products/[slug]/page.jsx`:**

```javascript
// Add this export to pre-render product pages at build time
export async function generateStaticParams() {
  try {
    const response = await apiService.getAllProducts();
    const products = response?.data || response || [];
    
    // Return array of params for static generation
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
```

**This will:**
- ✅ Pre-render all product pages at build time
- ✅ Include full metadata in HTML
- ✅ Faster page loads
- ✅ Better social media crawling

---

### Solution 3: Test Metadata is Working

**Step 1: Check HTML Output**

After fixing the domain and rebuilding, test the HTML:

```bash
# Build the site
npm run build
npm start

# Check if metadata is in HTML (replace with your actual domain)
curl -s "http://localhost:3000/products/rtp-integrity-tester" | grep -A 5 "og:image"
```

**Expected Output:**
```html
<meta property="og:image" content="https://sweekarme.in/shree/media/products/rtp-integrity-testerdb2fd.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="RTP Integrity Tester" />
```

---

**Step 2: Test with Facebook Debugger**

```
https://developers.facebook.com/tools/debug/
```

1. Enter your product URL: `https://shreedhargroup.com/products/rtp-integrity-tester`
2. Click "Debug"
3. Look for errors

**Common Errors:**
- ❌ "Could not fetch URL" → Domain/DNS issue
- ❌ "No og:image found" → Metadata not generated
- ❌ "Image too small" → Image size issue
- ❌ "Couldn't resolve URL" → 404 or redirect issue

---

**Step 3: Force Refresh Cache**

After fixing, social platforms cache previews for 24-48 hours.

**Facebook/WhatsApp:**
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter URL
3. Click "Scrape Again"
4. Verify image shows

**Twitter:**
1. Go to: https://cards-dev.twitter.com/validator
2. Enter URL
3. Preview card

---

## 🛠️ Implementation Steps

### Step 1: Fix Domain Configuration

Choose your domain and update these files:

```bash
# Files to update:
- src/app/products/[slug]/page.jsx (line 54)
- src/app/sitemap.js (line 3)
- src/app/layout.js (openGraph.url, canonical)
- public/robots.txt
- next.config.mjs (if domain-specific config)
```

---

### Step 2: Add Static Generation

**File: `/src/app/products/[slug]/page.jsx`**

Add after the generateMetadata function:

```javascript
// Pre-render product pages at build time
export async function generateStaticParams() {
  try {
    console.log('🔨 Generating static params for product pages...');
    
    const response = await apiService.getAllProducts();
    const products = response?.data || response || [];
    
    console.log(`✅ Found ${products.length} products to pre-render`);
    
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('❌ Error generating static params:', error);
    return [];
  }
}

// Optional: Configure dynamic behavior
export const dynamic = 'force-static'; // or 'auto'
export const revalidate = 3600; // Revalidate every hour
```

---

### Step 3: Rebuild and Deploy

```bash
# Clean build
rm -rf .next

# Rebuild with static generation
npm run build

# Check build output - should show:
# ✓ Generating static pages (50/50)
# ○ /products/[slug] (25 paths)

# Start production server to test
npm start

# Test a product page
curl -s "http://localhost:3000/products/rtp-integrity-tester" | grep "og:image"
```

---

### Step 4: Verify Deployment

After deploying to production:

```bash
# Test production URL
curl -s "https://shreedhargroup.com/products/rtp-integrity-tester" | grep -E "(og:|twitter:)" | head -20
```

**Should see:**
```html
<meta property="og:title" content="RTP Integrity Tester" />
<meta property="og:description" content="Tailin make Rapid Transfer Port Integrity Tester" />
<meta property="og:image" content="https://sweekarme.in/shree/media/products/rtp-integrity-testerdb2fd.webp" />
<meta property="og:url" content="https://shreedhargroup.com/products/rtp-integrity-tester" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://sweekarme.in/shree/media/products/rtp-integrity-testerdb2fd.webp" />
```

---

## 🧪 Testing Checklist

### Pre-Deployment:
- [ ] Domain configured correctly in all files
- [ ] generateStaticParams added
- [ ] Clean build successful
- [ ] Metadata visible in HTML (curl test)
- [ ] Images accessible (curl -I image URL)

### Post-Deployment:
- [ ] Production URL loads correctly
- [ ] Metadata in production HTML
- [ ] Facebook Debugger shows preview
- [ ] Twitter Card Validator shows preview
- [ ] WhatsApp preview works (send to yourself)
- [ ] Image loads in preview

---

## 🔍 Debugging Commands

### Check if metadata is in HTML:
```bash
curl -s "https://shreedhargroup.com/products/rtp-integrity-tester" > temp.html
grep -E "(og:|twitter:|meta.*description)" temp.html
```

### Check if image is accessible:
```bash
curl -I "https://sweekarme.in/shree/media/products/rtp-integrity-testerdb2fd.webp"
# Should return: HTTP/2 200
```

### Check page response time:
```bash
curl -w "@-" -o /dev/null -s "https://shreedhargroup.com/products/rtp-integrity-tester" <<'EOF'
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
      time_redirect:  %{time_redirect}\n
   time_pretransfer:  %{time_pretransfer}\n
 time_starttransfer:  %{time_starttransfer}\n
                    ----------\n
         time_total:  %{time_total}\n
EOF
```

### Check Next.js build output:
```bash
npm run build 2>&1 | grep -A 10 "Generating static pages"
```

---

## ⚠️ Common Issues & Fixes

### Issue 1: "og:image not found"

**Cause:** Image URL is relative or incorrect

**Fix:**
```javascript
// Make sure image URL is absolute
const fullImageUrl = imageUrl.startsWith('http') 
  ? imageUrl 
  : `https://sweekarme.in/shree${imageUrl}`;
```

---

### Issue 2: "Could not fetch URL"

**Cause:** 
- Domain not resolving
- Page returns 404
- Server timeout

**Fix:**
```bash
# Check DNS
nslookup shreedhargroup.com

# Check page loads
curl -I "https://shreedhargroup.com/products/rtp-integrity-tester"
# Should return: HTTP/2 200
```

---

### Issue 3: "Preview shows old image"

**Cause:** Social media cache (24-48 hours)

**Fix:**
1. Use Facebook Debugger "Scrape Again"
2. Wait 24-48 hours for natural cache expiry
3. Change URL slightly (add ?v=2 parameter)

---

### Issue 4: "Image loads slowly"

**Cause:** Image too large or slow server

**Fix:**
```javascript
// Optimize image in next.config.mjs
images: {
  remotePatterns: [{
    protocol: 'https',
    hostname: 'sweekarme.in',
  }],
  formats: ['image/webp'],
}
```

---

## 📋 Quick Fix Script

Save this as `fix-product-metadata.sh`:

```bash
#!/bin/bash

echo "🔧 Fixing product metadata for social sharing..."

# 1. Clean build
echo "📁 Cleaning .next folder..."
rm -rf .next

# 2. Rebuild
echo "🔨 Building site..."
npm run build

# 3. Test a product page
echo "🧪 Testing product page..."
if npm start & sleep 5; then
  curl -s "http://localhost:3000/products/rtp-integrity-tester" | grep -q "og:image"
  if [ $? -eq 0 ]; then
    echo "✅ Metadata found in HTML!"
  else
    echo "❌ Metadata NOT found in HTML"
  fi
  pkill -f "next start"
fi

echo "✅ Done! Deploy to production and test with Facebook Debugger"
```

Run with:
```bash
chmod +x fix-product-metadata.sh
./fix-product-metadata.sh
```

---

## 🎯 Expected Timeline

### Immediate (0-1 hour):
- Fix domain configuration
- Add generateStaticParams
- Rebuild and deploy

### Short-term (1-24 hours):
- Test with Facebook Debugger
- Force cache refresh
- Verify previews work

### Medium-term (24-48 hours):
- Natural cache expiry
- Organic shares show new previews
- All platforms updated

---

## ✅ Success Criteria

Your social sharing will be working when:

1. **Facebook Debugger shows:**
   - ✅ Product image (1200x630px)
   - ✅ Product title
   - ✅ Product description
   - ✅ No errors

2. **WhatsApp preview shows:**
   - ✅ Large product image
   - ✅ Bold product title
   - ✅ Description text
   - ✅ Domain name

3. **Twitter Card shows:**
   - ✅ Summary large image
   - ✅ Product title
   - ✅ Description

4. **HTML includes:**
   ```html
   <meta property="og:image" content="https://sweekarme.in/..." />
   <meta property="og:title" content="RTP Integrity Tester" />
   <meta name="twitter:card" content="summary_large_image" />
   ```

---

## 🆘 Still Not Working?

If previews still don't show after following all steps:

1. **Check browser console** for JavaScript errors
2. **Verify API returns data** (test with curl)
3. **Check Next.js build logs** for generation errors
4. **Test with multiple products** (not just one)
5. **Check server logs** for 500 errors
6. **Verify image URLs load** in browser
7. **Try different social platforms** (Facebook vs Twitter)

---

## 📞 Debug Checklist

Share this info if you need more help:

```bash
# Run these commands and share output:

# 1. Check domain
echo "Domain: $(grep BASE_URL src/app/sitemap.js)"

# 2. Check if product page builds
npm run build 2>&1 | grep "products/\[slug\]"

# 3. Check metadata in HTML
curl -s "https://shreedhargroup.com/products/rtp-integrity-tester" | grep -c "og:image"

# 4. Check image loads
curl -I "https://sweekarme.in/shree/media/products/rtp-integrity-testerdb2fd.webp"

# 5. Check API works
curl -s "https://sweekarme.in/shree/api/products/all/rtp-integrity-tester/" | jq '.name'
```

Your social media previews will work after fixing the domain and adding static generation! 🚀
