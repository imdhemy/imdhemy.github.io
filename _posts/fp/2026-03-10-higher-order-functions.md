---
layout: post
title: Higher-order functions for currying in JavaScript
date: 2026-03-10T00:07:09Z
categories: [ fp ]
tags: [ "fp", "currying", "javascript" ]
image: /assets/img/higher-order-fn.png
list: "Sharpen Currying Skills"
---

I've been working on my [functional programming]({{ site.baseurl }}/tag/fp) skills and applying what I learn in real
JavaScript projects. [JavaScript]({{ site.baseurl }}/tag/javascript) is a great choice for FP because it fits the
paradigm well, has helpful libraries, and still lets me fall back to familiar patterns when I hit a knowledge gap.

While practicing currying, I noticed something: I can read it and understand it, but refactoring existing code to use
currying and partial application still feels awkward. So I decided to collect the concepts that make that refactoring
process more intuitive. There are thousands of great resources on these topics, but I wanted a micro-curriculum that
matches my learning style and maybe helps others too. The first concept is higher-order functions, which is the
foundation for [currying]({{ site.baseurl }}/tag/currying) and composition.

<div class='info' markdown='1'>
**Goal**: Understand functions as values and function-to-function interaction.
</div>

## What is a higher-order function?

A higher-order function (HOF) is any function that takes a function as an argument, returns a function, or both.
Functions that do neither are called first-order functions.

A good example of a HOF is [
`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
which takes a function as an argument and applies it to every element of the array, returning a new array with the
results.

```js
// This is a simple function that doubles a number
const double = x => x * 2;
// We can pass the `double` fn to `map`. This makes `map` a HOF.
const doubledNumbers = [1, 2, 3].map(double); // [2, 4, 6]
```

Here is another example of a HOF that returns a function:

```js
// This is a HOF that returns a function
const createMultiplier = factor => {
  return x => x * factor;
};

// We can use the HOF to create a new function that multiplies by 3
const triple = createMultiplier(3);

// Now we can use the `triple` function to multiply numbers by 3
triple(5); // 15
```

## Why this matters for currying

Currying becomes much easier when you are comfortable with functions as values. A curried function is just a function
that keeps returning functions until it has all the arguments it needs.

```js
const add = x => y => x + y;

const add10 = add(10);
add10(5); // 15
```

If that pattern feels natural, currying and partial application stop feeling magical and start feeling practical.

For now, don't worry about mastering currying in this post. We'll focus on higher-order functions first, then cover
currying properly in a separate post.

## Exercises

<div class='tip'>
To get the best out of this series, I recommend spending 15-25 minutes solving the exercises on your own, then checking
the answers.
</div>

### 1. Apply twice

Write a function `applyTwice` that takes a function and a value, and applies the function to the value twice.

<details markdown='1'>
<summary>View answer</summary>

You can implement `applyTwice` like this:

```js
const applyTwice = (fn, x) => fn(fn(x));
```

Here is an example of how to use `applyTwice`:

```js
const increment = x => x + 1;
applyTwice(increment, 5); // 7
```

</details>

### 2. Build mapWith

Implement `mapWith` using `Array.prototype.map`.

<details markdown='1'>
<summary>View answer</summary>

```js
const mapWith = (fn, xs) => xs.map(fn);
```

Usage example:

```js
const increment = x => x + 1;
mapWith(increment, [1, 2, 3]); // [2, 3, 4]
```

</details>

## Checkpoint

<div class='info' markdown='1'>
You are ready to move on when you can explain why each of `map`, `filter`, and `reduce` are higher-order functions.
</div>

If this helped, leave a reaction so I know this series is useful, and comment with the FP topic you want next while we
prepare the dedicated currying post.
