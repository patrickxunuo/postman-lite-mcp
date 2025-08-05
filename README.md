# Postman Lite MCP

A lightweight Model Context Protocol (MCP) server for Postman API integration. This server enables AI assistants like Claude to interact with the Postman API to manage collections, folders, requests, and responses.

## 🚦 Getting Started

### ⚙️ Prerequisites

- Node.js v16+ 
- npm
- A Postman API key (get one from [Postman Account Settings](https://www.postman.com/settings/me/api-keys))

### 📥 Installation

#### Via npm (recommended)

```bash
npm install -g postman-lite-mcp
```

#### From source

```bash
git clone <repository-url>
cd postman-mcp
npm install
npm run build
```

## 🚀 Usage

### With Claude Desktop

#### Option 1: Using npx (simplest)

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "postman": {
      "command": "npx",
      "args": ["postman-lite-mcp", "--apikey=YOUR-POSTMAN-API-KEY"]
    }
  }
}
```

#### Option 2: Using Claude MCP CLI

```bash
claude mcp add postman-lite-mcp --apikey=YOUR-POSTMAN-API-KEY
```

#### Option 3: Global installation

After installing globally with npm:

```json
{
  "mcpServers": {
    "postman": {
      "command": "postman-lite-mcp",
      "args": ["--apikey=YOUR-POSTMAN-API-KEY"]
    }
  }
}
```

### Configuration

The server requires a Postman API key which can be provided:

1. As a command-line argument: `--apikey=YOUR-KEY`
2. As an environment variable: `POSTMAN_PUBLIC_WORKSPACE_API_KEY`
3. Per-tool basis: Each tool has an optional `apiKey` parameter that can be set individually

## 🛠️ Available Tools

The server provides the following tools for interacting with the Postman API:

### Workspace Management
- `get_all_workspaces` - Get all workspaces accessible to the user
  - Parameters: `type?`, `include?`, `apiKey?`
- `get_a_workspace` - Get information about a specific workspace
  - Parameters: `workspaceId`, `apiKey?`

### Collection Management
- `get_collection` - Retrieve information about a collection
  - Parameters: `collectionId`, `access_key?`, `model?`, `apiKey?`
- `get_a_folder` - Get details about a specific folder
  - Parameters: `collectionId`, `folderId`, `ids?`, `uid?`, `populate?`, `apiKey?`

### Request Management  
- `get_a_request` - Retrieve request details
  - Parameters: `collectionId`, `requestId`, `ids?`, `uid?`, `populate?`, `apiKey?`
- `create_a_request` - Create a new request with full configuration
  - Parameters: `collectionId`, `name`, `url`, `method?`, `description?`, `headers?`, and more
- `update_a_request` - Update existing request
  - Parameters: `collectionId`, `requestId`, plus any fields to update
- `delete_a_request` - Delete a request
  - Parameters: `collectionId`, `requestId`, `apiKey?`

### Docker Deployment

```bash
docker build -t postman-lite-mcp .
docker run -i --rm -e POSTMAN_PUBLIC_WORKSPACE_API_KEY=YOUR-KEY postman-lite-mcp
```

For Claude Desktop:

```json
{
  "mcpServers": {
    "postman": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "POSTMAN_PUBLIC_WORKSPACE_API_KEY=YOUR-KEY", "postman-lite-mcp"]
    }
  }
}
```

## 📋 List Available Tools

```bash
# If installed globally
postman-lite-mcp tools

# From source
node dist/cli.js tools
```

## 🔧 Development

```bash
# Clone the repository
git clone <repository-url>
cd postman-mcp

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run locally
node dist/index.js --apikey=YOUR-KEY
```

## 📝 License

MIT
