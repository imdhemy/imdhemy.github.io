#!/bin/bash -e

# Validate arguments
if [ $# -lt 2 ]; then
    echo "Usage: <title> <category> [--draft|-d]"
    exit 1
fi

# Get arguments
title=$1

# slug is the lowercase trimmed title with spaces replaced by dashes
slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# slug is the second argument
category=$2

# Draft is boolean, so if it's not passed, it's false
draft=false
if [ "$3" == "--draft" ] || [ "$3" == "-d" ]; then
    draft=true
fi

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
contents=$(echo "$contents" | sed "s/{{title}}/$title/g")
contents=$(echo "$contents" | sed "s/{{category}}/$category/g")
contents=$(echo "$contents" | sed "s/{{publish_date}}/$publish_date/g")

# File directory and path based on draft status
if [ "$draft" == true ]; then
    file_dir="_drafts/$category"
    file_path="$file_dir/$file_name"
else
    file_dir="_posts/$category"
    file_path="$file_dir/$category/$file_name"
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
