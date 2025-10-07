// src/app/api/proxy/[...path]/route.js
import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = 'https://sweekarme.in/shree/api';

// Helper function to construct the backend URL
function getBackendUrl(path, searchParams) {
  const backendUrl = `${BACKEND_BASE_URL}/${path.join('/')}`;
  
  if (searchParams.size > 0) {
    return `${backendUrl}?${searchParams.toString()}`;
  }
  
  return backendUrl;
}

// Helper function to handle the proxy request
async function proxyRequest(request, path) {
  try {
    const url = new URL(request.url);
    const backendUrl = getBackendUrl(path, url.searchParams);
    
    // Extract headers (exclude host and other Next.js specific headers)
    const headers = {};
    for (const [key, value] of request.headers.entries()) {
      if (!['host', 'connection', 'x-forwarded-for', 'x-forwarded-proto'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    }
    
    // Set content-type if not present
    if (!headers['content-type']) {
      headers['content-type'] = 'application/json';
    }
    
    const options = {
      method: request.method,
      headers,
    };
    
    // Add body for POST, PUT, PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      options.body = await request.text();
    }
    
    console.log(`Proxying ${request.method} request to: ${backendUrl}`);
    
    const response = await fetch(backendUrl, options);
    
    // Get response data
    const data = await response.text();
    
    // Create response with same status and headers
    const proxyResponse = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
    });
    
    // Copy relevant headers from backend response
    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key.toLowerCase())) {
        proxyResponse.headers.set(key, value);
      }
    });
    
    // Add CORS headers to prevent blocking
    proxyResponse.headers.set('Access-Control-Allow-Origin', '*');
    proxyResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    proxyResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return proxyResponse;
    
  } catch (error) {
    console.error('Proxy request failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Proxy request failed', 
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET(request, { params }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

// Handle POST requests
export async function POST(request, { params }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

// Handle PUT requests
export async function PUT(request, { params }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

// Handle DELETE requests
export async function DELETE(request, { params }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

// Handle PATCH requests
export async function PATCH(request, { params }) {
  const { path } = await params;
  return proxyRequest(request, path);
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}