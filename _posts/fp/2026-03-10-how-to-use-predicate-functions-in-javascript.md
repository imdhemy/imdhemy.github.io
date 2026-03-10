---
layout: post
title: "Predicate Functions in JavaScript: A Currying Step"
date: 2026-03-10T19:06:12Z
categories: [ fp ]
tags: [ "fp", "javascript", "currying" ]
image: /assets/img/predicates.png
---

If you've written code in any programming language, you've already used predicate functions, even if you never called
them that.

You already know this pattern, but naming it is useful. Terms help teams communicate ideas quickly. The moment you say
"[Replace primitive with object](https://refactoring.com/catalog/replacePrimitiveWithObject.html)", your teammate and
your AI tool understand what you mean without extra explanation. The same is true for predicate functions.

This is why I decided to write this post: to give you a name for this common pattern and show you how it fits into the
larger picture of functional programming and currying.

## What is a predicate function?

<div class='info' markdown='1'>
A predicate function is a function that returns a boolean value `true` or `false`.
</div>

They are often used with [Higher-order functions]({% post_url
fp/2026-03-10-higher-order-functions %}) like `filter`, `find`, `some` and `every` to derive decisions based on the
data.

Let's look at a single example of a predicate function used with `filter`:

```js
// A predicate to check if a number is even
const isEven = x => x % 2 === 0;

// Using the predicate to derive a new array of even numbers.
const evenNumbers = [1, 2, 3, 4, 5, 6].filter(isEven); // [2, 4, 6]
```

### Exercises

<div class='tip'>
To get the best out of this series, I recommend spending 15-25 minutes solving the exercises on your own, then checking
the answers.
</div>

### 1. Write basic predicates

Write `isEven`, `isLongerThan3`, and `hasQ` predicates.

<details markdown='1'>
<summary>Show answer</summary>

```js
const isEven = x => x % 2 === 0;
const isLongerThan3 = x => x.length > 3;
const hasQ = x => /q/i.test(x);
```

</details>

### 2. Use predicates with arrays

Use predicates to:

- keep only even numbers from `[1, 2, 3, 4, 5, 6]`
- keep only strings that contain `q` (case-insensitive)

<details markdown='1'>
<summary>Show answer</summary>

```js
[1, 2, 3, 4, 5, 6].filter(isEven); // [2, 4, 6]
["quiet", "bat", "Qatar", "dog"].filter(hasQ); // ["quiet", "Qatar"]
```

</details>

### 3. Refactor inline predicate to named predicate

Refactor this into a named predicate + filter:

```js
const result = xs => xs.filter(x => /q/i.test(x));
```

<details markdown='1'>
<summary>Show answer</summary>

```js
const hasQ = x => /q/i.test(x);
const result = xs => xs.filter(hasQ);
```

</details>

## Checkpoint

<div class='info' markdown='1'>
You are ready to continue when you naturally extract inline boolean logic into named predicates.
</div>
