import type { DrfCheatSheetItem } from './types';

export const paginationItems: DrfCheatSheetItem[] = [
  {
    name: 'PageNumberPagination',
    description: 'A simple pagination style that accepts a page number in the query parameters (e.g., `?page=2`). Can be configured globally or per-view.',
    example: `// settings.py\n'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',\n'PAGE_SIZE': 10`,
    category: 'Pagination',
  },
  {
    name: 'LimitOffsetPagination',
    description: 'A pagination style that allows the client to specify the `limit` (page size) and `offset` (starting position) (e.g., `?limit=10&offset=20`).',
    example: `// In a view\nfrom rest_framework.pagination import LimitOffsetPagination\n\nclass MyView(ListAPIView):\n    pagination_class = LimitOffsetPagination`,
    category: 'Pagination',
  },
  {
    name: 'CursorPagination',
    description: 'Provides a keyset-based pagination style. It is performant for very large datasets and provides stable "next"/"previous" links, but does not allow jumping to arbitrary pages.',
    example: `// In a view\nclass MyView(ListAPIView):\n    pagination_class = CursorPagination\n    ordering = ['-created'] # Must have a consistent ordering`,
    category: 'Pagination',
  },
  {
    name: 'Custom Pagination',
    description: 'You can create a custom pagination serializer to modify the structure of the pagination output.',
    example: `class CustomPagination(PageNumberPagination):\n    def get_paginated_response(self, data):\n        return Response({\n            'links': {\n               'next': self.get_next_link(),\n               'previous': self.get_previous_link()\n            },\n            'count': self.page.paginator.count,\n            'results': data\n        })`,
    category: 'Pagination',
  },
    {
    name: 'Disabling Pagination',
    description: 'You can disable pagination for a specific view by setting `pagination_class = None`.',
    example: `class LargeDataExportView(ListAPIView):\n    pagination_class = None\n    queryset = ...`,
    category: 'Pagination',
  },
];
