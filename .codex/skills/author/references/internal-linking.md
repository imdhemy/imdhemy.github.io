# Internal Linking

Use internal links to connect Dhemy's ideas across posts when they help the reader continue learning.

Internal links should feel editorial, not mechanical. The goal is reader continuity, not SEO stuffing.

## Discovery

Search `_posts/` and `_drafts/` for related posts by:

- title
- slug
- category
- tags
- repeated concepts
- related examples
- related problems or trade-offs

Prefer posts that deepen the current idea or give useful background.

Do not link only because two posts share a keyword. The link must help the reader.

## Placement

Add links where they naturally support the argument:

- after defining a concept that has a deeper post elsewhere
- when a section depends on an idea Dhemy already explained
- when the reader may need background before continuing
- near a practical takeaway when another post gives the next step

Avoid:

- link dumps
- "related posts" sections unless Dhemy asks for one
- linking every repeated term
- adding more than one link to the same post unless clearly useful
- interrupting the main argument

One to three strong internal links are usually better than many weak links.

## Style

Write referrals in Dhemy's voice. Keep them natural and short.

Good patterns:

```md
I wrote about this from the testing side in [How to organize your unit tests](/blog/testing/how-to-organize-your-unit-tests).
```

```md
This is the same reason small changes work better than big rewrites: they keep feedback alive.
```

```md
If this sounds familiar, it is close to the problem I described in [The pipeline ate my code](/blog/generic/the-pipeline-ate-my-code).
```

Avoid mechanical patterns:

```md
For more information, click here.
```

```md
Related: post one, post two, post three.
```

```md
Check out my other article.
```

## Existing Posts

When editing an existing post:

- preserve existing internal links unless they are broken, misleading, or no longer useful
- improve awkward referrals when editing the surrounding paragraph
- add new links only when they strengthen the reader's path
- do not change external links unless Dhemy asks

## New Posts

For new posts:

1. After the outline is stable, search for related existing posts.
2. Mention likely internal-link candidates before drafting if they may affect the structure.
3. Add referrals during section drafting where they belong.
4. Run a final pass to remove weak or distracting links.

## Link Format

Prefer site-relative blog URLs:

```md
[Post title](/blog/category/post-slug)
```

Use the existing permalink shape from the target post when available.

If unsure about the final URL, link to the existing Markdown path only during discussion, then resolve the public URL before finalizing the post.
