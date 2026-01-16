export interface CommandOption {
  description: string;
  long?: string; // e.g., --all for -a
}

export interface CommandInfo {
  description: string;
  options: { [key: string]: CommandOption };
  handleArguments?: (args: string[]) => { part: string; explanation: string }[];
  customParsing?: boolean;
}
