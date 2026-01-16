export interface PowerShellCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Core Cmdlets' | 'Object Manipulation' | 'File System' | 'Process & Service Management' | 'Networking' | 'Scripting Basics' | 'System Information';
}

export const powershellData: PowerShellCheatSheetItem[] = [
  // Core Cmdlets
  {
    name: 'Get-Help',
    description: 'Displays information about PowerShell concepts and commands, including cmdlets, functions, providers, and scripts.',
    example: '# Get help for a specific command\nGet-Help Get-Process\n\n# Show detailed help with examples\nGet-Help Get-Process -Detailed\nGet-Help Get-Process -Examples',
    category: 'Core Cmdlets',
  },
  {
    name: 'Get-Command',
    description: 'Gets all commands that are installed on the computer, including cmdlets, aliases, functions, and applications.',
    example: '# Find commands with "process" in the name\nGet-Command -Noun Process\n\n# Find commands that work with services\nGet-Command -Verb Get -Noun Service',
    category: 'Core Cmdlets',
  },
  {
    name: 'Get-Member',
    description: 'Gets the properties and methods of objects. A key tool for discovering what you can do with an object.',
    example: '# See what properties and methods a process object has\nGet-Process | Get-Member',
    category: 'Core Cmdlets',
  },
  {
    name: 'Get-Alias',
    description: 'Gets the aliases for the current session. Common aliases include `ls` (for `Get-ChildItem`), `cd` (for `Set-Location`), and `cat` (for `Get-Content`).',
    example: '# Get all aliases\nGet-Alias\n\n# Find the command for a specific alias\nGet-Alias -Name ls',
    category: 'Core Cmdlets',
  },
  {
    name: 'Write-Output',
    description: 'Writes objects to the pipeline (standard output). This is the primary way to return data from a script or function. Alias: `echo`.',
    example: 'Write-Output "This message goes to the pipeline."',
    category: 'Core Cmdlets',
  },
  {
    name: 'Read-Host',
    description: 'Reads a line of input from the console.',
    example: '$name = Read-Host -Prompt "Enter your name"\nWrite-Host "Hello, $name"',
    category: 'Core Cmdlets',
  },
  
  // Object Manipulation
  {
    name: 'Select-Object',
    description: 'Selects specified properties of an object or set of objects. It can also be used to select a specified number of objects from the beginning or end of an array.',
    example: '# Select specific properties from process objects\nGet-Process | Select-Object -Property ProcessName, Id\n\n# Select the first 5 processes\nGet-Process | Select-Object -First 5',
    category: 'Object Manipulation',
  },
  {
    name: 'Where-Object',
    description: 'Filters objects from a collection based on their property values. The `?` is a common alias.',
    example: '# Get processes with a working set size greater than 100MB\nGet-Process | Where-Object { $_.WS -gt 100MB }',
    category: 'Object Manipulation',
  },
  {
    name: 'Sort-Object',
    description: 'Sorts objects by property values. Use `-Descending` to sort in reverse order.',
    example: '# Sort processes by CPU usage, highest first\nGet-Process | Sort-Object -Property CPU -Descending',
    category: 'Object Manipulation',
  },
  {
    name: 'ForEach-Object',
    description: 'Performs an operation against each object in a collection. The `%` is a common alias.',
    example: '# Stop all processes named "notepad"\nGet-Process -Name notepad | ForEach-Object { $_.Kill() }',
    category: 'Object Manipulation',
  },
  {
    name: 'Measure-Object',
    description: 'Calculates the numeric properties of objects, such as the sum, average, minimum, and maximum values.',
    example: '# Get stats on the working set size of all processes\nGet-Process | Measure-Object -Property WS -Sum -Average -Max',
    category: 'Object Manipulation',
  },
    {
    name: 'Group-Object',
    description: 'Groups objects that contain the same value for a specified property.',
    example: '# Group running processes by their company name\nGet-Process | Group-Object -Property Company',
    category: 'Object Manipulation',
  },
  {
    name: 'ConvertTo-Json / ConvertFrom-Json',
    description: 'Converts an object to a JSON string or a JSON string to a custom PowerShell object.',
    example: '$process = Get-Process -Id $pid | Select-Object Name, Id\n$json = $process | ConvertTo-Json\n\n$json | ConvertFrom-Json',
    category: 'Object Manipulation',
  },
  {
    name: 'ConvertTo-Csv / ConvertFrom-Csv',
    description: 'Converts objects into a series of comma-separated value (CSV) strings and vice versa.',
    example: '# Export process information to a CSV file\nGet-Process | ConvertTo-Csv -NoTypeInformation | Set-Content processes.csv',
    category: 'Object Manipulation',
  },
  
  // File System
  {
    name: 'Get-ChildItem',
    description: 'Gets the items in one or more specified locations (drives, directories). Aliases: `ls`, `dir`, `gci`.',
    example: '# List contents of the current directory\nGet-ChildItem\n\n# List all .txt files in a directory recursively\nGet-ChildItem -Path C:\\Users\\ -Filter *.txt -Recurse -ErrorAction SilentlyContinue',
    category: 'File System',
  },
  {
    name: 'Set-Location',
    description: 'Sets the current working location to a specified location. Aliases: `cd`, `sl`.',
    example: 'Set-Location -Path C:\\Windows',
    category: 'File System',
  },
  {
    name: 'Get-Location',
    description: 'Gets information about the current working location. Alias: `pwd`.',
    example: 'Get-Location',
    category: 'File System',
  },
  {
    name: 'Get-Content',
    description: 'Gets the content of the item at the specified location, such as the text in a file. Aliases: `cat`, `gc`, `type`.',
    example: '# Read the entire file\nGet-Content -Path C:\\Windows\\System32\\drivers\\etc\\hosts\n\n# Get the first 10 lines of a file\nGet-Content -Path log.txt -TotalCount 10',
    category: 'File System',
  },
  {
    name: 'Set-Content',
    description: 'Writes new content or replaces the content in a file. Alias: `sc`.',
    example: 'Set-Content -Path newfile.txt -Value "Hello, World!"',
    category: 'File System',
  },
    {
    name: 'Add-Content',
    description: 'Appends content to a specified item, such as a file. Alias: `ac`.',
    example: 'Add-Content -Path log.txt -Value "New log entry at $(Get-Date)"',
    category: 'File System',
  },
  {
    name: 'Clear-Content',
    description: 'Deletes the contents of a file, but does not delete the file itself. Alias: `clc`.',
    example: 'Clear-Content -Path C:\\Temp\\log.txt',
    category: 'File System',
  },
  {
    name: 'New-Item',
    description: 'Creates a new item, such as a file or directory. Alias: `ni`.',
    example: '# Create a new directory\nNew-Item -Path C:\\Temp\\NewFolder -ItemType Directory\n\n# Create a new empty file\nNew-Item -Path C:\\Temp\\NewFile.txt -ItemType File',
    category: 'File System',
  },
  {
    name: 'Remove-Item',
    description: 'Deletes the specified items. Aliases: `rm`, `del`, `erase`, `rd`, `ri`.',
    example: '# Remove a file\nRemove-Item -Path C:\\Temp\\OldFile.txt\n\n# Remove a directory and its contents recursively and forcefully\nRemove-Item -Path C:\\Temp\\OldFolder -Recurse -Force',
    category: 'File System',
  },
  {
    name: 'Copy-Item',
    description: 'Copies an item from one location to another. Aliases: `cp`, `copy`, `cpi`.',
    example: '# Copy a file\nCopy-Item -Path C:\\log.txt -Destination C:\\Temp\\log.bak\n\n# Copy a directory recursively\nCopy-Item -Path C:\\Source -Destination C:\\Target -Recurse',
    category: 'File System',
  },
  {
    name: 'Move-Item',
    description: 'Moves an item from one location to another. Aliases: `mv`, `move`, `mi`.',
    example: '# Rename a file\nMove-Item -Path C:\\Temp\\file.txt -Destination C:\\Temp\\new-name.txt',
    category: 'File System',
  },
  {
    name: 'Test-Path',
    description: 'Determines whether all elements of a path exist.',
    example: 'if (Test-Path -Path C:\\Windows) { Write-Host "It exists!" }',
    category: 'File System',
  },

  // Process & Service Management
  {
    name: 'Get-Process',
    description: 'Gets the processes that are running on the local computer. Aliases: `ps`, `gps`.',
    example: '# Get all processes\nGet-Process\n\n# Get a specific process by name\nGet-Process -Name "chrome"',
    category: 'Process & Service Management',
  },
  {
    name: 'Stop-Process',
    description: 'Stops one or more running processes. Aliases: `kill`, `spps`.',
    example: '# Stop a process by name\nStop-Process -Name "notepad"\n\n# Stop a process by ID\nStop-Process -Id 1234',
    category: 'Process & Service Management',
  },
  {
    name: 'Start-Process',
    description: 'Starts one or more processes on the local computer. Alias: `start`.',
    example: '# Start notepad\nStart-Process notepad.exe\n\n# Open a URL in the default browser\nStart-Process "https://www.google.com"',
    category: 'Process & Service Management',
  },
  {
    name: 'Get-Service',
    description: 'Gets the services on a local or remote computer. Alias: `gsv`.',
    example: '# Get all services\nGet-Service\n\n# Get services with a specific name pattern\nGet-Service -Name "wuauserv"',
    category: 'Process & Service Management',
  },
  {
    name: 'Start-Service / Stop-Service / Restart-Service',
    description: 'Starts, stops, or restarts one or more services.',
    example: '# Start the Windows Update service\nStart-Service -Name "wuauserv"\n\n# Restart the print spooler\nRestart-Service -Name "Spooler"',
    category: 'Process & Service Management',
  },

  // Networking
  {
    name: 'Invoke-WebRequest',
    description: 'Gets content from a web page on the Internet. It parses the response and returns collections of forms, links, images, and other significant HTML elements. Alias: `iwr`.',
    example: '# Make a simple GET request\nInvoke-WebRequest -Uri "https://example.com"',
    category: 'Networking',
  },
  {
    name: 'Invoke-RestMethod',
    description: 'Sends an HTTP or HTTPS request to a RESTful web service. It automatically converts the response content to and from JSON or XML.',
    example: '# Make a GET request to a JSON API\n$data = Invoke-RestMethod -Uri "https://api.github.com/users/octocat"\n\n# Make a POST request\nInvoke-RestMethod -Uri "https://api.example.com/data" -Method Post -Body $jsonData -ContentType "application/json"',
    category: 'Networking',
  },
  {
    name: 'Test-Connection',
    description: 'Sends ICMP echo request packets ("pings") to one or more computers. Alias: `ping`.',
    example: '# Ping a remote host 4 times\nTest-Connection -ComputerName "google.com" -Count 4',
    category: 'Networking',
  },
  {
    name: 'Resolve-DnsName',
    description: 'Performs a DNS query for the specified name.',
    example: 'Resolve-DnsName -Name www.google.com',
    category: 'Networking',
  },
  {
    name: 'Get-NetIPAddress',
    description: 'Gets the IP address configuration, including IPv4 and IPv6 addresses and the interfaces with which they are associated.',
    example: 'Get-NetIPAddress',
    category: 'Networking',
  },
  
  // Scripting Basics
  {
    name: 'Variables ($)',
    description: 'Variables store data. They are prefixed with a dollar sign ($) and can hold any type of object.',
    example: '$myString = "Hello"\n$myNumber = 123',
    category: 'Scripting Basics',
  },
  {
    name: 'Arrays (@())',
    description: 'A data structure that is designed to store a collection of items. Array elements can be accessed using an index.',
    example: '$myArray = @("Apple", "Banana", "Cherry")\n# Access an item\n$myArray[0] # "Apple"',
    category: 'Scripting Basics',
  },
  {
    name: 'Hash Tables (@{})',
    description: 'A dictionary-like collection of key-value pairs. Keys are not case-sensitive by default.',
    example: '$myHashTable = @{\n    Name = "John Doe"\n    City = "New York"\n}\n# Access a value\n$myHashTable.Name # "John Doe"',
    category: 'Scripting Basics',
  },
  {
    name: 'Functions',
    description: 'A named block of code that performs an action. Use the `function` keyword to define one.',
    example: 'function Get-Greeting {\n    param($Name)\n    return "Hello, $Name"\n}\n\nGet-Greeting -Name "World"',
    category: 'Scripting Basics',
  },
  {
    name: 'If / ElseIf / Else',
    description: 'Conditional statements used to execute code based on a condition.',
    example: '$num = 10\nif ($num -gt 10) {\n    Write-Host "Greater"\n} elseif ($num -lt 10) {\n    Write-Host "Less"\n} else {\n    Write-Host "Equal"\n}',
    category: 'Scripting Basics',
  },
  {
    name: 'Comparison Operators',
    description: '`-eq` (equal), `-ne` (not equal), `-gt` (greater than), `-ge` (greater or equal), `-lt` (less than), `-le` (less or equal), `-like` (wildcard match), `-contains` (collection contains value).',
    example: 'if ($name -eq "Admin") { ... }',
    category: 'Scripting Basics',
  },
  {
    name: 'Loops (foreach, for, while)',
    description: 'Structures for iterating through a collection or repeating a block of code.',
    example: '# foreach loop\nforeach ($item in $collection) { ... }\n\n# for loop\nfor ($i = 0; $i -lt 5; $i++) { ... }\n\n# while loop\nwhile ($condition) { ... }',
    category: 'Scripting Basics',
  },
  {
    name: 'Try / Catch / Finally',
    description: 'Handles terminating errors (exceptions).',
    example: 'try {\n    # Code that might cause an error\n    $result = 1 / 0\n} catch {\n    Write-Host "An error occurred: $($_.Exception.Message)"\n} finally {\n    Write-Host "Cleanup code runs here."\n}',
    category: 'Scripting Basics',
  },
    {
    name: 'Pipeline (|)',
    description: 'The pipeline operator sends the output (objects) of one command to the input of another command.',
    example: '# Get all running services and sort them by name\nGet-Service | Where-Object { $_.Status -eq "Running" } | Sort-Object -Property DisplayName',
    category: 'Scripting Basics',
  },
  
  // System Information
  {
    name: 'Get-ComputerInfo',
    description: 'Gets a consolidated object of system properties for the local computer.',
    example: 'Get-ComputerInfo',
    category: 'System Information',
  },
  {
    name: 'Get-WmiObject / Get-CimInstance',
    description: '`Get-WmiObject` gets instances of WMI classes. `Get-CimInstance` is the modern, more compliant replacement.',
    example: '# Get BIOS information\nGet-CimInstance -ClassName Win32_BIOS',
    category: 'System Information',
  },
  {
    name: 'Get-HotFix',
    description: 'Gets the hotfixes that have been installed on the local or remote computers.',
    example: 'Get-HotFix',
    category: 'System Information',
  },
  {
    name: 'Get-Date',
    description: 'Gets the current date and time.',
    example: '# Get current date\nGet-Date\n\n# Format the date\nGet-Date -Format "yyyy-MM-dd"',
    category: 'System Information',
  },
];
