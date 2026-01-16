export interface DrfCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Serializers' | 'Views & ViewSets' | 'Routing' | 'Authentication & Permissions' | 'Pagination' | 'Filtering, Ordering & Searching' | 'Testing' | 'API Versioning' | 'Throttling';
}
