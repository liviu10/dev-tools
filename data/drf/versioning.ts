import type { DrfCheatSheetItem } from './types';

export const versioningItems: DrfCheatSheetItem[] = [
  {
    name: 'Configuring Versioning',
    description: 'API versioning is configured globally in `settings.py`. You can set a default version and specify which versioning scheme to use.',
    example: `// settings.py\nREST_FRAMEWORK = {\n    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning',\n    'DEFAULT_VERSION': 'v1',\n    'ALLOWED_VERSIONS': ['v1', 'v2'],\n}`,
    category: 'API Versioning',
  },
  {
    name: 'URLPathVersioning',
    description: 'The most common versioning scheme. The version is included in the URL path. The URL conf must include a `version` keyword argument.',
    example: `// urls.py\npath('api/<str:version>/users/', ...)\n\n// Access via: /api/v1/users/`,
    category: 'API Versioning',
  },
  {
    name: 'NamespaceVersioning',
    description: 'The API version is determined from the `namespace` of the URL path that is being requested.',
    example: `// urls.py\npath('v1/', include(('users.urls', 'users'), namespace='v1'))\npath('v2/', include(('users.urls', 'users'), namespace='v2'))\n\n// Access via: /v1/users/`,
    category: 'API Versioning',
  },
  {
    name: 'AcceptHeaderVersioning',
    description: 'The client includes the version as part of the `Accept` media type header in the request.',
    example: `// Client Request\nGET /users/ HTTP/1.1\nAccept: application/json; version=1.0`,
    category: 'API Versioning',
  },
];
