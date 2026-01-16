import type { DrfCheatSheetItem } from './types';

export const throttlingItems: DrfCheatSheetItem[] = [
  {
    name: 'Throttling Classes',
    description: 'Throttling is similar to permissions, in that it determines if a request should be authorized. Throttles are configured per-view or globally.',
    example: `// In a view\nfrom rest_framework.throttling import UserRateThrottle\n\nclass MyView(APIView):\n    throttle_classes = [UserRateThrottle]`,
    category: 'Throttling',
  },
  {
    name: 'AnonRateThrottle / UserRateThrottle',
    description: '`AnonRateThrottle` restricts unauthenticated users. `UserRateThrottle` restricts authenticated users. Rates are configured in `settings.py`.',
    example: `// settings.py\n'DEFAULT_THROTTLE_RATES': {\n    'anon': '100/day',\n    'user': '1000/day'\n}`,
    category: 'Throttling',
  },
  {
    name: 'ScopedRateThrottle',
    description: 'Allows you to apply more specific throttles to certain parts of the API. You must specify the `throttle_scope` on the view.',
    example: `// settings.py\n'DEFAULT_THROTTLE_RATES': {\n    'uploads': '20/day'\n}\n\n// In a view\nclass FileUploadView(APIView):\n    throttle_scope = 'uploads'`,
    category: 'Throttling',
  },
];
