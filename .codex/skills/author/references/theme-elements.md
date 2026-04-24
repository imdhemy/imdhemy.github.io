# Theme Elements

Dhemy's Jekyll theme supports more than plain Markdown. Use these elements when they improve teaching, clarity, or readability.

Reference source:

- `../imdhemy-jekyll-theme/example/_posts/2022-12-22-elements.md`

## Headings

Markdown headings from `#` to `######` are supported.

Use headings to make the argument scannable. Do not add decorative headings.

## Lists

Ordered and unordered lists are supported.

Use lists for steps, traits, trade-offs, or examples. Avoid list padding.

## Tables

Markdown tables are supported, including wide tables.

Use tables only for real comparison. Do not use tables as decoration.

## Admonitions

The theme supports:

```html
<div class="note">
  <p>Content.</p>
</div>
```

```html
<div class="tip">
  <p>Content.</p>
</div>
```

```html
<div class="info">
  <p>Content.</p>
</div>
```

```html
<div class="caution">
  <p>Content.</p>
</div>
```

```html
<div class="danger">
  <p>Content.</p>
</div>
```

Use admonitions deliberately:

- `tip` for memorable rules, heuristics, or practical advice
- `info` for useful background
- `note` for side context
- `caution` for risky practices
- `danger` for harmful practices with serious consequences

For Markdown inside an admonition, use:

```html
<div class="tip" markdown="1">
This is a **bold** text, a [link](https://example.com), and `inline code`.
</div>
```

## Code

Supported code formats:

````markdown
```php
echo "hello";
```
````

```liquid
{% highlight ruby linenos %}
def foo
  puts "foo"
end
{% endhighlight %}
```

```liquid
{% highlight ruby mark_lines="1 2" %}
def foo
  puts "foo"
end
{% endhighlight %}
```

Diff blocks are supported:

````markdown
```diff
+ added line
- removed line
```
````

Use inline code for commands, identifiers, filenames, and technical terms.

## Media

Supported media:

- Markdown images
- YouTube iframes
- Vimeo iframes
- SoundCloud iframes
- Spotify iframes

When editing posts, preserve existing media unless Dhemy asks to change it.

## Math

MathJax is supported.

Inline formula:

```markdown
$x^2 + y^2 = z^2$
```

Block formula:

```markdown
$$
\int_0^\infty x^2 dx
$$
```

If a post uses MathJax, add or preserve:

```yaml
math: true
```

Do not use math unless the article actually needs it.
