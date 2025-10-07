#!/bin/bash

# Social Media Preview Checker
# Tests if product metadata is properly configured

echo "🔍 Social Media Preview Checker"
echo "================================"
echo ""

# Test URL - change this to your domain
DOMAIN="shreedhargroup.com"
PRODUCT_SLUG="rtp-integrity-tester"
URL="https://${DOMAIN}/products/${PRODUCT_SLUG}"

echo "Testing URL: $URL"
echo ""

# Test 1: Check if URL is accessible
echo "Test 1: Checking if URL is accessible..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ PASS: URL returns 200 OK"
else
    echo "❌ FAIL: URL returns $HTTP_CODE (expected 200)"
    exit 1
fi
echo ""

# Test 2: Check for og:image meta tag
echo "Test 2: Checking for og:image meta tag..."
OG_IMAGE=$(curl -s "$URL" | grep -o 'property="og:image" content="[^"]*"' | head -1)
if [ -n "$OG_IMAGE" ]; then
    echo "✅ PASS: Found og:image tag"
    echo "   $OG_IMAGE"
else
    echo "❌ FAIL: No og:image found in HTML"
fi
echo ""

# Test 3: Check for og:title meta tag
echo "Test 3: Checking for og:title meta tag..."
OG_TITLE=$(curl -s "$URL" | grep -o 'property="og:title" content="[^"]*"' | head -1)
if [ -n "$OG_TITLE" ]; then
    echo "✅ PASS: Found og:title tag"
    echo "   $OG_TITLE"
else
    echo "❌ FAIL: No og:title found in HTML"
fi
echo ""

# Test 4: Check for og:description meta tag
echo "Test 4: Checking for og:description meta tag..."
OG_DESC=$(curl -s "$URL" | grep -o 'property="og:description" content="[^"]*"' | head -1)
if [ -n "$OG_DESC" ]; then
    echo "✅ PASS: Found og:description tag"
    echo "   $OG_DESC"
else
    echo "❌ FAIL: No og:description found in HTML"
fi
echo ""

# Test 5: Check if image URL is accessible
echo "Test 5: Checking if product image is accessible..."
IMAGE_URL=$(echo "$OG_IMAGE" | grep -o 'https://[^"]*')
if [ -n "$IMAGE_URL" ]; then
    IMAGE_HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$IMAGE_URL")
    if [ "$IMAGE_HTTP_CODE" = "200" ]; then
        echo "✅ PASS: Image is accessible ($IMAGE_HTTP_CODE)"
        echo "   $IMAGE_URL"
    else
        echo "❌ FAIL: Image returns $IMAGE_HTTP_CODE (expected 200)"
        echo "   $IMAGE_URL"
    fi
else
    echo "⚠️  SKIP: No image URL found to test"
fi
echo ""

# Test 6: Check for Twitter Card
echo "Test 6: Checking for Twitter Card meta tags..."
TWITTER_CARD=$(curl -s "$URL" | grep -o 'name="twitter:card" content="[^"]*"' | head -1)
if [ -n "$TWITTER_CARD" ]; then
    echo "✅ PASS: Found Twitter Card tag"
    echo "   $TWITTER_CARD"
else
    echo "❌ FAIL: No twitter:card found in HTML"
fi
echo ""

# Summary
echo "================================"
echo "Summary:"
echo ""
echo "Next steps:"
echo "1. If all tests pass, test with Facebook Debugger:"
echo "   https://developers.facebook.com/tools/debug/"
echo ""
echo "2. Then test with Twitter Card Validator:"
echo "   https://cards-dev.twitter.com/validator"
echo ""
echo "3. Finally, send the URL to yourself on WhatsApp to see the preview"
echo ""
echo "Note: Social platforms cache previews for 24-48 hours."
echo "Use the debuggers to force a refresh if needed."
