---
layout: post
title: We need more tests
date: 2022-01-18T06:05:51.560Z
categories: testing
---

Well, It's not about Coronavirus pandemic this time 😷. [Moisés Belchín Martínez](https://moisesbm.wordpress.com/) (Moi), my awesome ex-CTO, keeps repeating these words in every PR **"We need more tests"**. Sometimes it appears as a joke about Covid-19, but I believe he totally meant it.

There's a reason for optimism about your own code because you wrote it, it works, and you did your best following the best practices of clean code, but is that enough to merge and release this code? TBH, No!

Moi doesn't mean the quantity, but actually he meant the quality of tests we wrote to avoid the [technical debt](https://www.atlassian.com/agile/software-development/technical-debt) as much as possible by having [a strict definition of Done](https://www.linkedin.com/feed/update/urn:li:activity:6886937179793223680?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6886937179793223680%2C6888937049659854849%29). In this article, I'm discussing the metrics of code coverage, are they reliable enough? de we really need more tests? What makes a successful test suite?

## What is the goal of unit testing?

A simple question, yet one that must be addressed! The goal of unit testing is to allow **sustainable growth** of the software project. When you start a new project, you make progress so quickly, and get results with a little slaps on your keyboard. No bad architectural decisions have been made yet. No requirement changes or existing code to worry about. Actually, nothing is dragging you back. Eventually, the development speed slows down, and adding a new feature may break another. 

As per wikipedia, the idea that software eventually rots as it is changed is called **Software entropy**. Any code modification leads to an amount of disorder in your code base. Leaving entropy without proper care, such as constant cleaning and refactoring, the system becomes increasingly complex and disorganized.

Software entropy is tied to the notion of change and has no meaning in a static system. If there is no intent to alter the system, we cannot speak of its entropy. One more idea to put in mind, when software entropy overwhelms a project, the project freezes!

Tests act as a safety net. Tests help make sure the existing functionality works, even after you introduce new features or refactor the code to better fit new requirements. Besides, it helps have a well-designed software.

## Don't just throw more tests
Not all tests are created equal. Some of them are valuable and contribute a lot to overall software quality. Others don't. You can't achieve the goal of unit testing by just throwing more tests at the project. Let's discuss the **QUANTITY** aspect. **Coverage metrics** are used to show how much source code a tests execute. It gives you a percentage from `0%` (No source code executed) to `100%` (It covers all lines of code).

If a metric shows that is there too little coverage in your code base, say, only 10%. That's a good indication that you are not testing enough. But the reverse isn't true: even 100% coverage isn't a guarantee that you have a good-quality test suite. A test suite that provides high coverage can still be of poor quality.

Consider the following example, using the code coverage as a metric. 

**Read the code comments:**

```java
// Source code (5 lines of code)
public static bool isStringLong(string input) {
    if (input.length > 5)
        return true; // Not covered with test
    return false;
}
```

```java
// The following test calls the `isStringLong` function. 
// The if condition evaluates to `false`, then it retuens false.
// This code executes (4) lines out of toal (5) lines of code.
public void Test() {
    bool actual = isStringLong("abc");
    Assertions.AssertFalse(actual);
}
```

With a simple calculation using the code coverage formula:

$$Code\ coverage = \frac{Lines\ of\ code\ executed}{Total\ number\ of\ lines}$$

$$Code\ coverage = \frac{4}{5} = 0.8 = 80\%$$

Now, with the same test, what if we refactored our function to remove the unnecessary if condition:
```java
public static bool isStringLong(string input) {
    return input.length > 5;
}
```
When rerunning our test, it executes the full lines of code with 100% coverage! The test still verifies the same number of possible outcomes and without any improvement to our test suite, the test coverage percentage raised from 80% to 100%.

As a conclusion, having a low test coverage is an indication of a bad test suite, but having a high number tells nothing about the **QUALITY** of the test suite.

## What makes a successful test suite?

## What's next?
