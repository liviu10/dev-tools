import type { DrfCheatSheetItem } from './types';

export const filteringItems: DrfCheatSheetItem[] = [
  {
    name: 'filter_backends',
    description: 'Define which filter backends should be used for a view. This allows for searching, ordering, and filtering.',
    example: `from rest_framework import filters\n\nclass UserListView(generics.ListAPIView):\n    queryset = User.objects.all()\n    serializer_class = UserSerializer\n    filter_backends = [filters.SearchFilter, filters.OrderingFilter]`,
    category: 'Filtering, Ordering & Searching',
  },
  {
    name: 'SearchFilter',
    description: 'Enables simple query parameter-based searching (e.g., `?search=test`). Specify which fields can be searched. Use prefixes like `^`, `=`, `@` for more control.',
    example: `class UserListView(generics.ListAPIView):\n    # ...\n    filter_backends = [filters.SearchFilter]\n    search_fields = ['^username', '=email'] # Starts-with and exact match`,
    category: 'Filtering, Ordering & Searching',
  },
  {
    name: 'OrderingFilter',
    description: 'Enables simple query parameter-based ordering of results (e.g., `?ordering=-created_at`). You can specify which fields the user is allowed to order by.',
    example: `class UserListView(generics.ListAPIView):\n    # ...\n    filter_backends = [filters.OrderingFilter]\n    ordering_fields = ['username', 'created_at']`,
    category: 'Filtering, Ordering & Searching',
  },
  {
    name: 'DjangoFilterBackend',
    description: 'Enables highly customizable field filtering for your API. Requires installing the `django-filter` package. Specify fields with `filterset_fields` or a custom `filterset_class`.',
    example: `from django_filters.rest_framework import DjangoFilterBackend\n\nclass ProductListView(generics.ListAPIView):\n    # ...\n    filter_backends = [DjangoFilterBackend]\n    filterset_fields = ['category', 'in_stock']\n// Usage: /products/?category=books&in_stock=true`,
    category: 'Filtering, Ordering & Searching',
  },
  {
    name: 'Custom FilterSet Class',
    description: 'For more complex filtering (e.g., range, choice), create a custom `FilterSet` class from the `django-filter` package.',
    example: `import django_filters\n\nclass ProductFilter(django_filters.FilterSet):\n    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')\n    class Meta:\n        model = Product\n        fields = ['category']\n\n// In view:\nfilterset_class = ProductFilter`,
    category: 'Filtering, Ordering & Searching',
  },
];
