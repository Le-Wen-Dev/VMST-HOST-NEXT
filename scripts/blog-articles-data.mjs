// Aggregates all batches + pillar articles into a single articles array
import { batch1 } from './blog-articles-batch1.mjs';
import { batch2 } from './blog-articles-batch2.mjs';
import { batch3 } from './blog-articles-batch3.mjs';
import { batch4 } from './blog-articles-batch4.mjs';
import { batch5 } from './blog-articles-batch5.mjs';
import { batch6 } from './blog-articles-batch6.mjs';
import { article2 } from './blog-pillar-2.mjs';
import { article3 } from './blog-pillar-3.mjs';
import { article4 } from './blog-pillar-4.mjs';
import { article5 } from './blog-pillar-5.mjs';

export const articles = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
  article2,
  article3,
  article4,
  article5,
];
