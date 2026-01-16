import type { BashCheatSheetItem } from './bash/types';
import { fileAndDirectoryCommands } from './bash/fileAndDirectory';
import { textProcessingCommands } from './bash/textProcessing';
import { systemAndProcessCommands } from './bash/systemAndProcess';
import { permissionsCommands } from './bash/permissions';
import { networkingCommands } from './bash/networking';
import { scriptingCommands } from './bash/scripting';
import { archiveAndCompressionCommands } from './bash/archiveAndCompression';
import { shortcutsAndHistoryCommands } from './bash/shortcutsAndHistory';

// Re-export type for convenience
export type { BashCheatSheetItem };

export const bashData: BashCheatSheetItem[] = [
  ...fileAndDirectoryCommands,
  ...textProcessingCommands,
  ...systemAndProcessCommands,
  ...permissionsCommands,
  ...networkingCommands,
  ...scriptingCommands,
  ...archiveAndCompressionCommands,
  ...shortcutsAndHistoryCommands,
];
