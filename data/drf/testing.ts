import type { DrfCheatSheetItem } from './types';

export const testingItems: DrfCheatSheetItem[] = [
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
];
