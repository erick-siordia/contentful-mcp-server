# @contentful/mcp-tools

A toolkit package containing reusable MCP (Model Context Protocol) tools for Contentful. This package provides structured tool collections with complete metadata including descriptions, input schemas, semantic annotations, and tool implementations.

## Installation

```bash
npm install @contentful/mcp-tools
```

## Usage

### Using Tool Collections

The package exports tool collections organized by category. Each tool in a collection includes:

- `title`: The tool name
- `description`: What the tool does
- `inputParams`: Zod schema for input validation
- `annotations`: Semantic hints about tool behavior (readOnly, destructive, idempotent, openWorld)
- `tool`: The actual tool implementation function

```typescript
import { entryTools, assetTools, contextTools } from '@contentful/mcp-tools';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const server = new McpServer();

// Register a specific tool
const { searchEntries } = entryTools;
server.registerTool(
  searchEntries.title,
  {
    description: searchEntries.description,
    inputSchema: searchEntries.inputParams,
    annotations: searchEntries.annotations,
  },
  searchEntries.tool,
);

// Register all tools from a collection
Object.values(assetTools).forEach((toolConfig) => {
  server.registerTool(
    toolConfig.title,
    {
      description: toolConfig.description,
      inputSchema: toolConfig.inputParams,
      annotations: toolConfig.annotations,
    },
    toolConfig.tool,
  );
});
```

### Available Tool Collections

```typescript
import {
  assetTools, // Asset operations
  contentTypeTools, // Content type management
  contextTools, // Initial context setup
  entryTools, // Entry operations
  environmentTools, // Environment management
  localeTools, // Locale management
  spaceTools, // Space operations
  tagTools, // Tag management
} from '@contentful/mcp-tools';
```

### Tool Annotations

Each tool includes semantic annotations to help MCP clients understand tool behavior:

- **`readOnlyHint`**: `true` if the tool only reads data without modifications
- **`destructiveHint`**: `true` if the tool permanently deletes or removes data
- **`idempotentHint`**: `true` if calling the tool multiple times with the same input produces the same result
- **`openWorldHint`**: `true` if the tool interacts with external services or systems beyond Contentful

## 🛠️ Available Tools

| Category                  | Tool Name                          | Description                                      |
| ------------------------- | ---------------------------------- | ------------------------------------------------ |
| **Context & Setup**       | `get_initial_context`              | Initialize connection and get usage instructions |
| **Content Types**         | `list_content_types`               | List content types (max 10 per request)          |
|                           | `get_content_type`                 | Get detailed content type information            |
|                           | `create_content_type`              | Create new content types                         |
|                           | `update_content_type`              | Modify existing content types                    |
| **Entries**               | `search_entries`                   | Search and filter entries in your space          |
|                           | `get_entry`                        | Retrieve specific entries                        |
|                           | `create_entry`                     | Create new content entries with locale support   |
|                           | `update_entry`                     | Modify existing entries with locale support      |
|                           | `publish_entry`                    | Publish entries (single or bulk up to 100)       |
|                           | `archive_entry`                    | Archive entries (single or bulk up to 100)       |
|                           | `unarchive_entry`                  | Unarchive entries (single or bulk up to 100)     |
| **Assets**                | `upload_asset`                     | Upload new assets                                |
|                           | `list_assets`                      | List and browse assets (max 3 per request)       |
|                           | `get_asset`                        | Retrieve specific assets                         |
|                           | `update_asset`                     | Modify asset metadata                            |
|                           | `publish_asset`                    | Publish assets (single or bulk up to 100)        |
|                           | `archive_asset`                    | Archive assets (single or bulk up to 100)        |
|                           | `unarchive_asset`                  | Unarchive assets (single or bulk up to 100)      |
| **Spaces & Environments** | `list_spaces`                      | List available spaces (max 10 per request)       |
|                           | `get_space`                        | Get space details                                |
|                           | `list_environments`                | List environments in a space                     |
| **Locales**               | `list_locales`                     | List all locales in your environment             |
|                           | `get_locale`                       | Retrieve specific locale information             |
|                           | `create_locale`                    | Create new locales for multi-language content    |
|                           | `update_locale`                    | Modify existing locale settings                  |
| **Tags**                  | `list_tags`                        | List all tags in an environment                  |
|                           | `create_tag`                       | Create new tags with public/private visibility   |

## Configuration

The tools require environment variables to be configured:

```bash
CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=your_token_here
CONTENTFUL_HOST=api.contentful.com
SPACE_ID=your_space_id
ENVIRONMENT_ID=master
```

## Testing

All tools include comprehensive unit tests. Run tests with:

```bash
npm test
```

## License

MIT
