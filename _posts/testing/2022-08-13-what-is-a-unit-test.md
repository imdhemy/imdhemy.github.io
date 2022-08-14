---
layout: post
title: What is a unit test
date: 2022-08-13T17:21:35.NZ
categories: testing
---

When I started writing this article few months ago, I got blocked by the 
idea of I'm going to write about something that everyone knows about and 
everyone can google the topic and found a ton of articles about the same 
basic topic. 
Should I publish such an article? As I said, I got blocked by this idea, the 
thing that stopped me from completing the series I started about [testing](/blog/testing/we-need-more-tests).

Finally, I decided to write this article to refer to it in case I 
needed in next articles, at least it will be an internal reference.

## What is a unit test?
You should already know about test automation. Given a piece of code, you 
can write another piece of code that verifies the behavior of the first. The 
second piece of code is called a unit test.

<p class="note">
A unit test should verify a small piece of code in isolation quickly.
</p> 

As you can see, a unit test has three characteristics:
- Verifies a small piece of code.
- Is quick to run.
- Works in isolation.

A small piece of code could be a function, a class, a method, or whatever 
you can call a unit. If your test suite's execution time is good enough to 
you, it means tests are quick enough. No doubt, the first two 
characteristics are non-controversial. The third one, isolation, is 
controversial. When it comes to isolation, there are two takes, the Mockist 
take and the Classicist take. Isolation means that the tests are 
isolated from each other, and running them in parallel or in sequence does 
not affect the result.

## Mockist take vs Classicist take
These two tribes are commonly referred to as the Detroit School of TDD 
(Classicist) and the London School of TDD (Mockist). A key difference 
between them is how they treat the dependencies of the code under test.

For the Mockist take, if a class has a dependency on another class or 
service, it is mocked or doubled. This means that isolation here is code 
isolation. But for the Classicist take, if a class has a dependency, the 
dependency should be used as it. It is not the code that needs to be 
isolated during testing. Instead, unit tests themselves should run in 
isolation from each other.

I believe that the style of mocking everything results in a fragile, hard to 
refactor code base. It does not reflect the real scenario, besides, it 
burdens your shoulders with maintaining the mocks when the real source code
changes. I'm not completely opposed to mocking, but we should mock to our 
advantage, wherever it makes our tests more manageable.

Another problem with the Mockist take is detecting changes in other services 
they are integrated with. For example, if a dependency behaviour changed, 
the mockist test will not detect it, it depends on a non-updated mock. Tests 
should be sensitive to the behavior changes and insensitive to the 
structural changes.

<div class="quote">
If I care about the order of operations, I've designed the system wrong. — 
Kent Beck (the Detroit School).
</div>

<div class="quote">
If I have an object that has behaviour, and I’m doing “Tell, Don’t Ask” then 
I can only test interactions. — Steve Freeman (the London School)
</div>

## When to mock vs when to use real dependencies
Hopefully, it's clear now that I prefer the Classicist take. In the 
classicist take, it's not the code that needs to be tested in an isolated 
manner. Instead, the unit tests themselves should be run in isolation from 
each other. The classes under test reside in the memory of the test runner, 
so that they can interact with each other without affecting the test results 
either you run the tests in parallel or in sequence.

But, there is a problem, Okay, they reside in the memory and not affecting 
each other, but what about the shared states? For example, the database and 
file system. Of course, changes in the database will affect the test results.
For instance, one test could create a record in the database, and the other 
test could delete the record as a part of its setup. If you run them in 
parallel, the first test will fail, not because the code is broken, but 
because it is not isolated.

Let's look at three different types of dependencies: the **shared**, the **private** 
and the **out-of-process**. The shared dependencies are the ones that are 
shared across the test suite, for example, a static field, a database record,
and the file system. 

The private dependencies are the ones that are not shared at all, for 
example a private field, or a function parameter.

The out-of-process dependencies are the ones that are the ones that run 
outside the application's execution context. For example an external API.

Given the above, Classist take still can use mocks and test doubles, but 
only do that for the shared dependencies, or the out-of-process dependencies 
in case you need to test a specific behavior of the external service.

## Conclusion
Let's conclude them in **triplets**:

**A unit test has three characteristics:**
- Verifies a small piece of code.
- Is quick to run.
- Works in isolation.

**There are three types of dependencies:**
- Shared.
- Private.
- Out-of-process.

**There are three schools of TDD:**
- The Detroit School.
- The London School.
- The one that your manager told you to use.

**There are three reasons to use mocks:**
- Replacing the shared dependencies.
- The non-deterministic behavior of the out-of-process dependencies.
- To make tests faster. (Replacing DB calls for example.)
