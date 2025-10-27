// src/app/api/proxy/hr/applications/route.js
import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = 'https://sweekarme.in/shree/api';

// Configure route for file uploads
export const runtime = 'nodejs'; // Use Node.js runtime for better file handling
export const maxDuration = 300; // 5 minutes timeout
export const dynamic = 'force-dynamic'; // Disable static optimization

export async function POST(request) {
  try {
    const backendUrl = `${BACKEND_BASE_URL}/hr/applications/`;
    
    console.log(`🚀 Proxying job application POST request to: ${backendUrl}`);
    
    // Get the FormData directly from the request
    const formData = await request.formData();
    
    console.log('📦 FormData fields received:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  - ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`  - ${key}: ${value}`);
      }
    }
    
    // Forward the FormData to the backend
    // Note: fetch automatically sets the correct Content-Type with boundary for FormData
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let fetch handle it for FormData
    });
    
    const responseData = await response.text();
    console.log(`📨 Backend response status: ${response.status}`);
    console.log(`📨 Backend response: ${responseData.substring(0, 200)}...`);
    
    // Create response with same status
    const proxyResponse = new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
    });
    
    // Copy relevant headers from backend response
    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key.toLowerCase())) {
        proxyResponse.headers.set(key, value);
      }
    });
    
    // Add CORS headers
    proxyResponse.headers.set('Access-Control-Allow-Origin', '*');
    proxyResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    proxyResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return proxyResponse;
    
  } catch (error) {
    console.error('❌ HR applications proxy request failed:', error);
    console.error('Error details:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Proxy request failed', 
        message: error.message,
        timestamp: new Date().toISOString(),
        endpoint: 'hr/applications'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}