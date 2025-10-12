// src/app/api/proxy/inquiries/service/route.js  
import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = 'https://sweekarme.in/shree/api';

export async function POST(request) {
  try {
    const backendUrl = `${BACKEND_BASE_URL}/inquiries/service/`;
    
    // Get the request body
    const body = await request.text();
    
    // Extract headers (exclude problematic ones)
    const headers = {};
    for (const [key, value] of request.headers.entries()) {
      if (!['host', 'connection', 'x-forwarded-for', 'x-forwarded-proto', 'x-forwarded-host'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    }
    
    // Ensure content-type is set
    if (!headers['content-type']) {
      headers['content-type'] = 'application/json';
    }
    
    console.log(`🚀 Proxying POST request to: ${backendUrl}`);
    console.log(`📦 Request body: ${body}`);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body,
    });
    
    const responseData = await response.text();
    console.log(`📨 Backend response status: ${response.status}`);
    console.log(`📨 Backend response: ${responseData}`);
    
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
    console.error('❌ Service inquiry proxy request failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Proxy request failed', 
        message: error.message,
        timestamp: new Date().toISOString(),
        endpoint: 'inquiries/service'
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