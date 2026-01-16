import type { DrfCheatSheetItem } from './drf/types';
import { serializerItems } from './drf/serializers';
import { viewItems } from './drf/viewsAndViewsets';
import { routingItems } from './drf/routing';
import { authItems } from './drf/authAndPermissions';
import { paginationItems } from './drf/pagination';
import { filteringItems } from './drf/filtering';
import { testingItems } from './drf/testing';
import { versioningItems } from './drf/versioning';
import { throttlingItems } from './drf/throttling';

// Re-export type for convenience
export type { DrfCheatSheetItem };

export const drfData: DrfCheatSheetItem[] = [
  ...serializerItems,
  ...viewItems,
  ...routingItems,
  ...authItems,
  ...paginationItems,
  ...filteringItems,
  ...testingItems,
  ...versioningItems,
  ...throttlingItems,
];
