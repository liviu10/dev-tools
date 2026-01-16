import type { CommandInfo } from './types';

// Helper function to create an argument handler for package managers
const createPackageManagerHandler = (subCommands: { [key: string]: string }) => {
    return (args: string[]): { part: string; explanation: string }[] => {
        const explanations: { part: string; explanation: string }[] = [];
        if (args.length === 0) return explanations;

        const subCommand = args[0];
        if (subCommands[subCommand]) {
            explanations.push({
                part: subCommand,
                explanation: subCommands[subCommand]
            });
        } else {
            explanations.push({
                part: subCommand,
                explanation: 'A sub-command or package name.'
            });
        }

        if (args.length > 1) {
            args.slice(1).forEach(arg => {
                explanations.push({
                    part: arg,
                    explanation: `The name of a package to be managed.`
                });
            });
        }
        return explanations;
    };
};

const dnfSubCommands = {
    'install': 'Installs one or more packages from the repositories.',
    'remove': 'Removes one or more packages from the system.',
    'update': 'Updates specified packages to the latest available version.',
    'upgrade': 'Upgrades all packages on the system to the latest versions.',
    'search': 'Searches package metadata for the given keywords.',
    'info': 'Displays detailed information about a package.',
    'autoremove': 'Removes all "leaf" packages that were originally installed as dependencies of user-installed packages but are no longer required.',
    'history': 'Displays or uses the transaction history.'
};

const yumSubCommands = {
    'install': 'Installs one or more packages.',
    'remove': 'Removes one or more packages.',
    'update': 'Updates specified packages to the latest available version.',
    'upgrade': 'Upgrades all packages on the system.',
    'search': 'Searches package metadata for keywords.',
    'info': 'Displays detailed information about a package.',
    'autoremove': 'Removes packages installed as dependencies that are no longer needed.',
    'history': 'Displays or uses the transaction history.'
};

const aptGetSubCommands = {
    'install': 'Installs one or more packages.',
    'remove': 'Removes one or more packages.',
    'purge': 'Removes packages and their configuration files.',
    'update': 'Resynchronizes the package index files from their sources.',
    'upgrade': 'Installs the newest versions of all packages currently installed on the system without removing any.',
    'dist-upgrade': 'In addition to upgrading, this also intelligently handles changing dependencies with new versions of packages.',
    'autoremove': 'Removes packages that were automatically installed to satisfy dependencies and are now no longer needed.',
};

const aptSubCommands = {
    'install': 'Installs one or more packages.',
    'remove': 'Removes one or more packages.',
    'purge': 'Removes packages and their configuration files.',
    'update': 'Resynchronizes the package index files from their sources.',
    'upgrade': 'Installs the newest versions of all packages currently installed on the system.',
    'full-upgrade': 'Performs the function of `upgrade` but may also remove installed packages if that is required to upgrade the system as a whole.',
    'autoremove': 'Removes packages that were automatically installed to satisfy dependencies and are now no longer needed.',
    'search': 'Searches for the given term and lists matching packages.',
    'show': 'Shows detailed information about a package.',
    'list': 'Lists packages based on package names.',
    'download': 'Downloads the .deb file for a given package.',
};

const aptHandler = (args: string[]): { part: string; explanation: string }[] => {
    const explanations: { part: string; explanation: string }[] = [];
    if (args.length === 0) return explanations;

    const subCommand = args[0];
    
    if (subCommand === 'get') {
        explanations.push({
            part: 'get',
            explanation: "Invalid subcommand for 'apt'. The 'get' action is part of the legacy 'apt-get' command. To install packages with `apt`, use 'install'. To download them, use 'download'."
        });
    } else if (aptSubCommands[subCommand]) {
        explanations.push({
            part: subCommand,
            explanation: aptSubCommands[subCommand]
        });
    } else {
        explanations.push({
            part: subCommand,
            explanation: 'A sub-command or package name.'
        });
    }

    if (args.length > 1) {
        args.slice(1).forEach(arg => {
            explanations.push({
                part: arg,
                explanation: `The name of a package to be managed.`
            });
        });
    }
    return explanations;
};

export const packageManagementCommands: { [key: string]: CommandInfo } = {
    dnf: {
        description: 'The package manager for Fedora, CentOS, and other RPM-based distributions.',
        options: {},
        handleArguments: createPackageManagerHandler(dnfSubCommands)
    },
    yum: {
        description: '(LEGACY) The package manager for older RPM-based systems like CentOS 6/7. `dnf` is the modern replacement on systems like Fedora and CentOS 8+.',
        options: {},
        handleArguments: createPackageManagerHandler(yumSubCommands)
    },
    apt: {
        description: 'The command-line tool for handling packages on Debian-based systems like Ubuntu.',
        options: {},
        handleArguments: aptHandler
    },
    'apt-get': {
        description: 'The traditional command-line tool for handling packages on Debian-based systems (often used in scripts).',
        options: {},
        handleArguments: createPackageManagerHandler(aptGetSubCommands)
    },
};
