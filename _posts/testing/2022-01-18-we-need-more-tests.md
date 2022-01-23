---
layout: post
title: We need more tests
date: 2022-01-18T06:05:51.560Z
categories: testing
---

Well, It's not about Coronavirus pandemic this time 😷. [Moisés Belchín Martínez](https://moisesbm.wordpress.com/) (Moi), my awesome ex-CTO, keeps repeating these words in every PR **"We need more tests"**. Sometimes it appears as a joke about Covid-19, but I believe he totally meant it.

There's a reason for optimism about your own code because you wrote it, it works, and you did your best following the best practices of clean code, but is that enough to merge and release this code? TBH, No!

Moi doesn't mean the quantity, but actually he meant the quality of tests we wrote to avoid the [technical debt](https://www.atlassian.com/agile/software-development/technical-debt) as much as possible by having a strict definition of Done. In this article, I'm discussing the metrics of code coverage, are they reliable enough? de we really need more tests? What makes a successful test suite?

## What is the goal of unit testing?

A simple question, yet one that must be addressed! The goal of unit testing is to allow **sustainable growth** of the software project. When you start a new project, you make progress so quickly, and get results with a little slaps on your keyboard. No bad architectural decisions have been made yet. No requirement changes or existing code to worry about. Actually, nothing is dragging you back. Eventually, the development speed slows down, and adding a new feature may break another. 

As per wikipedia, the idea that software eventually rots as it is changed is called **Software entropy**. Any code modification leads to an amount of disorder in your code base. Leaving entropy without proper care, such as constant cleaning and refactoring, the system becomes increasingly complex and disorganized.

Software entropy is tied to the notion of change and has no meaning in a static system. If there is no intent to alter the system, we cannot speak of its entropy. One more idea to put in mind, when software entropy overwhelms a project, the project freezes!

Tests act as a safety net. Tests help make sure the existing functionality works, even after you introduce new features or refactor the code to better fit new requirements. Besides, it helps have a well-designed software.

## Are coverage metrics enough to measure test suite quality?

## What makes a successful test suite?

## What's next?
