---
title: Remote MCP Server
description: Deploy Rigour's quality gates over HTTP for web-based AI agents
sidebar_position: 2
---

# Remote MCP Server

> [!NOTE]
> The Remote MCP Server is designed for **web-based agents** and cloud-hosted platforms. For local desktop agents like Cursor or Claude Code, use the [stdio-based MCP Server](/mcp/mcp-server) instead.

## Overview

The Remote MCP Server ([rigour-mcp](https://github.com/rigour-labs/rigour-mcp)) exposes Rigour's quality gates via HTTP using the Model Context Protocol's SSE (Server-Sent Events) transport. This enables web-based agent environments that cannot use stdio-based communication to benefit from Rigour's quality gates.

**Official Production Server**: `https://mcp.rigour.run/`

> [!TIP]
> Rigour provides a **free, public MCP server** at `https://mcp.rigour.run/` — no authentication required, no setup needed, always available. Perfect for testing and development.

## When to Use

| Scenario | Use Remote MCP | Use Stdio MCP |
|----------|----------------|---------------|
| Web-based AI agents | ✅ | |
| Cloud-hosted agent platforms | ✅ | |
| Multi-tenant agent systems | ✅ | |
| Browser-based tools | ✅ | |
| Local desktop agents (Cursor, Claude) | | ✅ |
| Single-user development | | ✅ |
| Direct CLI integration | | ✅ |

## Quick Start

### Using the Public Server

The fastest way to get started is using Rigour's public server:

```bash
# Health check
curl https://mcp.rigour.run/api/health

# Connect via SSE
# GET https://mcp.rigour.run/api/mcp/sse?sessionId=123
```

### Self-Hosting

For production deployments with authentication or custom configurations:

```bash
# Clone and deploy
git clone https://github.com/rigour-labs/rigour-mcp
cd rigour-mcp

# Deploy to Vercel (recommended)
vercel
```

## Authentication

Authentication is **optional** and controlled via the `RIGOUR_MCP_TOKEN` environment variable.

### Open Mode (No Authentication)

```bash
# No RIGOUR_MCP_TOKEN set - server accepts all requests
npm run start
```

> [!WARNING]
> Only use open mode for private deployments or internal tools. For public-facing servers, always enable authentication.

### Bearer Token Authentication

```bash
# Generate a secure token
openssl rand -hex 32

# Set environment variable
export RIGOUR_MCP_TOKEN="your-generated-token-here"

# Start server
npm run start
```

Clients must include the token in requests:

```bash
curl -X POST https://your-server.vercel.app/ \
  -H "Authorization: Bearer your-generated-token-here" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

## Client Integration

### Web-Based Agents (TypeScript)

```typescript
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

const transport = new SSEClientTransport(
  new URL("https://mcp.rigour.run/api/mcp/sse?sessionId=unique-id")
);

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
| `rigour_record_failure` | Record a failure for retry loop detection |
| `rigour_clear_failure` | Clear failure history after resolution |

See [MCP Server](/mcp/mcp-server) for detailed tool documentation.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | Server port |
| `RIGOUR_MCP_TOKEN` | No | — | Bearer token for authentication |

## Architecture

| Component | Technology |
|-----------|------------|
| **Framework** | Next.js (App Router) |
| **Transport** | Standard SSE + HTTP POST |
| **Protocol** | MCP v2024-11-05+ |
| **Deployment** | Vercel (Native) |

## Troubleshooting

### "Unauthorized" Error

Ensure your `Authorization` header matches the `RIGOUR_MCP_TOKEN` set on the server:

```bash
curl -X POST https://your-server.vercel.app/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### Timeout Errors

Serverless platforms have execution limits (e.g., Vercel: 60s). For long-running checks:

1. Optimize your quality gates configuration
2. Deploy to a platform with longer timeouts (Cloud Run, Fly.io)
3. Split large checks into smaller batches

### "rigour.yml not found"

The remote server requires a `rigour.yml` file in the project directory:

1. Initialize the project: `rigour init`
2. Ensure the `cwd` path is absolute and correct
3. Verify the server has filesystem access to the project

## Security Best Practices

1. **Always use HTTPS** in production
2. **Set `RIGOUR_MCP_TOKEN`** for public deployments
3. **Rotate tokens** periodically (monthly recommended)
4. **Use environment variables** — never commit tokens to git
5. **Monitor access logs** for suspicious activity
6. **Rate limit** using platform features (Vercel/Cloudflare)

## Next Steps

- [Configure Quality Gates](/concepts/ast-gates)
- [Understand Fix Packets](/concepts/fix-packet)
- [Explore CLI Commands](/cli/commands)
