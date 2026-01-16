import {
  getContentTypeTool,
  GetContentTypeToolParams,
} from './getContentType.js';
import {
  listContentTypesTool,
  ListContentTypesToolParams,
} from './listContentTypes.js';
import {
  createContentTypeTool,
  CreateContentTypeToolParams,
} from './createContentType.js';
import {
  updateContentTypeTool,
  UpdateContentTypeToolParams,
} from './updateContentType.js';
import type { ContentfulConfig } from '../../config/types.js';

export function createContentTypeTools(config: ContentfulConfig) {
  const getContentType = getContentTypeTool(config);
  const listContentTypes = listContentTypesTool(config);
  const createContentType = createContentTypeTool(config);
  const updateContentType = updateContentTypeTool(config);

  return {
    getContentType: {
      title: 'get_content_type',
      description: 'Get details about a specific Contentful content type',
      inputParams: GetContentTypeToolParams.shape,
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
      },
      tool: getContentType,
    },
    listContentTypes: {
      title: 'list_content_types',
      description:
        'List content types in a space. Returns a maximum of 10 items per request. Use skip parameter to paginate through results.',
      inputParams: ListContentTypesToolParams.shape,
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
      },
      tool: listContentTypes,
    },
    createContentType: {
      title: 'create_content_type',
      description: 'Create a new content type',
      inputParams: CreateContentTypeToolParams.shape,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
      tool: createContentType,
    },
    updateContentType: {
      title: 'update_content_type',
      description:
        'Update an existing content type. The handler will merge your field updates with existing content type data, so you only need to provide the fields and properties you want to change.',
      inputParams: UpdateContentTypeToolParams.shape,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
      tool: updateContentType,
    },
  };
}
