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


