---
layout: post
title: "Write pure functions and eat your vegetables"
categories: [ "fp" ]
tags: [ "fp", "javascript", "pure-functions" ]
image: /assets/img/write-pure-functions-and-eat-your-vegetables.png
---

Pure functions are a fundamental concept in functional programming. A pure function returns the same output for the
same input and does not change anything outside itself.

But pure functions are not the whole app. Real applications still need state, I/O, network calls, databases, logs, time,
and other effects. Functional programming does not make those things disappear. It helps us keep them under control.

I want to say that early because many developers assume functional programming means writing only pure functions. I used
to think that too. Then I got stuck trying to figure out where state, I/O, and wiring should go.

## Functions by the job they do

To understand pure functions, we first need to name the jobs functions do. At the simplest level, many functions are
**mappers**. They take some input and return a relevant output.

A [predicate]({% post_url fp/2026-03-10-how-to-use-predicate-functions-in-javascript %}) is a mapper that returns a
boolean. A factory is a mapper that returns a new object or a new function. A transformer is a mapper that returns a
new shape of the input.

The important distinction starts when a function does more than mapping. Some functions coordinate steps. Some handle
requests or events. Some talk to the network, the database, the file system, or the browser.

Pure functions are all about mapping: input in, output out, and no outside changes.

## Same input, same output

A pure function is deterministic. It returns the same value for the same arguments.

Some built-in functions behave this way:

```ts
Math.max(7, 9); // 9
Math.max(7, 9); // 9

Math.floor(3.14); // 3
Math.floor(3.14); // 3
```

We can write our own pure functions too:

```ts
const double = (x: number): number => x * 2;

double(4); // 8
double(4); // 8
```

The output comes from the input. Nothing else.

Not all built-in functions are pure. For example, `Math.random()` returns a different value each time or at least
you can't predict the value. Also `Date.now()` returns the current timestamp, so it changes every time you call it.
These functions are not pure.

```ts
Math.random(); // 0.8625834166994483
Math.random(); // 0.34723300540473223

Date.now(); // 1781447915258
Date.now(); // 1781447919162
```

Both of them depend on something outside the function: the current time or a random seed. They are not pure.

## No side effects

In pure functions, you don't communicate with the network, you don't change the state, you don't alter the storage,
and so on. You don't do anything outside the function, nor you depend on anything outside the function.

`fetch()` is not pure because it talks to the network, and `localStorage.setItem()` is not pure because it changes the
storage. Even if you call them with the same arguments and they return the same value, they are not pure because
they have side effects. Yes, side effects, this how we call any interaction with the outside world.

## Pure functions are boring

Pure functions are boring, just like vegetables. That is the point.

Vegetables are not exciting. They do not feel like a reward. But they keep the body healthy.

Pure functions do the same thing for code. They are plain, predictable, and easy to reason about. They do not read
hidden
state. They do not change the outside world. They take input and return output.

That boring shape gives us real benefits.

Pure functions are easier to test because the test does not need a database, a network, a clock, or a browser. It only
needs input and expected output.

Pure functions are easier to debug because the result comes from the arguments. If the output is wrong, you know where
to look.

Pure functions are safer to reuse because they do not carry hidden behavior with them. Calling the function does not
secretly update shared state or trigger an external action.

Pure functions are also easier to run in parallel because they do not fight over shared mutable state. No hidden writes.
No surprise I/O. No whatchamacallit side effects.

That is why pure functions matter. They are not impressive because they are clever. They are useful because they are
boring.

## Where pure functions belong

<div class="tip" markdown="1">
Pure functions work best in the middle of the program.
</div>

![Pure functions belong in the middle of the program](/assets/img/write-pure-functions-and-eat-your-vegetables-where-pure-functions-belong.png)

The edges talk to the outside world. They read from the database, receive HTTP requests, write logs, call APIs, or
update the UI.

The middle should do the thinking. It validates, calculates, filters, sorts, transforms, and decides.

That is the practical shape:

1. Read data at the edge.
2. Pass plain values into pure functions.
3. Get plain values back.
4. Write the result at the edge.

The app still has effects. We just stop mixing them with every small decision.

```ts
type CartItem = {
    price: number;
    quantity: number;
};

const calculateTotal = (items: CartItem[]): number =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);
```

The database does not belong inside `calculateTotal()`. The function should not care where the cart came from.

## Keep the vegetables on the plate

You do not need to make every function pure. Some code must talk to the outside world. Some code must coordinate work.
Some code must change state. But when a piece of code can be pure, make it pure.

If a function can take input and return output without touching anything else, keep it that way. That boring choice
gives you code that is easier to test, easier to debug, and easier to trust.

Write pure functions where they fit. Eat your vegetables.
