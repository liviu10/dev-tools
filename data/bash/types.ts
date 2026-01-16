export interface BashCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'File & Directory Commands' | 'Text Processing' | 'System & Process Management' | 'Permissions' | 'Networking' | 'Shell Scripting Basics' | 'Shortcuts & History' | 'Archive & Compression';
}
