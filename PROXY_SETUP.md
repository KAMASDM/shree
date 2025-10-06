# API Proxy Configuration

This project includes a proxy server to resolve CORS and network blocking issues when calling backend APIs from different domains.

## Problem Solved

- **CORS Issues**: Frontend calls to `https://sweekarme.in/shree/api` from different domains
- **Network Blocking**: Corporate/restrictive networks blocking external API calls  
- **Security**: Some browsers/networks block cross-origin requests

## How It Works

The proxy server intercepts API calls and forwards them through the Next.js backend, making all API calls appear to come from the same domain.

```
Frontend → Next.js API Route (/api/proxy/*) → Backend API (sweekarme.in)
```

## Configuration

### Environment Variables (.env.local)

```bash
# Use proxy server (recommended for production)
NEXT_PUBLIC_USE_PROXY=true

# Direct API URL (used when proxy is disabled)
NEXT_PUBLIC_API_BASE_URL=https://sweekarme.in/shree/api
```

### Proxy Routes

All API calls are automatically routed through `/api/proxy/[...path]`

**Examples:**
- `GET /api/proxy/products/all/` → `GET https://sweekarme.in/shree/api/products/all/`
- `POST /api/proxy/core/contact/` → `POST https://sweekarme.in/shree/api/core/contact/`

## Usage

### Automatic (Default)
The `src/lib/api.js` automatically uses the proxy when `NEXT_PUBLIC_USE_PROXY=true`

### Manual Control
```javascript
// Force direct API calls (bypass proxy)
const BASE_URL = 'https://sweekarme.in/shree/api';

// Force proxy usage
const BASE_URL = '/api/proxy';
```

## Development Commands

```bash
# Run with proxy enabled (default)
npm run dev

# Run with direct API calls (bypass proxy)
npm run dev:direct

# Test proxy health
npm run test:proxy
```

## Health Check

Visit `/api/health` to check:
- Proxy server status
- Direct API connectivity  
- Current configuration

## Troubleshooting

### Proxy Not Working
1. Check `/api/health` endpoint
2. Verify environment variables
3. Check Next.js server logs
4. Test direct API access

### Network Still Blocking
1. Ensure `NEXT_PUBLIC_USE_PROXY=true`
2. Restart development server
3. Clear browser cache
4. Check corporate firewall settings

### Performance Considerations
- Proxy adds small latency (~10-50ms)
- Caching still works normally
- Error handling maintained
- No changes to existing API service methods

## Security Notes

- Proxy only forwards to whitelisted backend domain
- CORS headers properly configured
- No sensitive data logged
- Request/response headers filtered appropriately