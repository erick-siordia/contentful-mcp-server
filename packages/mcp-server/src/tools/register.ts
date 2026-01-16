import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ContentfulMcpTools } from '@contentful/mcp-tools';
import { env } from '../config/env.js';
import { getVersion } from '../getVersion.js';

/**
 * Registers all Contentful MCP tools with the server.
 * Each tool is registered with its title, description, input schema, annotations, and implementation.
 */
export function registerAllTools(server: McpServer): void {
  if (!env.success || !env.data) {
    throw new Error('Environment variables are not properly configured');
  }

  // Initialize tools with configuration from environment variables
  const tools = new ContentfulMcpTools({
    accessToken: env.data.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
    host: env.data.CONTENTFUL_HOST,
    spaceId: env.data.SPACE_ID,
    environmentId: env.data.ENVIRONMENT_ID,
    organizationId: env.data.ORGANIZATION_ID,
    appId: env.data.APP_ID,
    mcpVersion: getVersion(),
  });

  // Get tool collections
  const assetTools = tools.getAssetTools();
  const contentTypeTools = tools.getContentTypeTools();
  const contextTools = tools.getContextTools();
  const entryTools = tools.getEntryTools();
  const environmentTools = tools.getEnvironmentTools();
  const localeTools = tools.getLocaleTools();
  const spaceTools = tools.getSpaceTools();
  const tagTools = tools.getTagTools();

  // Combine standard tool collections
  const allToolCollections = [
    assetTools,
    contentTypeTools,
    contextTools,
    entryTools,
    environmentTools,
    localeTools,
    spaceTools,
    tagTools,
  ];

  // Register each tool from standard collections
  allToolCollections.forEach((toolCollection) => {
    Object.values(toolCollection).forEach((tool) => {
      server.registerTool(
        tool.title,
        {
          description: tool.description,
          inputSchema: tool.inputParams,
          annotations: tool.annotations,
        },
        tool.tool,
      );
    });
  });
}
