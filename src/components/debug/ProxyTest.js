// src/components/debug/ProxyTest.js
"use client";
import { useState } from "react";
import { apiService } from "../../lib/api";

export default function ProxyTest() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      console.log("Testing API through current configuration...");
      const start = Date.now();
      
      // Test a simple API call
      const result = await apiService.getCompanyInfo();
      
      const duration = Date.now() - start;
      
      setTestResult({
        success: true,
        duration: `${duration}ms`,
        data: result.data ? "✅ Data received" : "❌ No data",
        fromCache: result.fromCache ? "📋 From cache" : "🌐 Fresh fetch",
        timestamp: new Date().toLocaleString()
      });
      
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setLoading(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border-2 border-gray-200 max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">🔧 API Proxy Test</h3>
      
      <button
        onClick={runTest}
        disabled={loading}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:bg-gray-400 mb-2 w-full"
      >
        {loading ? "Testing..." : "Test API Connection"}
      </button>
      
      {testResult && (
        <div className={`text-xs p-2 rounded ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="font-semibold">
            {testResult.success ? '✅ Success' : '❌ Failed'}
          </div>
          
          {testResult.success ? (
            <div className="mt-1 space-y-1">
              <div>{testResult.duration}</div>
              <div>{testResult.data}</div>
              <div>{testResult.fromCache}</div>
            </div>
          ) : (
            <div className="mt-1 text-red-600">
              {testResult.error}
            </div>
          )}
          
          <div className="text-gray-500 mt-1">
            {testResult.timestamp}
          </div>
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-2">
        Mode: {process.env.NEXT_PUBLIC_USE_PROXY !== 'false' ? 'Proxy' : 'Direct'}
      </div>
    </div>
  );
}