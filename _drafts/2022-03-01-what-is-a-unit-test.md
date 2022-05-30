---
layout: post
title: What is a unit test
date: 2022-03-1T06:05:51.560Z
categories: testing
---

In the previous article we answered the question of "[Do we need more tests?]({{ site.baseurl }}{% link _posts/testing/2022-01-18-we-need-more-tests.md %})". We came across the conclusion of the test quality matters more than quantity. 

In this article, we are going to discuss the different takes of defining **what is a unit test**, as we already answered [Why do we need tests?]({{ site.baseurl }}{% link _posts/testing/2022-01-18-we-need-more-tests.md %}#what-is-the-goal-of-unit-testing).

<p class="note">
A unit test should verify a small piece of code in isolation.
</p> 

A small piece of code is a single class or a single function, or whatever you can call a unit. A quick verification or a quick unit test is yet another non-controversial attribute of a unit test. If your test suite's execution time is good enough to you, it means tests are quick enough. The different takes starts with the meaning of isolation.

When it comes to **isolation** there are two takes, the **London school** vs **Classic school**.

Explaining the two takes is beyond the scope of this article. If this sounds new to you, you can check the following articles:

- [Test Driven Development Wars](https://medium.com/@adrianbooth/test-driven-development-wars-detroit-vs-london-classicist-vs-mockist-9956c78ae95f)
- [Classical vs Mockist Testing](https://agilewarrior.wordpress.com/2015/04/18/classical-vs-mockist-testing/)

**In summary**, for the London (Mockist) take, If a class has a dependency on another class, or several classes, you need to replace all such dependencies with test doubles. 

But for the (Detroit) Classical take, It is not the code that needs to be tested in an isolated manner. Instead, unit tests themselves should be run in isolation from each other.

For sure there are some advantages of the London take. For instance, you can easily find the error location if the test fails, as you already mocking all dependencies, so the error is in the unit under test. 

However, I believe that this style of writing mock-everything unit tests results in a fragile unit tests which does not reflect the real scenarios. Besides, it adds a new task on you shoulder as you should maintain and update all mocks when the real source code changes. Tests that use mocking are more closely linked to the code's implementation and thus are more likely to need maintenance if implementation details change.

It's good to mention that mocking is a sub-type of **Test doubles**, and understanding the notion of test doubles, gives you a good idea when and what to mock. We should mock to our advantage, wherever it makes our tests more manageable.

Bob Martin has suggested the following relationship among the different kinds of test doubles:

<img style="width: 40%; display: block; margin: auto" src="/assets/img/test-doubles.png"  alt="Test doubles"/>

If I truly need a test double, I go to the highest level in the class hierarchy diagram above that will get the job done. In other words, don’t use a mock if a spy will do. Don’t use a spy if a stub will do, etc. This is because the lower you go in the class hierarchy of test doubles, the more knowledge duplication you are creating. (A test that uses a dummy only knows that a collaborator is used in the code under test. A test that uses a mock knows which method on the collaborator is used, how many times it is invoked, and the types of the parameters that are passed).

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
