# 🔖 Bookmark Manager MCP

> A Model Context Protocol (MCP) server for managing bookmarks with persistent storage

[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-mindriftfall2infinitepiio%2Fmcp-blue?logo=docker)](https://hub.docker.com/r/mindriftfall2infinitepiio/bookmark-manager-mcp)
[![GitHub](https://img.shields.io/badge/GitHub-infinitepi--io%2Fbookmark--manager--mcp-black?logo=github)](https://github.com/infinitepi-io/bookmark-manager-mcp)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.13.2-green?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTQgOEwxMiAxNEwxMCA4TDEyIDJaIiBmaWxsPSIjMDBkOGZmIi8+CjwvZXZnPgo=)](https://modelcontextprotocol.io)

## 📋 Overview

This MCP server provides a simple yet powerful bookmark management system that integrates seamlessly with Claude and other MCP-compatible clients. It offers persistent storage, categorization, and easy retrieval of your bookmarks.

## ✨ Features

- **📁 Persistent Storage**: Bookmarks are saved to `~/.data/bookmarks.json`
- **🏷️ Categories**: Organize bookmarks with custom categories
- **🔍 Resource Discovery**: Browse bookmarks by category using MCP resources
- **🐳 Docker Support**: Ready-to-use Docker image
- **⚡ TypeScript**: Type-safe implementation with Zod validation
- **🔗 MCP Integration**: Full Model Context Protocol compliance

## 🛠️ Installation

## 🔧 Claude Code Integration

```bash
# Add to Claude Code
docker pull mindriftfall2infinitepiio/bookmark-manager-mcp:latest
claude mcp add bookmark-manager -- docker run \
    --rm \
    --interactive \
    --volume ~/.data:/app/.data \
    mindriftfall2infinitepiio/bookmark-manager-mcp:latest
```

## 🔧 VS Code Integration

- ```
  docker pull mindriftfall2infinitepiio/bookmark-manager-mcp:latest
  ```
- Create `.vscode/mcp.json`

```json
{
  "servers": {
    "bookmark-manager": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "--interactive",
        "--volume",
        "~/.data:/app/.data",
        "mindriftfall2infinitepiio/bookmark-manager-mcp:latest"
      ]
    }
  }
}
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/infinitepi-io/bookmark-manager-mcp.git
cd bookmark-manager-mcp

# Install dependencies
pnpm install

# Development mode
pnpm run dev

# Build for production
pnpm run build
pnpm start
```

## 🚀 Usage

### GitHub Copilot (VS Code)

Agent Mode + Natural Language or `#` prefix

```
Add bookmark for GitHub at https://github.com category development

#add bookmark: title "GitHub", url "https://github.com"

#list all my bookmarks in development category
```

### Claude Code (CLI)

**Usage:** `@` prefix

```bash
claude @bookmark-manager add bookmark for GitHub at https://github.com

claude @bookmark-manager search development bookmarks

claude @bookmark-manager list all bookmarks
```

### MCP Resources Available

- `bookmarks://all` - All bookmarks
- `bookmarks://mcp` - MCP-related bookmarks
- `bookmarks://general` - General bookmarks
- `bookmarks://{category}` - Custom category bookmarks

### Example Usage with Claude

```
Add a bookmark for "OpenAI Documentation" with URL "https://docs.openai.com" in category "ai"

List all my bookmarks

Show me all MCP-related bookmarks
```

## 💾 Data Storage

### Storage Location

- **Local**: `~/.data/bookmarks.json`
- **Docker**: `/app/.data/bookmarks.json` (mount your local `~/.data` directory)

### Data Format

```json
[
  {
    "title": "Model Context Protocol",
    "url": "https://modelcontextprotocol.io/introduction",
    "category": "mcp"
  },
  {
    "title": "infinitepi-io",
    "url": "https://github.com/infinitepi-io",
    "category": "general"
  }
]
```

### Data Persistence

- **Automatic Creation**: If no bookmarks file exists, default bookmarks are created
- **Error Handling**: Graceful error handling for file operations
- **Backup Strategy**: Simple JSON format allows easy backup and restoration

## 🐳 Docker Configuration

### Image Details

- **Base Image**: `node:22-alpine`
- **Size**: Optimized for minimal footprint
- **Volumes**: `/app/.data` for persistent storage

## 📊 Technical Details

### Dependencies

- **@modelcontextprotocol/sdk**: ^1.13.2
- **zod**: ^3.25.67 (Schema validation)
- **Node.js**: 22+
- **TypeScript**: 5.0+

### Build Process

```bash
# TypeScript compilation with esbuild
esbuild index.ts --bundle --platform=node --target=node22 --format=esm --outfile=dist/index.js
```

### Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MCP Client    │◄──►│  MCP Server     │◄──►│  JSON Storage   │
│   (Claude)      │    │  (This App)     │    │  (~/.data/)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Synching your bookmark to S3 or vice versa BYOS3(Bring your own s3 on aws)

- Use below function to copy the data from local to s3 or s3 to local:
  - [bookmark_sync_to_local_tos3](https://github.com/infinitepi-io/bookmark-manager-mcp/blob/main/.dev/bookmark_sync_to_local_tos3)
  - [bookmark_sync_to_s3_to_local](https://github.com/infinitepi-io/bookmark-manager-mcp/blob/main/.dev/bookmark_sync_to_s3_to_local)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0.

## 👤 Author

**Satish Tripathi**

- GitHub: [@infinitepi-io](https://github.com/infinitepi-io)
- Blog: https://dev.to/mindriftfall2infinitepiio/building-a-bookmark-manager-with-ai-integration-my-journey-with-model-context-protocol-2j32

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/infinitepi-io/bookmark-manager-mcp/issues)
- **Documentation**: [MCP Documentation](https://modelcontextprotocol.io/introduction)
- **Docker Hub**: [mindriftfall2infinitepiio/mcp](https://hub.docker.com/r/mindriftfall2infinitepiio/bookmark-manager-mcp)

---
