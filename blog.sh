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

# Print arguments
echo "----------------------------------------------------"
echo "Creating new blog post with the following arguments:"
echo "----------------------------------------------------"
echo "Title: $title"
echo "Category: $category"
echo "Draft: $draft"

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


## If draft is true, create a draft file in drafts folder
if [ "$draft" == true ]; then
    mkdir -p ./_drafts/"$category"
    echo "$contents" > ./_drafts/"$category"/"$file_name"
else
    mkdir -p ./_posts/"$category"
    echo "$contents" > ./_posts/"$category"/"$file_name"
fi
