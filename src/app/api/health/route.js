// src/app/api/health/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test connection to backend through proxy
    const proxyResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/proxy/core/company-info/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const directResponse = await fetch('https://sweekarme.in/shree/api/core/company-info/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      proxy: {
        status: proxyResponse.ok ? 'working' : 'failed',
        statusCode: proxyResponse.status,
      },
      direct: {
        status: directResponse.ok ? 'working' : 'failed', 
        statusCode: directResponse.status,
      },
      environment: {
        useProxy: process.env.NEXT_PUBLIC_USE_PROXY !== 'false',
        nodeEnv: process.env.NODE_ENV,
      }
    });

  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}