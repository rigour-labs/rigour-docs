---
sidebar_position: 2
---

# Remote MCP Server

Deploy Rigour's quality gates over HTTP for web-based AI agents.

## Overview

The Remote MCP Server (`@rigour-labs/remote-mcp`) exposes Rigour's quality gates via HTTP using the Model Context Protocol's `StreamableHTTPServerTransport`. This is designed for web-based agent environments that cannot use stdio-based communication.

**When to use:**
- Web-based AI agents (browser-based tools)
- Cloud-hosted agent platforms
- Multi-tenant agent systems
- Agents that require HTTP/REST access

**When to use stdio instead:**
- Local desktop agents (Cursor, Claude Desktop, Cline)
- Single-user development environments
- Direct CLI integration

> **🚀 Official Production Server**  
> Rigour provides a free, public MCP server at **`https://mcp.rigour.run/mcp`**  
> No authentication required • No setup needed • Always available
>
> Perfect for testing and development. For production use, deploy your own instance with authentication enabled.

## Quick Start

### Deploy to Vercel

1. Clone the Rigour repository:
```bash
git clone https://github.com/rigour-labs/rigour
cd rigour/packages/rigour-remote-mcp
```

2. Install Vercel CLI and deploy:
```bash
npm i -g vercel
vercel
```

3. (Optional) Add authentication:
```bash
# Generate a secure token
openssl rand -hex 32

# Set it in Vercel
vercel env add RIGOUR_MCP_TOKEN
```

Your server is now live!

**Official Production Server**: `https://mcp.rigour.run/`

You can also deploy your own instance - it will be at `https://your-project.vercel.app/`

## Deployment Options

### Vercel (Recommended for MVP)

```bash
vercel
```

**Pros:**
- Zero configuration
- Edge Functions support
- Free tier available

**Cons:**
- 60s execution limit (fine for Rigour checks)
- Serverless (no persistent state)

### Google Cloud Run

```bash
gcloud run deploy rigour-mcp \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Pros:**
- Long-running processes
- Auto-scaling
- Better for high-volume usage

### Fly.io

```bash
fly launch
fly deploy
```

**Pros:**
- Global edge deployment
- Persistent connections
- Simple pricing

### Railway

```bash
railway up
```

**Pros:**
- One-click deployment
- Built-in database support
- Simple UI

## Authentication

Authentication is **optional** and controlled via environment variables.

### Without Authentication (Open Mode)

Perfect for private deployments or internal tools:

```bash
# No RIGOUR_MCP_TOKEN set
npm run start
```

### With Bearer Token

For public or multi-tenant deployments:

```bash
# Generate a secure token
openssl rand -hex 32

# Set environment variable
export RIGOUR_MCP_TOKEN="your-generated-token-here"

# Start server
npm run start
```

## Client Configuration

### Web-Based Agents

Use the `StreamableHTTPClientTransport` from the MCP SDK:

```typescript
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

// Use the official Rigour MCP server
const transport = new StreamableHTTPClientTransport({
  url: "https://mcp.rigour.run/",
  headers: {
    "Authorization": "Bearer your-token-here" // Optional
  }
});

const client = new Client({
  name: "my-web-agent",
  version: "1.0.0"
}, {
  capabilities: {}
});

await client.connect(transport);

// Call Rigour tools
const result = await client.callTool({
  name: "rigour_status",
  arguments: {
    cwd: "/path/to/project"
  }
});
```

### cURL Testing

```bash
# Health check (official server)
curl https://mcp.rigour.run/health

# Call a tool (official server - no auth required)
curl -X POST https://mcp.rigour.run/ \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "rigour_status",
      "arguments": {
        "cwd": "/path/to/project"
      }
    },
    "id": 1
  }'
```

## Available Tools

The remote server exposes the same tools as the stdio version:

| Tool | Description |
|------|-------------|
| `rigour_check` | Run full quality gate audit |
| `rigour_explain` | Get human-readable failure explanations |
| `rigour_status` | Quick PASS/FAIL check (JSON) |
| `rigour_get_fix_packet` | Get prioritized fix instructions |
| `rigour_list_gates` | List active quality gates |
| `rigour_get_config` | Get project configuration |

See the [MCP Server](/mcp/mcp-server) page for detailed tool documentation.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | Server port |
| `RIGOUR_MCP_TOKEN` | No | - | Bearer token for authentication |

## Security Best Practices

1. **Always use HTTPS** in production
2. **Set `RIGOUR_MCP_TOKEN`** for public deployments
3. **Rotate tokens** periodically (monthly recommended)
4. **Use environment variables** - never commit tokens to git
5. **Monitor access logs** for suspicious activity
6. **Rate limit** if exposing publicly (use Vercel/Cloudflare)

## Architecture

- **Framework**: Hono (lightweight, edge-compatible)
- **Transport**: `@hono/mcp` (StreamableHTTPServerTransport wrapper)
- **Protocol**: MCP v2024-11-05+ (Streamable HTTP)
- **Deployment**: Vercel Edge Functions, Cloud Run, Fly.io, Railway

## Troubleshooting

### "Unauthorized" Error

Ensure your `Authorization` header matches the `RIGOUR_MCP_TOKEN`:

```bash
# Call rigour_status (official server)
curl -X POST https://mcp.rigour.run/
```

### Timeout Errors

Vercel Edge Functions have a 60s limit. If your Rigour checks take longer:

1. Optimize your quality gates
2. Deploy to Cloud Run or Fly.io for longer timeouts
3. Split large checks into smaller batches

### "rigour.yml not found"

The remote server requires a `rigour.yml` file in the project directory specified by the `cwd` argument. Ensure:

1. The project has been initialized with `rigour init`
2. The `cwd` path is absolute and correct
3. The server has filesystem access to the project

## Comparison: Remote vs Stdio

| Feature | Remote MCP | Stdio MCP |
|---------|------------|-----------|
| **Use Case** | Web agents | Local agents |
| **Transport** | HTTP/SSE | stdin/stdout |
| **Auth** | Bearer tokens | Process isolation |
| **Deployment** | Cloud platforms | Local machine |
| **Scalability** | Multi-tenant | Single-user |
| **Latency** | Network dependent | Near-zero |

## Next Steps

- [Configure Quality Gates](/concepts/quality-gates)
- [Understand Fix Packets](/concepts/fix-packet)
- [Explore CLI Commands](/cli/commands)
