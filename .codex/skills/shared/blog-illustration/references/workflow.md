# Shared Workflow

## Inputs

The user should provide:

- which skill to use
- a target post by path, slug, or title
- the image intent:
  - thumbnail
  - inline illustration
- for inline illustrations, a purpose or a section heading when available

## Post Resolution

Resolve the post in this order:

1. exact file path
2. exact slug or dated filename match
3. exact title match from front matter

Search both `_posts/` and `_drafts/`.

If the result is ambiguous, ask for the exact post instead of guessing.

## Prompt Assembly

1. Read the post.
2. Identify the image intent.
3. Extract the central concept or scene.
4. Pick only the smallest set of supporting elements needed.
5. Fill the correct style template.
6. Return only the completed prompt.

## Template Choice

- Use the `thumbnail` template when the image is the main post image.
- Use the `inline-purpose` template when the image supports one specific point inside the post.

The style-specific skill controls the final wording, but both skills should follow the same extraction discipline.
