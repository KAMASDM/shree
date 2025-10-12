// src/app/api/proxy/images/[...path]/route.js
import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = 'https://sweekarme.in/shree';

export async function GET(request, { params }) {
  try {
    const { path } = await params;
    
    // Construct the backend image URL
    const imagePath = path.join('/');
    const backendUrl = `${BACKEND_BASE_URL}/${imagePath}`;
    
    console.log(`🖼️ Proxying image request to: ${backendUrl}`);
    
    // Fetch the image from the backend
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Next.js Image Proxy',
      },
    });
    
    if (!response.ok) {
      console.error(`❌ Image fetch failed: ${response.status} ${response.statusText}`);
      return new NextResponse('Image not found', { status: 404 });
    }
    
    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    console.log(`✅ Image proxied successfully: ${contentType}, ${imageBuffer.byteLength} bytes`);
    
    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
    
  } catch (error) {
    console.error('❌ Image proxy request failed:', error);
    
    return new NextResponse('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}