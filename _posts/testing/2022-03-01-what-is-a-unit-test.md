---
layout: post
title: What is a unit test
date: 2022-03-1T06:05:51.560Z
categories: testing
---

Classical and London Schools of unit testing.
Unit Test:
- Verify a small piece of code. 
- Does it quickly.
- Does in an isolated manner. (London vs classic)

The London take
If a class has a dependency on another class, or several classes, you need to replace all such dependencies with test doubles. 

PROS
- u can easily find the error location if the test fails.
- Splits the object graph. The class under test may depend on other classes that depends on other class and so on. Classes may even introduce a circular dependency.

Example: page 25
customer purchase a product example.
Success: dec. the inventory level.

The Classical take
It is not the code that needs to be tested in an isolated manner. Instead, unit tests themselves should be run in isolation from each other. [Parallel, Sequentially, any order]

Dependencies: shared, private, out-of-process

This take on the isolation entails a much more modest view on the use of mocks and other test doubles, You can still use them, but you normally do that for only those deps. that introduce a shared state between tests, not between classes under tests.

++ Volatile dependency:
- Requires additional setup and not installed on the machine. (Databases, APIs)
- Non-deterministic behaviour, (Random number generator)

--- 
- Value objects are immutable
- They are language agnostic

--- 

Contrasting the classical and london schools of unit testing

Instead of finding ways to test a large, complicated graph of interconnected classes, you should
focus on not having such a graph of classes in the first place. More often than not, a large class
graph is a result of a code design problem. 

