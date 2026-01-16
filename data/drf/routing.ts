import type { DrfCheatSheetItem } from './types';

export const routingItems: DrfCheatSheetItem[] = [
  {
    name: 'SimpleRouter & DefaultRouter',
    description: 'Routers automatically generate URL patterns for your ViewSets. `SimpleRouter` provides list and detail routes. `DefaultRouter` does the same, plus adds a default API root view.',
    example: `from rest_framework.routers import DefaultRouter\n\nrouter = DefaultRouter()\nrouter.register(r'posts', PostViewSet, basename='post')\n\nurlpatterns = router.urls`,
    category: 'Routing',
  },
  {
    name: 'Manual URL Patterns',
    description: 'For `APIView` and generic views, you must define URL patterns manually in your `urls.py` file using Django\'s `path()` function.',
    example: `from django.urls import path\n\nurlpatterns = [\n    path('posts/', PostList.as_view()),\n    path('posts/<int:pk>/', PostDetail.as_view()),\n]`,
    category: 'Routing',
  },
  {
    name: 'URLs for @action',
    description: 'Routers will automatically generate URLs for custom actions. `detail=True` actions are prefixed with the object\'s PK. `detail=False` actions are at the root of the ViewSet.',
    example: `// detail=True action 'set_password' becomes:\n/users/{pk}/set_password/\n\n// detail=False action 'recent_users' becomes:\n/users/recent_users/`,
    category: 'Routing',
  },
  {
    name: 'Nested Routing',
    description: 'While core DRF does not provide a nested router, you can achieve nested URLs manually or with third-party packages like `drf-nested-routers`. This is useful for representing hierarchical relationships.',
    example: `// Example goal: /authors/{author_pk}/books/{book_pk}/\n// This requires custom logic in the BookViewSet to filter books by the author_pk from the URL.`,
    category: 'Routing',
  },
];
