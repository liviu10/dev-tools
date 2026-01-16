export interface HtaccessCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Rewrite Engine' | 'Authentication & Access Control' | 'Caching & Headers' | 'Custom Error Pages' | 'Redirects' | 'Performance & Compression' | 'Security' | 'PHP Configuration';
}

export const htaccessData: HtaccessCheatSheetItem[] = [
  // Rewrite Engine
  {
    name: 'Turn On Rewrite Engine',
    description: 'Enables the URL rewriting engine (mod_rewrite). This is required for most other rewrite rules to work.',
    example: 'RewriteEngine On',
    category: 'Rewrite Engine',
  },
  {
    name: 'RewriteRule',
    description: 'The core directive for URL rewriting. It defines a pattern to match and a substitution URL to replace it with. It can be followed by flags in square brackets.',
    example: '# Rewrite /product/123 to /product.php?id=123\nRewriteRule ^product/([0-9]+)$ /product.php?id=$1 [L]',
    category: 'Rewrite Engine',
  },
  {
    name: 'RewriteCond',
    description: 'Defines a condition that must be met for the following RewriteRule to be applied. Multiple RewriteConds can be stacked.',
    example: '# Rewrite to HTTPS only if not already on HTTPS\nRewriteCond %{HTTPS} !=on\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]',
    category: 'Rewrite Engine',
  },
  {
    name: 'RewriteBase',
    description: 'Sets the base URL for per-directory rewrites. It\'s necessary when using .htaccess in a subdirectory and rewriting to relative paths.',
    example: '# In .htaccess inside /myapp/ subdirectory\nRewriteBase /myapp/',
    category: 'Rewrite Engine',
  },
  {
    name: 'Common Rewrite Flags',
    description: 'Flags modify the behavior of a RewriteRule. [L] = Last rule, stop processing. [R=301] = Redirect with 301 status. [NC] = No Case, case-insensitive. [QSA] = Query String Append.',
    example: `RewriteRule ^old-page$ /new-page [R=301,L] # Permanent Redirect\nRewriteRule ^product$ /item [NC,L] # Case-insensitive match`,
    category: 'Rewrite Engine',
  },
  {
    name: 'Remove .html Extension',
    description: 'Makes URLs cleaner by allowing users to access pages without the file extension.',
    example: 'RewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^([^/]+)/$ $1.html\nRewriteRule ^([^/]+)$ $1.html [L]',
    category: 'Rewrite Engine',
  },
  {
    name: 'Front Controller Pattern',
    description: 'Redirects all requests for non-existent files to a single entry point (e.g., index.php). This is a common pattern for modern frameworks like WordPress, Laravel, etc.',
    example: 'RewriteEngine On\nRewriteBase /\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.php [L]',
    category: 'Rewrite Engine',
  },

  // Redirects
  {
    name: 'Permanent Redirect (301)',
    description: 'Redirects a single page permanently. This is the most common type of redirect and is best for SEO.',
    example: 'Redirect 301 /old-page.html /new-page.html',
    category: 'Redirects',
  },
  {
    name: 'Temporary Redirect (302)',
    description: 'Redirects a single page temporarily. Use this if you plan to bring the old page back.',
    example: 'Redirect 302 /temp-page.html /maintenance.html',
    category: 'Redirects',
  },
  {
    name: 'Redirect Entire Site',
    description: 'Permanently redirect an entire domain to a new one using mod_rewrite.',
    example: 'RewriteEngine On\nRewriteCond %{HTTP_HOST} ^olddomain.com [NC,OR]\nRewriteCond %{HTTP_HOST} ^www.olddomain.com [NC]\nRewriteRule ^(.*)$ http://www.newdomain.com/$1 [L,R=301,NC]',
    category: 'Redirects',
  },
  {
    name: 'Force WWW',
    description: 'Ensures all traffic uses the "www" subdomain.',
    example: 'RewriteEngine On\nRewriteCond %{HTTP_HOST} !^www\\.\nRewriteRule ^(.*)$ http://www.%{HTTP_HOST}/$1 [R=301,L]',
    category: 'Redirects',
  },
  {
    name: 'Force non-WWW',
    description: 'Ensures all traffic uses the root domain (no "www").',
    example: 'RewriteEngine On\nRewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]\nRewriteRule ^(.*)$ http://%1/$1 [R=301,L]',
    category: 'Redirects',
  },
  {
    name: 'Force HTTPS',
    description: 'Forces all incoming traffic to use a secure HTTPS connection.',
    example: 'RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]',
    category: 'Redirects',
  },
  
  // Custom Error Pages
  {
    name: 'ErrorDocument',
    description: 'Sets the file or URL to be displayed for a specific HTTP error code. Use root-relative paths.',
    example: 'ErrorDocument 404 /errors/404.html\nErrorDocument 500 /errors/500.html',
    category: 'Custom Error Pages',
  },

  // Authentication & Access Control
  {
    name: 'Deny Access to Files',
    description: 'Prevents web access to specific files, like configuration files or logs.',
    example: '<Files ".env">\n    Require all denied\n</Files>\n\n<FilesMatch "\\.(log|config|sql)$">\n    Require all denied\n</FilesMatch>',
    category: 'Authentication & Access Control',
  },
  {
    name: 'Deny Access to Directory',
    description: 'Prevents directory listing (browsing the contents of a directory).',
    example: 'Options -Indexes',
    category: 'Authentication & Access Control',
  },
  {
    name: 'Allow/Deny by IP Address',
    description: 'Control access based on IP address. The old syntax (Order, Allow, Deny) is deprecated in Apache 2.4+ in favor of `Require`.',
    example: '# Apache 2.4+\nRequire ip 192.168.1.1\nRequire not ip 10.0.0.0/8\n\n# Apache 2.2 and older\nOrder deny,allow\nDeny from all\nAllow from 192.168.1.1',
    category: 'Authentication & Access Control',
  },
  {
    name: 'Password Protect a Directory',
    description: 'Requires a username and password to access a directory. Requires a separate `.htpasswd` file.',
    example: '# .htaccess file\nAuthType Basic\nAuthName "Restricted Area"\nAuthUserFile /path/to/.htpasswd\nRequire valid-user',
    category: 'Authentication & Access Control',
  },
  
  // Security
  {
    name: 'Protect .htaccess File',
    description: 'Prevents the .htaccess file itself from being viewed by browsers.',
    example: '<Files ".htaccess">\n    Require all denied\n</Files>',
    category: 'Security',
  },
  {
    name: 'Hotlink Protection',
    description: 'Prevents other websites from directly linking to your images or files, saving bandwidth.',
    example: 'RewriteEngine On\nRewriteCond %{HTTP_REFERER} !^$\nRewriteCond %{HTTP_REFERER} !^http(s)?://(www\\.)?yourdomain.com [NC]\nRewriteRule \\.(jpg|jpeg|png|gif)$ - [NC,F,L]',
    category: 'Security',
  },
  {
    name: 'Clickjacking Protection',
    description: 'Prevents your site from being embedded in an iframe on another site. `DENY` blocks all, `SAMEORIGIN` allows it on your own domain.',
    example: '<IfModule mod_headers.c>\n  Header always append X-Frame-Options SAMEORIGIN\n</IfModule>',
    category: 'Security',
  },
  {
    name: 'MIME Type Sniffing Protection',
    description: 'Prevents browsers from trying to guess the content type of a resource, which can be a security risk.',
    example: '<IfModule mod_headers.c>\n  Header set X-Content-Type-Options "nosniff"\n</IfModule>',
    category: 'Security',
  },
  {
    name: 'XSS Protection Header',
    description: 'Enables the Cross-Site Scripting (XSS) filter built into most recent web browsers. Although largely superseded by CSP, it can provide a layer of protection on older browsers.',
    example: '<IfModule mod_headers.c>\n  Header set X-XSS-Protection "1; mode=block"\n</IfModule>',
    category: 'Security',
  },
  {
    name: 'Block Sensitive Files',
    description: 'A general rule to block access to common sensitive file types.',
    example: `<FilesMatch "^\\.(htaccess|htpasswd|ini|phps|fla|psd|log|sh)$">\n    Require all denied\n</FilesMatch>`,
    category: 'Security',
  },
  {
    name: 'Disable Server Signature',
    description: 'Hides the Apache server version and other details from being sent in HTTP headers, making it slightly harder for attackers to find version-specific vulnerabilities.',
    example: 'ServerSignature Off',
    category: 'Security',
  },
  {
    name: 'Content Security Policy (CSP)',
    description: 'Helps prevent cross-site scripting (XSS) and other code injection attacks by specifying which dynamic resources are allowed to load.',
    example: `# Very basic CSP - only allow resources from the same origin\nHeader set Content-Security-Policy "default-src 'self'"`,
    category: 'Security',
  },

  // Caching & Headers
  {
    name: 'CORS Headers (Allow All)',
    description: 'Allows cross-origin resource sharing from any domain. Useful for public APIs.',
    example: '<IfModule mod_headers.c>\n  Header set Access-Control-Allow-Origin "*"\n</IfModule>',
    category: 'Caching & Headers',
  },
  {
    name: 'Expires Headers (mod_expires)',
    description: 'Tells the browser how long to cache certain file types, reducing server load and improving page speed for repeat visitors.',
    example: '<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresByType image/jpg "access plus 1 year"\n  ExpiresByType text/css "access plus 1 month"\n</IfModule>',
    category: 'Caching & Headers',
  },
  {
    name: 'Cache-Control Headers (mod_headers)',
    description: 'Provides more fine-grained control over caching behavior than `Expires`.',
    example: '<IfModule mod_headers.c>\n  <filesMatch "\\.(ico|pdf|flv|jpg|jpeg|png|gif)$">\n    Header set Cache-Control "max-age=2592000, public"\n  </filesMatch>\n</IfModule>',
    category: 'Caching & Headers',
  },
  {
    name: 'Remove ETags',
    description: 'Entity tags (ETags) can sometimes prevent proper caching on multi-server setups. This removes them.',
    example: '# FileETag None is an alternative, but Header unset ETag is more robust\n<IfModule mod_headers.c>\n  Header unset ETag\n</IfModule>\n\nFileETag None',
    category: 'Caching & Headers',
  },

  // Performance & Compression
  {
    name: 'Enable Gzip Compression (mod_deflate)',
    description: 'Compresses text-based files (HTML, CSS, JS) before sending them to the browser, significantly reducing file size and load times.',
    example: '<IfModule mod_deflate.c>\n  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript\n</IfModule>',
    category: 'Performance & Compression',
  },
  
  // PHP Configuration
  {
    name: 'Set PHP Variables (php_value)',
    description: 'Override PHP configuration settings. This only works if PHP is running as an Apache module.',
    example: '# Set maximum upload size\nphp_value upload_max_filesize 64M\nphp_value post_max_size 64M\n\n# Turn off error display for production\nphp_flag display_errors off',
    category: 'PHP Configuration',
  },
  {
    name: 'Custom php.ini File',
    description: 'Tell PHP to use a specific `php.ini` file in the current directory.',
    example: 'suPHP_ConfigPath /home/username/public_html/',
    category: 'PHP Configuration',
  },
];
