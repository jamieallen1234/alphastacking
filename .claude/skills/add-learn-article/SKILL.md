---
name: add-learn-article
description: >-
  Adds a new Learn article to Alpha Stacking. Covers registering the article
  in learnArticles.ts, writing the article component, and wiring US + CA routes.
  Use whenever adding a new /learn/[slug] page.
---

# Add Learn Article (Alpha Stacking)

## Checklist

1. **`src/lib/learnArticles.ts`**
   - Add a slug constant: `export const MY_ARTICLE_SLUG = 'my-article-slug'`
   - Append a `LearnArticleMeta` entry to `LEARN_ARTICLES`:
     - `slug` — matches the slug constant
     - `eyebrow` — category label (e.g. `'Concepts'`, `'Reference'`, `'Portfolio construction'`, `'Strategy comparison'`, `'Site guide'`)
     - `read` — estimated read time (e.g. `'~4 min read'`)
     - `title` — plain title, no em dashes
     - `deck` — one or two sentences; used on the Learn hub card and the `/updates` feed blurb
     - **`publishedDate`** — ISO date **today** (`date +%F`). This field drives the entry on `/updates` and `/ca/updates`. Do not leave it blank or guess; set it the day the article ships.

2. **Article component** — `src/components/learn/MyArticleArticle.tsx`
   - Export a single `MyArticleArticle({ edition }: { edition: 'us' | 'ca' })` component
   - Follow the Teacher voice (see `AGENTS.md` copy rules): concrete examples, honest failure modes, no filler setups

3. **US route** — `src/app/learn/my-article-slug/page.tsx`
   ```tsx
   import type { Metadata } from 'next'
   import LearnArticleShell from '@/components/learn/LearnArticleShell'
   import MyArticleArticle from '@/components/learn/MyArticleArticle'
   import { MY_ARTICLE_SLUG } from '@/lib/learnArticles'

   export const metadata: Metadata = {
     title: 'Article title | Learn | Alpha Stacking',
     description: 'Deck sentence.',
   }

   export default function MyArticlePage() {
     return (
       <LearnArticleShell edition="us" currentSlug={MY_ARTICLE_SLUG}>
         <MyArticleArticle edition="us" />
       </LearnArticleShell>
     )
   }
   ```

4. **CA route** — `src/app/ca/learn/my-article-slug/page.tsx`
   - Same structure; swap `edition="us"` to `edition="ca"` in both shell and article

5. **Verify**
   - `npx tsc --noEmit`
   - Open `/learn/my-article-slug` and `/ca/learn/my-article-slug`
   - Open `/updates` and `/ca/updates` — confirm the article appears on the correct date with "Learn" badge and "Read article" CTA
