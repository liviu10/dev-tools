export interface FilesystemEntry {
    path: string;
    description: string;
    contains: string[];
    keyInfo: string;
}

export const FILESYSTEM_DATA: FilesystemEntry[] = [
    {
        path: '/',
        description: 'The root directory. This is the top-level of the entire filesystem hierarchy. Every single file and directory on the system is located under this directory.',
        contains: ['/bin', '/etc', '/home', '/var', ... 'all other top-level directories'],
        keyInfo: 'The structure follows the Filesystem Hierarchy Standard (FHS), a convention used by most Linux and Unix-like systems (including Ubuntu, Fedora, and Arch Linux) to ensure compatibility and predictability.'
    },
    {
        path: '/bin',
        description: 'Stands for "binaries". Contains essential user command binaries that are required for the system to boot into single-user mode and for basic system repair.',
        contains: ['ls', 'cp', 'mv', 'cat', 'bash', 'echo'],
        keyInfo: 'These are fundamental commands available to all users. On many modern systems (like Fedora and Arch), /bin is a symbolic link to /usr/bin to consolidate binaries into one location.'
    },
    {
        path: '/boot',
        description: 'Contains static files required for the boot process. This includes the Linux kernel, the initial RAM disk (initrd), and bootloader configuration files.',
        contains: ['vmlinuz (the Linux kernel)', 'initrd.img (initial RAM disk)', 'grub/ (GRUB bootloader files)'],
        keyInfo: 'This directory is critical for the system to start. Damaging files here can render a system unbootable. It is often placed on its own small partition at the beginning of the disk.'
    },
    {
        path: '/dev',
        description: 'Stands for "device files". Following the Unix philosophy that "everything is a file", Linux exposes hardware devices as special files in this directory.',
        contains: ['/dev/sda (first hard disk)', '/dev/tty1 (first terminal)', '/dev/null (a black hole)', '/dev/random (entropy source)'],
        keyInfo: 'This is a virtual filesystem (`devtmpfs`) populated by the kernel and managed by the `udev` system. The files are created at boot and represent the state of the system\'s hardware.'
    },
    {
        path: '/etc',
        description: 'Contains host-specific system-wide configuration files. The name is a legacy from "et cetera". These files configure the system\'s behavior for all users.',
        contains: ['/etc/passwd (user database)', '/etc/fstab (filesystem table)', '/etc/ssh/sshd_config (SSH server config)'],
        keyInfo: 'This directory should only contain configuration files, not binaries. Backing up /etc is a common way to save a system\'s configuration.'
    },
    {
        path: '/home',
        description: 'User home directories. Each user is given a subdirectory here for their personal files, application settings (dotfiles), and documents.',
        contains: ['/home/username', '/home/anotheruser'],
        keyInfo: 'Separating user data from system data makes system upgrades and backups much easier. It is very common to place /home on its own partition.'
    },
    {
        path: '/lib',
        description: 'Stands for "libraries". Contains essential shared libraries and kernel modules needed to boot the system and run the commands in /bin and /sbin.',
        contains: ['libc.so.6', 'ld-linux.so.2', 'modules/'],
        keyInfo: 'Like /bin, this directory is often a symbolic link to its counterpart in /usr (i.e., /usr/lib) on modern distributions to centralize shared libraries.'
    },
    {
        path: '/media',
        description: 'Provides mount points for removable media like USB drives, CD-ROMs, and external hard drives. These are typically mounted automatically by the system.',
        contains: ['/media/usb_drive', '/media/cdrom', '/media/user/portable_hdd'],
        keyInfo: 'This directory is intended for system-managed, automatic mounts. For manual, temporary mounts by an administrator, use /mnt.'
    },
    {
        path: '/mnt',
        description: 'Stands for "mount". This is a generic mount point where system administrators can manually mount filesystems temporarily (e.g., a network share).',
        contains: ['(empty by default)'],
        keyInfo: 'This is a placeholder for manual mounts. It is a convenient location to temporarily attach a storage device or network filesystem for maintenance or data transfer.'
    },
    {
        path: '/opt',
        description: 'Stands for "optional". Reserved for add-on software packages from third-party vendors that are not part of the standard system installation.',
        contains: ['/opt/google/chrome', '/opt/slack', '/opt/some_proprietary_app'],
        keyInfo: 'This directory is useful for installing self-contained applications. Software installed here usually keeps all its files in a single subdirectory, like /opt/AppName.'
    },
    {
        path: '/proc',
        description: 'A virtual filesystem that provides an interface to kernel data structures. It is used to get information about system processes and hardware on the fly.',
        contains: ['/proc/cpuinfo', '/proc/meminfo', '/proc/[pid] (directories for each running process)'],
        keyInfo: 'This is not a real filesystem; it resides in memory. The files are generated dynamically by the kernel when you try to access them. It provides a real-time window into the kernel.'
    },
    {
        path: '/root',
        description: 'The home directory for the root user (also known as the superuser or administrator).',
        contains: ['(root user\'s personal files, scripts, and configuration)'],
        keyInfo: 'It is not located under /home to ensure the root user can still log in for system maintenance even if the /home partition is unavailable.'
    },
    {
        path: '/run',
        description: 'A temporary filesystem (tmpfs) for applications to store runtime data like sockets, process IDs (PID files), and lock files. This data is volatile and cleared on reboot.',
        contains: ['/run/lock', '/run/user/[uid]', '/run/sshd.pid'],
        keyInfo: 'This is a relatively modern addition to the FHS, consolidating runtime data that was previously scattered in places like /var/run and /var/lock.'
    },
    {
        path: '/sbin',
        description: 'Stands for "system binaries". Contains essential system administration binaries, typically used for system maintenance and management tasks.',
        contains: ['fdisk', 'ifconfig', 'reboot', 'iptables', 'mkfs'],
        keyInfo: 'These commands are intended for the root user. Like /bin, /sbin is often a symbolic link to /usr/sbin on modern Linux systems.'
    },
    {
        path: '/srv',
        description: 'Stands for "service". This directory holds site-specific data which is served by this system for particular services (e.g., web or FTP).',
        contains: ['/srv/http (for a web server)', '/srv/ftp (for an FTP server)'],
        keyInfo: 'The idea is to separate service data from user and system configuration. However, its usage is not consistently enforced, and many applications store their data in /var instead.'
    },
    {
        path: '/sys',
        description: 'A virtual filesystem (sysfs) that provides a view of, and interface to, the system\'s hardware devices as they are seen by the kernel.',
        contains: ['/sys/class/net (network devices)', '/sys/bus/pci (PCI bus devices)'],
        keyInfo: 'Like /proc, this resides in memory. It provides a more structured view of hardware than /proc, organized by buses, classes, and devices. It can be used to tweak kernel parameters.'
    },
    {
        path: '/tmp',
        description: 'A directory for temporary files. Any user can write to this directory. Files are typically deleted upon system reboot or on a regular schedule.',
        contains: ['(temporary files created by applications and users)'],
        keyInfo: 'Do not store anything important here. It is often mounted as a `tmpfs` (in RAM) for performance. The "sticky bit" permission is usually set on /tmp, meaning only the owner of a file can delete it.'
    },
    {
        path: '/usr',
        description: 'Stands for "Unix System Resources". This is one of the largest directories, containing the majority of user-land programs, libraries, and read-only data for all users.',
        contains: ['/usr/bin', '/usr/lib', '/usr/share', '/usr/local'],
        keyInfo: 'This directory contains the bulk of the operating system\'s software. It is meant to be shareable and read-only; system-specific configuration should be in /etc.'
    },
    {
        path: '/var',
        description: 'Stands for "variable". This directory contains files whose content is expected to grow during the normal operation of the system, such as logs, caches, and spools.',
        contains: ['/var/log', '/var/cache', '/var/spool', '/var/www', '/var/lib'],
        keyInfo: 'Because its size can be unpredictable, /var is often placed on its own partition to prevent a runaway log file from filling up the root filesystem.'
    }
];