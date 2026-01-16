import type { DrfCheatSheetItem } from './types';

export const authItems: DrfCheatSheetItem[] = [
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
];
