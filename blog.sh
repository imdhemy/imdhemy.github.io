#!/bin/bash -e

draft=false
category="uncategorized"
title=""

while true; do
  case "$1" in
    -d | --draft ) draft=true; shift ;;
    -c | --category ) category="$2"; shift 2 ;;
    -t | --title ) title="$2"; shift 2 ;;
    * ) break ;;
  esac
done

# Title is required
if [ -z "$title" ]; then
  echo "Title is required"
  exit 1
fi

# Show input and confirm
echo "---------------------------"
echo "Title: $title"
echo "Category: $category"
echo "Draft: $draft"
echo "---------------------------"
read -p "🙋Continue? (y/n) " -n 1 -r
echo ""

# Exit if not confirmed
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "👋 Aborted"
  exit 0
fi

# Create slug from the title
slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# filename example : 2016-01-01-title.md
file_name=$(date +%Y-%m-%d)-$slug.md
# publish date example 2021-05-15T17:18:23.973Z
publish_date=$(date +%Y-%m-%dT%H:%M:%S.%NZ)

# Get post stub contents from template and keep formatting
contents="---
layout: post
title: {{title}}
date: {{publish_date}}
categories: {{category}}
---
"

# Replace placeholders in stub with actual values followed by newline
contents=${contents//\{\{title\}\}/$title}
contents=${contents//\{\{publish_date\}\}/$publish_date}
contents=${contents//\{\{category\}\}/$category}

# File directory and path based on draft status
if [ "$draft" == true ]; then
    file_dir="_drafts/$category"
    file_path="$file_dir/$file_name"
else
    file_dir="_posts/$category"
    file_path="$file_dir/$file_name"
fi

# Create directory if it doesn't exist
if [ ! -d "$file_dir" ]; then
    mkdir -p "$file_dir"
fi

# Check if file exists
if [ -f "$file_path" ]; then
    echo "❌️File already exists"
    exit 1
fi

# Create file and write contents
echo "$contents" > "$file_path"

echo "✅ Created file at $file_path"
