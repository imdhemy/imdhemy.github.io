---
layout: post
title: "A Simple Currying Refactor: Remove Pass-Through Arguments"
date: 2026-03-16T12:32:33Z
categories: [ fp ]
tags: [ "fp", "javascript", "currying" ]
list: "Sharpen Currying Skills"
image: /assets/img/remove-pass-through-argument.png
---

Like I said at the beginning of this series, I wanted refactoring existing code to use currying and partial
application to feel natural and intuitive. This heuristic is a big part of that.

This post covers one simple heuristic for spotting those cases. By the end, you should be able to look at a small
wrapper function and tell whether it can be replaced with partial application.

## What it is

If a parameter is only passed as it is to another function, the wrapper is probably not doing anything useful. In many
cases, you can remove that extra parameter and keep the partially applied function instead.

Let's see this in action with a simple example:

Before:

```js
const split = separator => str => str.split(separator);
const words = str => split(" ")(str);

// Usage:
console.log(words("hello world")); // ["hello", "world"]
```

Here, `words` takes `str` and passes it directly to `split(" ")`. It does not change `str`, and it does not add any
new behavior.

So the wrapper is not really needed. We can keep the partially applied function itself:

After:

```diff
const split = separator => str => str.split(separator);
- const words = str => split(" ")(str);
+ const words = split(" ");

// Usage remains the same:
console.log(words("hello world")); // ["hello", "world"]
```

The nice part is that usage stays the same. We still call `words("hello world")`, but now the implementation is
smaller and more direct.

## Why it matters

This matters because this kind of wrapper shows up a lot, and after some time it just adds extra code for no real
benefit. Once you start noticing it, many refactors become easier and cleaner.

## The mechanics

Here is the idea:

1. Look for a parameter that is only passed unchanged. In the example above, that is `str`.
2. Check if the wrapper is doing anything else besides passing that value.
3. If not, remove the wrapper parameter and keep the partially applied function.

## Safety checklist

- The argument is passed through unchanged.
- The wrapper does not transform the argument in any way or use it for anything else.
- The function you call supports currying in that argument order.
- The result is easier to read, not harder.

## Exercises

<div class='tip'>
To get the best out of this series, I recommend spending 15-25 minutes solving the exercises on your own, then checking
the answers.
</div>

### 1. Remove pass-through from words

Refactor:

```js
const split = separator => str => str.split(separator);

const words = str => split(" ")(str);
```

<details markdown='1'>
<summary>Show answer</summary>

```js
const split = separator => str => str.split(separator);

const words = split(" ");
```

</details>

### 2. Remove pass-through from filterQs

Refactor:

```js
const filter = predicate => xs => xs.filter(predicate);

const filterQs = xs => filter(x => /q/i.test(x))(xs);
```

<details markdown='1'>
<summary>Show answer</summary>

```js
const filter = predicate => xs => xs.filter(predicate);

const filterQs = filter(x => /q/i.test(x));
```

</details>

### 3. Decide whether to refactor this wrapper

Decide whether to refactor and explain why:

```js
const clean = str => trim(str).toLowerCase();
```

<details markdown='1'>
<summary>Show answer</summary>

Do not refactor with this heuristic.
`str` is not a pass-through argument because it is used in `trim(str)` and then transformed again by `.toLowerCase()`.

</details>

## Checkpoint

<div class='info' markdown='1'>
You are ready to move on when you can look at a small wrapper and quickly tell if it is doing real work or just passing
data through.
</div>
