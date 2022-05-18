---
layout: post
title: What is a unit test
date: 2022-03-1T06:05:51.560Z
categories: testing
---

In the previous article we answered the question of "[Do we need more tests?]({{ site.baseurl }}{% link _posts/testing/2022-01-18-we-need-more-tests.md %})". We came across the conclusion of what test quality matters more than quantity. 

In this article, we are going to discuss the different takes of defining **what is a unit test**, as we already answered [Why do we need tests?]({{ site.baseurl }}{% link _posts/testing/2022-01-18-we-need-more-tests.md %}#what-is-the-goal-of-unit-testing).

## Unit Test Definition

As per wikipedia:

> Unit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended.

For a unit test, it should have the following three attributes:

- Verify a **small** piece of code. 
- Does it **quickly**.
- Does in an **isolated** manner.

The first two non-controversial. A small piece of code could be a single class or a single function. If your test suite's execution time is good enough to you, it means tests are quick enough. So what about running in an isolated manner?!

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

---
How to solve TDD problem with classical take.

---
End-to-End test
verifies the system from the end-user point of view including all the external services or applications
this app integrates with.

---
“Programmer tests should be sensitive to behaviour changes and insensitive to structural changes. (…) If I care about the order of operations, I’ve designed the system wrong” — Kent Beck (the Detroit School)
“If I have an object that has behaviour and I’m doing “Tell, Don’t Ask” then I can only test interactions.” — Steve Freeman (the London School)

---
It’s time to spend some time with your test code. Introduce common fixtures (factories, builders, object mothers) and reuse them across your tests. They should be expressed in the domain language and read well. You want them to tell you a story about how the system sticks together. Maybe you can not only simplify the test setup but the system itself?
If it’s still too complex, perhaps your module is trying to do too much. Is there a problem with the design? Bring another pair of eyes and review it again.
The quality of the test code is as important as the quality of the production code. It’s your documentation. Tests must be cheap to write, easy to read, simple to change.

---

Command Query Separation
Discipline for Managing Side Effects
Manage side effects within your code by controlling how and where they occur.  Write functions such that if they change state, they do not return values.  And if they return values, they do not change state.  For example, instead of returning error codes, throw exceptions to indicate a failed state change (such as a database update or user login)

---
These styles can be mixed. In my own coding style, I favor Inside-Out when possible. It helps build more pure code and reduces the coupling with Mocks and Stubs. Because Mocks and Stubs create more code coupling and can end up slowing down development productivity.

