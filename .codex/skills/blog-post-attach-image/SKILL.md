---
name: blog-post-attach-image
description: Attach a provided image to a blog post by copying it into assets/img with an SEO-friendly filename based on the post slug, then update the post front matter image field to the new asset path.
---

# Blog Post Attach Image

Use this skill when the user wants to use an attached image or a provided local image file for a specific post.

This skill changes repository content. It does not generate prompts or illustrations.

## Inputs

The user should provide:

- one source image
- one target post by path, slug, or title

Prefer `@` for the target post when the user provides a path.

## Workflow

1. Resolve the target post from:
   - an explicit file path
   - an exact slug or dated filename
   - a front matter title match
2. Search both `_posts/` and `_drafts/`.
3. If more than one post matches, stop and ask for the exact post.
4. Read these shared references:
   - `../shared/blog-post-assets/references/file-placement.md`
   - `../shared/blog-post-assets/references/front-matter-rules.md`
   - `../shared/blog-post-assets/references/seo-filename-rules.md`
5. Read the style-specific naming notes at `references/naming-rules.md`.
6. Confirm there is exactly one source image.
7. Build the canonical asset filename from the post slug, not from the source image filename.
8. Copy the image into `assets/img/` using that canonical name.
9. Update or insert the post front matter `image:` field to the new `/assets/img/...` path.
10. Return a short summary of the copied file and the updated post.

## Safety Rules

- Do not guess between multiple attached images.
- Do not guess between multiple matching posts.
- Do not write outside `assets/img/`.
- Do not silently overwrite another post's asset.
- If the canonical destination already exists for the same post, replacing it is acceptable.
- Do not modify `image_source:` unless the user explicitly asks.

## Output Contract

- If the operation succeeds, report the destination asset path and the updated post path.
- If the operation is blocked, explain the specific ambiguity or collision briefly.
