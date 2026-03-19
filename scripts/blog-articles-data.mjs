// Aggregates all 5 batches into a single articles array
import { batch1 } from './blog-articles-batch1.mjs';
import { batch2 } from './blog-articles-batch2.mjs';
import { batch3 } from './blog-articles-batch3.mjs';
import { batch4 } from './blog-articles-batch4.mjs';
import { batch5 } from './blog-articles-batch5.mjs';

export const articles = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
];
