# Post File Workflow

Use this workflow when creating or updating Markdown or writing files.

## Approval

Always ask explicit approval before creating or editing writing files.

Approval must be explicit in chat. Do not infer approval from a general writing request.

## General Writing Files

When working outside the blog post structure:

- preserve the existing file format
- preserve metadata unless Dhemy asks to change it
- preserve links, images, code blocks, embeds, and special syntax unless a change is approved
- edit only the requested scope
- ask before renaming, moving, or deleting files

## New Blog Post Location

Create new posts under `_posts` by default unless Dhemy explicitly asks for a draft:

```text
_posts/<category>/<YYYY-MM-DD>-<slug>.md
```

If the category is unknown, ask Dhemy. Do not silently choose a category unless the conversation makes it clear.

Use `generic` only when Dhemy accepts the default or the topic clearly belongs there.

Use the current date in `YYYY-MM-DD` format as the filename prefix. Only create files under `_drafts` when Dhemy asks for a draft.

## Slug

Generate a lowercase slug from the final title:

- use ASCII letters and numbers
- replace spaces with hyphens
- remove punctuation
- keep it short but meaningful
- avoid vague slugs like `new-post` or `thoughts`

## Front Matter

Use this minimum front matter for new posts:

```yaml
---
layout: post
title: "Post title"
categories: [ "category" ]
tags: []
---
```

Rules:

- Omit `date` because the post date is expressed by the filename unless Dhemy asks for an explicit front matter date.
- Omit `image`, `image_alt`, and `image_source` unless an image exists.
- Add `math: true` only when the post uses MathJax.
- Do not add `created_at` or `updated_at` unless the target repo convention changes or an existing post already uses them.
- Preserve existing front matter when editing posts, except for approved title changes.

## Existing Blog Posts

When editing an existing post:

- preserve categories, tags, layout, image fields, dates, and other front matter unless Dhemy asks to change them
- title may be edited as part of the writing work
- body may be edited as part of the writing work
- do not rename or move the file unless Dhemy asks

## Final Response

After creating or updating a file, return:

- the file path
- a short summary of what changed
- any useful next step, such as adding an image or reviewing a section
