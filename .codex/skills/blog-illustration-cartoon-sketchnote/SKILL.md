---
name: blog-illustration-cartoon-sketchnote
description: Generate a completed minimal cartoon plus sketchnote image prompt for a blog post thumbnail or an inline teaching illustration by reading a post under _posts/ or _drafts/, extracting one clear scene, and filling the shared blog illustration template.
---

# Blog Illustration, Minimal Cartoon + Sketchnote Style

Use this skill when the user wants a prompt for a blog illustration in the minimal cartoon + sketchnote style and provides a post, post title, slug, or path.

Prefer this skill when the visual should communicate through one clear scene, character moment, collaboration tension, mistake, or emotional metaphor rather than a concept diagram.

Do not use this skill when the image should primarily be a diagrammatic explanation with multiple connected doodles. In that case use the sketchnote skill.

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
8. For thumbnails, choose the strongest article-level scene. For inline illustrations, derive one scene from the specific purpose or section the user mentions.
9. Fill the cartoon + sketchnote prompt template by replacing:
   - `[INSERT CORE IDEA ONLY]`
   - `[DESCRIBE ONLY 1 CLEAR SCENE]`

## Style Rules

- Use one clear scene only.
- Maximum 3 characters.
- Maximum 1 main object.
- Maximum 2 to 3 supporting elements.
- Keep large breathing space and a fast-to-read focal point.
- Stay close to colored sketch language, not polished cartoon rendering.
- Keep the completed prompt close to the template wording unless the post requires a sharper core idea or scene.

## Output Contract

- Return only the completed final prompt.
- Do not explain the extraction process unless the user asks.
- Keep the prompt specific to the target post and image intent.
