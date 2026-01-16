import type { DrfCheatSheetItem } from './types';

export const viewItems: DrfCheatSheetItem[] = [
  {
    name: 'APIView',
    description: 'The base class for all API views. It handles content negotiation and authentication, but you must define handler methods like `get()`, `post()`, etc., manually.',
    example: `from rest_framework.views import APIView\nfrom rest_framework.response import Response\n\nclass UserCountView(APIView):\n    def get(self, request, format=None):\n        return Response({'user_count': User.objects.count()}, status=200)`,
    category: 'Views & ViewSets',
  },
  {
    name: 'Generic Views',
    description: 'Class-based views that provide common patterns like listing (`ListAPIView`), creating (`CreateAPIView`), or both (`ListCreateAPIView`). They work with a `queryset` and `serializer_class`. Others include `RetrieveUpdateDestroyAPIView`.',
    example: `from rest_framework.generics import ListCreateAPIView\n\nclass PostList(ListCreateAPIView):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer`,
    category: 'Views & ViewSets',
  },
  {
    name: 'ViewSets vs GenericViewSet',
    description: '`ViewSet` provides actions (`list`, `create`) but requires manual routing. `GenericViewSet` inherits from `GenericAPIView` and provides `get_queryset()` and `get_serializer()` helpers, but you must mix in action classes (e.g., `mixins.ListModelMixin`) to get functionality.',
    example: `from rest_framework import viewsets, mixins\n\nclass UserViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):\n    queryset = User.objects.all()\n    serializer_class = UserSerializer`,
    category: 'Views & ViewSets',
  },
  {
    name: 'ModelViewSet / ReadOnlyModelViewSet',
    description: '`ModelViewSet` provides the full set of `list`, `create`, `retrieve`, `update`, and `destroy` actions for a model. `ReadOnlyModelViewSet` provides only `list` and `retrieve`.',
    example: `class PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer\n    permission_classes = [permissions.IsAuthenticatedOrReadOnly]`,
    category: 'Views & ViewSets',
  },
  {
    name: 'Overriding ViewSet Methods',
    description: 'You can customize behavior by overriding methods like `get_queryset` (for dynamic filtering), `perform_create` (to modify an object before saving), or `get_serializer_context`.',
    example: `class MyPostViewSet(viewsets.ModelViewSet):\n    serializer_class = PostSerializer\n\n    def get_queryset(self):\n        return Post.objects.filter(author=self.request.user)\n\n    def perform_create(self, serializer):\n        serializer.save(author=self.request.user)`,
    category: 'Views & ViewSets',
  },
  {
    name: 'get_serializer_class()',
    description: 'Override this method in a view to dynamically determine which serializer should be used, for example, using a different serializer for read and write operations.',
    example: `def get_serializer_class(self):\n    if self.action == 'list':\n        return PostListSerializer\n    return PostDetailSerializer`,
    category: 'Views & ViewSets',
  },
    {
    name: 'get_permissions()',
    description: 'Override this method to dynamically determine the permission classes for a view, often based on the action.',
    example: `def get_permissions(self):\n    if self.action == 'list':\n        permission_classes = [IsAuthenticated]\n    else:\n        permission_classes = [IsAdminUser]\n    return [permission() for permission in permission_classes]`,
    category: 'Views & ViewSets',
  },
  {
    name: '@action Decorator',
    description: 'Used to add custom endpoints to a ViewSet that don\'t fit into the standard create/read/update/delete pattern. Use `detail=True` for single-object actions and `detail=False` for list actions.',
    example: `from rest_framework.decorators import action\n\nclass UserViewSet(viewsets.ModelViewSet):\n    # ...\n    @action(detail=True, methods=['post'])\n    def set_password(self, request, pk=None):\n        # ... custom logic\n        return Response({'status': 'password set'})\n\n    @action(detail=False, methods=['get'])\n    def recent_users(self, request):\n        # ... custom logic`,
    category: 'Views & ViewSets',
  },
  {
    name: 'Response Object',
    description: 'DRF\'s `Response` object is a type of `TemplateResponse` that takes unrendered data and uses content negotiation to determine the correct content type to return to the client.',
    example: `from rest_framework.response import Response\nfrom rest_framework import status\n\nreturn Response(data, status=status.HTTP_201_CREATED)`,
    category: 'Views & ViewSets',
  },
  {
    name: 'Renderers & Parsers',
    description: '`renderer_classes` and `parser_classes` define how response data is rendered and request data is parsed. They handle content negotiation. Common renderers are `JSONRenderer` and `BrowsableAPIRenderer`.',
    example: `from rest_framework.renderers import JSONRenderer\n\nclass MyView(APIView):\n    renderer_classes = [JSONRenderer]`,
    category: 'Views & ViewSets',
  },
    {
    name: 'Exception Handling (exception_handler)',
    description: 'You can provide a custom exception handler function in `settings.py` to control the format of all error responses in your API.',
    example: `// settings.py\nREST_FRAMEWORK = {\n    'EXCEPTION_HANDLER': 'my_app.utils.custom_exception_handler'\n}\n\n// my_app/utils.py\ndef custom_exception_handler(exc, context):\n    # ... custom logic ...\n    return Response({'error': '...'}, status=400)`,
    category: 'Views & ViewSets',
  },
];
