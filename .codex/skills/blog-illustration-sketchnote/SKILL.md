---
name: blog-illustration-sketchnote
description: Generate a completed sketchnote-style image prompt for a blog post thumbnail or an inline teaching illustration by reading a post under _posts/ or _drafts/, extracting the main idea, and filling the shared blog illustration template.
---

# Blog Illustration, Sketchnote Style

Use this skill when the user wants a prompt for a blog illustration in the sketchnote style and provides a post, post title, slug, or path.

Prefer this skill when the visual should explain a concept, workflow, trade-off, abstraction, or system with doodles, arrows, boxes, and light labels.

Do not use this skill when the image should be a single scene driven by characters or a narrative metaphor. In that case use the cartoon + sketchnote skill.

## Workflow

1. Resolve the target post from:
   - an explicit file path
   - an exact slug or dated filename
   - a front matter title match
2. Search both `_posts/` and `_drafts/`.
3. If more than one post matches, stop and ask for the exact post.
4. Read the post front matter and body.
5. Determine the requested image intent:
   - `thumbnail`
   - `inline illustration`
6. Read these shared references:
   - `../shared/blog-illustration/references/workflow.md`
   - `../shared/blog-illustration/references/post-analysis.md`
   - `../shared/blog-illustration/references/prompt-slots.md`
   - `../shared/blog-illustration/references/visual-rules.md`
7. Read the style template at `references/prompt-template.md`.
8. For thumbnails, use the article-wide concept. For inline illustrations, focus on the specific purpose or section the user mentions.
9. Fill the sketchnote prompt template by replacing:
   - `[INSERT TOPIC]`
   - `[INSERT OPTIONAL ICONS OR IDEAS]`

## Style Rules

- Use the sketchnote prompt structure from the shared references.
- Emphasize one strong central concept with supporting doodles around it.
- Supporting elements may include arrows, boxes, small icons, connectors, and short handwritten uppercase labels only when needed.
- Keep the composition balanced and readable. Do not overload the frame with too many metaphors.
- Keep the completed prompt close to the template wording unless the post requires a sharper subject or cleaner supporting elements.

## Output Contract

- Return only the completed final prompt.
- Do not explain the extraction process unless the user asks.
- Keep the prompt specific to the target post and image intent.
