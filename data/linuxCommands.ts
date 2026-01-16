import type { CommandInfo, CommandOption } from './commands/types';
import { archiveCommands } from './commands/archives';
import { docsCommands } from './commands/docs';
import { fileSystemCommands } from './commands/fileSystem';
import { networkingCommands } from './commands/networking';
import { packageManagementCommands } from './commands/packageManagement';
import { permissionCommands } from './commands/permissions';
import { systemCommands } from './commands/system';
import { textProcessingCommands } from './commands/textProcessing';
import { usersAndGroupsCommands } from './commands/usersAndGroups';
import { environmentCommands } from './commands/environment';

// Re-export types for convenience if needed elsewhere
export type { CommandInfo, CommandOption };

export const COMMAND_DATA: { [key: string]: CommandInfo } = {
  ...fileSystemCommands,
  ...textProcessingCommands,
  ...systemCommands,
  ...permissionCommands,
  ...networkingCommands,
  ...archiveCommands,
  ...packageManagementCommands,
  ...docsCommands,
  ...usersAndGroupsCommands,
  ...environmentCommands,
};