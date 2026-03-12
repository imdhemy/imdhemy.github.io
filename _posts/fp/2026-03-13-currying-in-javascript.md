---
layout: post
title: Currying in JavaScript
date: 2026-03-12T23:07:01Z
categories: [ fp ]
tags: [ "fp", "javascript", "currying" ]
image: /assets/img/currying-in-javascript.png
list: "Sharpen Currying Skills"
---

In this post, I want to keep things simple: what currying is, how it relates to partial application, and why it can be
useful in real JavaScript code.

## What is currying?

Currying transforms a function of many arguments into a chain of one-argument functions.

```js
// uncurried
const add = (a, b) => a + b;

// curried
const addC = a => b => a + b;
```

Instead of passing all arguments at once, you pass them one at a time. Each call returns a new function that waits for
the next argument until the final result can be produced.

A small example makes it easier:

```js
const add = a => b => a + b;
// The you can call it like this:
add(2)(3); // 5

// Or you can partially apply it:
const increment = add(1);
const add5 = add(5);

// And call it later:
increment(4); // 5
add5(10); // 15
```

## Currying vs partial application

These ideas are related, but they are not the same. I used to blur them together, so it is worth separating them
clearly. **Currying** changes the shape of a function. **Partial application** uses that shape to pre-fill some
arguments and get back a more specific function.

Here is a simple example:

```js
const multiply = a => b => a * b; // curried function

const double = multiply(2); // partial application

double(5); // 10
```

`multiply` is curried because it takes one argument at a time. `double()` is the result of partial application because
we fixed the first argument to `2` and got back a more specific function.

## Why this is useful

The main thing I like about currying is that it helps me build small reusable functions from more general ones.

```js
const replace = regex => replacement => str => str.replace(regex, replacement);

const replaceSpaces = replace(/\s+/g)("-");

replaceSpaces("functional programming in js"); // "functional-programming-in-js"
```

This is useful when you want to configure a function once and then reuse it in several places without repeating the
same arguments over and over.

### Exercises

<div class='tip'>
To get the best out of this series, I recommend spending 15-25 minutes solving the exercises on your own, then checking
the answers.
</div>

### 1. Curry multiply

Convert this `multiply` function to curried form:

```js
const multiply = (a, b) => a * b;
```

<details markdown='1'>
<summary>Show answer</summary>

```js
const multiply = a => b => a * b;
```

</details>

### 2. Curry replace

Convert this `replace` function to curried form:

```js
const replace = (regex, replacement, str) => str.replace(regex, replacement);
```

<details markdown='1'>
<summary>Show answer</summary>

```js
const replace = regex => replacement => str => str.replace(regex, replacement);
```

</details>

### 3. Explain the first application

Explain in your own words:

- What does `multiply(2)` return?
- Why is that useful?

<details markdown='1'>
<summary>Show answer</summary>

`multiply(2)` returns a new function that is still waiting for the second argument (`b`).
That is useful because it gives you a reusable function for a more specific job, for example:

```js
const double = multiply(2);
double(5); // 10
```

</details>

## Checkpoint

<div class='info' markdown='1'>
You are ready to continue when you can quickly convert between uncurried and curried forms, and explain how partial
application is related but different.
</div>
