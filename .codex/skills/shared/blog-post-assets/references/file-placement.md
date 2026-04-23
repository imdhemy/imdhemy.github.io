# File Placement Rules

## Destination Directory

Always place copied post images under:

- `assets/img/`

The front matter path must always use:

- `/assets/img/<filename>`

## Copy Rules

- Copy the provided image into `assets/img/`.
- Preserve the original file extension unless the user requests conversion.
- Do not write outside `assets/img/`.

## Collision Rules

- If the destination file does not exist, create it.
- If the destination file already exists and is the canonical image for the same post, replacing it is acceptable.
- If the destination file already exists but belongs to a different post or the ownership is unclear, stop and ask instead of overwriting it.
