# Front Matter Rules

Only update the post front matter needed for the image attachment workflow.

## Image Field

- If `image:` already exists, replace only its value.
- If `image:` is missing, insert it as a top-level front matter field near the other metadata fields.
- Use the canonical path format:
  - `/assets/img/<filename>`

## Preserve Structure

- Keep the existing front matter order and formatting as intact as possible.
- Do not rewrite unrelated fields.
- Do not modify `image_source:` unless the user explicitly asks.
- Do not change the post body.

## Failure Cases

Stop if:

- the front matter block is malformed
- the target file is not a valid post markdown file
