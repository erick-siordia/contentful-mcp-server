import {
  listEnvironmentsTool,
  ListEnvironmentsToolParams,
} from './listEnvironments.js';
import type { ContentfulConfig } from '../../config/types.js';

export function createEnvironmentTools(config: ContentfulConfig) {
  const listEnvironments = listEnvironmentsTool(config);

  return {
    listEnvironments: {
      title: 'list_environments',
      description: 'List all environments in a space',
      inputParams: ListEnvironmentsToolParams.shape,
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
      },
      tool: listEnvironments,
    },
  };
}
