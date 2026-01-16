export interface DrfCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Serializers' | 'Views & ViewSets' | 'Routing' | 'Authentication & Permissions' | 'Pagination' | 'Filtering, Ordering & Searching' | 'Testing' | 'API Versioning' | 'Throttling';
}

export const drfData: DrfCheatSheetItem[] = [
  // Serializers
  {
    name: 'serializers.Serializer',
    description: 'The base serializer class. Allows you to define fields manually. Useful for non-model data or when you need full control over the serialization process.',
    example: `class CommentSerializer(serializers.Serializer):\n    email = serializers.EmailField()\n    content = serializers.CharField(max_length=200)\n    created = serializers.DateTimeField()`,
    category: 'Serializers',
  },
  {
    name: 'serializers.ModelSerializer',
    description: 'A serializer that automatically generates a set of fields and validators based on a Django model. The `Meta` class is used to specify the model and fields.',
    example: `class AccountSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Account\n        fields = ['id', 'account_name', 'users', 'created']\n        # Use '__all__' to include all model fields.`,
    category: 'Serializers',
  },
  {
    name: 'HyperlinkedModelSerializer',
    description: 'Similar to `ModelSerializer` but represents relationships using hyperlinks (`url` field) instead of primary keys. Requires a `request` object in the serializer context.',
    example: `class AccountSerializer(serializers.HyperlinkedModelSerializer):\n    class Meta:\n        model = Account\n        fields = ['url', 'id', 'account_name', 'users']`,
    category: 'Serializers',
  },
  {
    name: 'Serializer Fields',
    description: 'Common field types used to define the representation of your data, such as strings, numbers, booleans, dates, etc.',
    example: `name = serializers.CharField(max_length=100)\nscore = serializers.IntegerField()\nis_active = serializers.BooleanField(default=True)\nemail = serializers.EmailField()\nregistration_date = serializers.DateTimeField(read_only=True)`,
    category: 'Serializers',
  },
  {
    name: 'Field Arguments (read_only, write_only, source)',
    description: '`read_only`: included in output, but not accepted for input. `write_only`: accepted for input, but not included in output (e.g., passwords). `source`: specifies which attribute to use for the field\'s value.',
    example: `password = serializers.CharField(write_only=True)\npin_code = serializers.CharField(source='user.pin_code')`,
    category: 'Serializers',
  },
  {
    name: 'SerializerMethodField',
    description: 'A read-only field that gets its value by calling a method on the serializer class. The method name should be `get_<field_name>`.',
    example: `class UserSerializer(serializers.ModelSerializer):\n    full_name = serializers.SerializerMethodField()\n\n    def get_full_name(self, obj):\n        return f"{obj.first_name} {obj.last_name}"`,
    category: 'Serializers',
  },
    {
    name: 'SlugRelatedField',
    description: 'A read-write field that represents the target of the relationship by a field on the target. Useful for human-readable representations.',
    example: `class PostSerializer(serializers.ModelSerializer):\n    # Represents the 'tag' relationship using the 'name' field of the Tag model.\n    tags = serializers.SlugRelatedField(\n        many=True,\n        queryset=Tag.objects.all(),\n        slug_field='name'\n     )`,
    category: 'Serializers',
  },
  {
    name: 'Validation',
    description: 'DRF provides multiple ways to add validation: field-level with `validate_<field_name>` methods, object-level with a `validate` method, and reusable validators.',
    example: `def validate_title(self, value):\n    if 'django' not in value.lower():\n        raise serializers.ValidationError("Blog post is not about Django")\n    return value\n\ndef validate(self, data):\n    if data['start_date'] > data['end_date']:\n        raise serializers.ValidationError("Finish must occur after start")\n    return data`,
    category: 'Serializers',
  },
  {
    name: 'Nested Serializers',
    description: 'Serialize model relationships. You can nest another serializer or use `PrimaryKeyRelatedField`, `SlugRelatedField`, etc.',
    example: `class UserSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = User\n        fields = ['username']\n\nclass PostSerializer(serializers.ModelSerializer):\n    author = UserSerializer(read_only=True)\n    class Meta:\n        model = Post\n        fields = ['title', 'content', 'author']`,
    category: 'Serializers',
  },
  {
    name: 'Custom create() and update()',
    description: 'You can override the `.create()` and `.update()` methods on a serializer to customize how instances are created or modified after validation.',
    example: `class UserSerializer(serializers.ModelSerializer):\n    def create(self, validated_data):\n        user = User.objects.create_user(**validated_data)\n        return user`,
    category: 'Serializers',
  },
    {
    name: 'to_representation() & to_internal_value()',
    description: 'Override `to_representation` to customize the output serialization (object -> dict). Override `to_internal_value` to customize the input deserialization (dict -> object).',
    example: `class CoordsSerializer(serializers.Serializer):\n    def to_representation(self, instance):\n        return f"{instance.lat},{instance.lon}"\n\n    def to_internal_value(self, data):\n        lat, lon = data.split(',')\n        return {'lat': float(lat), 'lon': float(lon)}`,
    category: 'Serializers',
  },
  {
    name: 'Partial Updates (partial=True)',
    description: 'To update a subset of fields on a model instance (i.e., for a PATCH request), pass `partial=True` when instantiating the serializer.',
    example: `serializer = CommentSerializer(instance, data=request.data, partial=True)\nif serializer.is_valid():\n    serializer.save()`,
    category: 'Serializers',
  },
  {
    name: 'Serializing Lists (many=True & ListSerializer)',
    description: 'To serialize a list, pass `many=True`. To customize list-level validation or creation, create a custom `ListSerializer` class.',
    example: `class MyListSerializer(serializers.ListSerializer):\n    def create(self, validated_data):\n        # Custom logic for bulk creation\n        pass\n\nclass MySerializer(serializers.Serializer):\n    class Meta:\n        list_serializer_class = MyListSerializer`,
    category: 'Serializers',
  },
  {
    name: 'Serializer Context',
    description: 'You can pass arbitrary extra context to a serializer by passing a `context` argument. This is useful for including data like the current request object.',
    example: `serializer = MySerializer(data=request.data, context={'request': request})\n\n# Inside serializer:\nself.context['request'].user`,
    category: 'Serializers',
  },

  // Views & ViewSets
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

  // Routing
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

  // Authentication & Permissions
  {
    name: 'Authentication Classes',
    description: 'Determine how a request is authenticated. Common classes are `SessionAuthentication`, `TokenAuthentication`, and `BasicAuthentication`. You can set these globally or per-view.',
    example: `// settings.py\nREST_FRAMEWORK = {\n    'DEFAULT_AUTHENTICATION_CLASSES': [\n        'rest_framework.authentication.SessionAuthentication',\n        'rest_framework.authentication.TokenAuthentication',\n    ]\n}`,
    category: 'Authentication & Permissions',
  },
  {
    name: 'JWT Authentication (djangorestframework-simplejwt)',
    description: 'A popular third-party package for JSON Web Token authentication. It provides views for obtaining and refreshing tokens.',
    example: `// settings.py\n'DEFAULT_AUTHENTICATION_CLASSES': (\n    'rest_framework_simplejwt.authentication.JWTAuthentication',\n)`,
    category: 'Authentication & Permissions',
  },
  {
    name: 'Permission Classes',
    description: 'Determine if an authenticated user has permission to access a given endpoint. Common classes are `AllowAny`, `IsAuthenticated`, `IsAdminUser`, and `IsAuthenticatedOrReadOnly`.',
    example: `// In a view\nfrom rest_framework.permissions import IsAuthenticated\n\nclass MyView(APIView):\n    permission_classes = [IsAuthenticated]`,
    category: 'Authentication & Permissions',
  },
  {
    name: 'DjangoModelPermissions',
    description: 'A permission class that ties into Django\'s standard object permissions framework, allowing you to set permissions on a per-model basis (e.g., `app_label.add_modelname`).',
    example: `class MyViewSet(viewsets.ModelViewSet):\n    queryset = ...\n    serializer_class = ...\n    permission_classes = [permissions.DjangoModelPermissions]`,
    category: 'Authentication & Permissions',
  },
  {
    name: 'Custom Permissions',
    description: 'Create your own permission logic by subclassing `BasePermission` and implementing `has_permission()` (for list-level access) and/or `has_object_permission()` (for detail-level access).',
    example: `class IsOwnerOrReadOnly(permissions.BasePermission):\n    def has_object_permission(self, request, view, obj):\n        if request.method in permissions.SAFE_METHODS:\n            return True\n        return obj.owner == request.user`,
    category: 'Authentication & Permissions',
  },
  {
    name: 'Composing Permissions',
    description: 'Combine permission classes using bitwise operators. Use `&` (AND) for requiring all permissions, and `|` (OR) for requiring at least one.',
    example: `from rest_framework.permissions import IsAuthenticated, IsAdminUser\n\npermission_classes = [IsAuthenticated & IsAdminUser]`,
    category: 'Authentication & Permissions',
  },
  
  // Pagination
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
  
  // Filtering, Ordering & Searching
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

  // Testing
  {
    name: 'APITestCase',
    description: 'DRF\'s test case class, which inherits from Django\'s `TestCase`. It provides a test client (`self.client`) and other helpful utilities for testing APIs.',
    example: `from rest_framework.test import APITestCase\nfrom rest_framework import status\n\nclass MyTests(APITestCase):\n    def test_my_endpoint(self):\n        response = self.client.get('/my-url/')\n        self.assertEqual(response.status_code, status.HTTP_200_OK)`,
    category: 'Testing',
  },
  {
    name: 'APIClient Methods',
    description: 'The `APIClient` supports all standard HTTP methods. You can pass data and specify a format.',
    example: `data = {'name': 'test'}\nresponse = self.client.post('/users/', data, format='json')\nself.assertEqual(response.status_code, 201)`,
    category: 'Testing',
  },
  {
    name: 'Authentication Testing (force_authenticate)',
    description: 'Use `force_authenticate()` to simulate a request from an authenticated user. Use `force_login()` for session-based authentication.',
    example: `user = User.objects.create(username='test')\nself.client.force_authenticate(user=user)\nresponse = self.client.get('/protected-route/')`,
    category: 'Testing',
  },
  {
    name: 'Authentication Testing (Tokens)',
    description: 'For token-based authentication (like JWT), set the credentials on the client. It will automatically add the `Authorization` header to subsequent requests.',
    example: `from rest_framework_simplejwt.tokens import RefreshToken\n\ntoken = RefreshToken.for_user(self.user)\nself.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token.access_token}')\nresponse = self.client.get('/api/protected/')`,
    category: 'Testing',
  },
  {
    name: 'Validation Testing',
    description: 'You can test for validation errors by sending invalid data and asserting the response status code and error content.',
    example: `invalid_data = {'title': ''}\nresponse = self.client.post('/posts/', invalid_data, format='json')\nself.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)\nself.assertIn('title', response.data)`,
    category: 'Testing',
  },
    {
    name: 'Testing File Uploads',
    description: 'Simulate file uploads by creating an in-memory file and passing it as data in a POST/PUT request. Set the format to `multipart`.',
    example: `from django.core.files.uploadedfile import SimpleUploadedFile\n\nimage = SimpleUploadedFile("file.jpg", b"file_content", content_type="image/jpeg")\nresponse = self.client.post('/upload/', {'image': image}, format='multipart')`,
    category: 'Testing',
  },
  {
    name: 'APIRequestFactory',
    description: 'A factory for creating `Request` objects that can be passed directly to your views. This allows you to test the view logic in isolation without going through the full routing and middleware stack.',
    example: `from rest_framework.test import APIRequestFactory\n\nfactory = APIRequestFactory()\nrequest = factory.get('/notes/')\nview = NoteList.as_view()\nresponse = view(request)`,
    category: 'Testing',
  },
    // Throttling
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
  // API Versioning
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
