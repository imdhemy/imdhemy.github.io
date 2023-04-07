---
layout: post
title: How to organize your unit tests
date: 2022-11-11T22:48:41.NZ
categories: testing
---

One day, in the school of medicine, the lecturer told us an important thing about naming. He was explaining the
self-clearing mechanism of the airways in the respiratory system which is known as **mucociliary escalator** and he
said, to understand anything in medicine, you need to understand the idea behind the name, you need to understand the
culture behind the name. Check the following image, it auto-moves the particles outside the lungs like an escalator.

We are not native English speakers, so this advice applies to us.

![mucociliary escalator](/assets/img/mucociliary-escalator.gif)
![escalator fail](/assets/img/escalator-fail.gif)

I believe it's the same for programming, understanding the idea or the culture behind the name makes it easier to
understand the concept. So, let's talk about the idea behind the names of the unit tests.

## The names in testing

In general, testing is finding out how well something works. In terms of human beings, testing tells what level of
knowledge or skill has been acquired. In terms of electronics, testing tells how well the device works.

The device under test is the thing that is being tested. In the case of testing car stability, the car is the device
under test. It's referred to as **DUT**.

Engineers may use a device called **test fixture** to test the DUT. The test fixture is a device that is used to hold
the DUT in a specific position or to provide a particular input or output to the DUT. In the case of testing car
stability, the test fixture may be a ramp.

Let's map this to programming. The DUT will be **SUT** (System under test). The test fixture is a piece of data that
could be a dependency or an argument passed to the SUT. It can also be data in the database or a file in the file
system.

<div class=tip>
The test fixture's state and behavior should not change during the test, the ramp remains a ramp, or at least the changes should be predictable and controllable.
</div>

## Test file location

There are two conventions for organizing the test files. The first one is to put the test files in the same directory as
the source files. The second one is to put the test files in a separate directory. The first is called **in-place** and
the second is called **out-of-place**.

**In-place** tests are painless to find, you see at a glance if a part of your application lacks tests. When you move
the source (inevitable), you remember to move the test, When you rename the source (inevitable), you remember to rename
the test. The downside is where to put integration tests, as they don't belong to any specific source file. It's often
better to create an appropriate directory for them in the `tests` directory.

**Out-of-place** tests have a natural home directory `tests`. The directories and files in the `tests` directory should
mirror their corresponding source files. This way, you can easily integrate the tests with your IDE.

I prefer the **out-of-place** convention, even if I have to remember to move or rename the test files to reflect the
changes in the source files, but I'm not dogmatic about it. I'm open to changing my mind if I find a good reason to do
so.

## How to struct a test case

Structuring a test case starts with naming the test method. It's often to encounter the following
pattern: `[MethodUnderTest]_[Scenario]_[ExpectedResult]`. I used to follow this pattern, but I found it not very
helpful. It focuses on the implementation details, not the behavior.

The pattern I prefer is PLAIN ENGLISH. We describe in plain English what we're testing in a language easy to understand,
even for non-programmers.

Using plain English is required by the nature of some test frameworks. For example, in the case
of [Jest](https://jestjs.io/), the test method name is the test case name. So, you have to use plain English to name the
test method. You can do the same with the xUnit frameworks.

I also prefer to separate words by underscores, it makes it easier to read. I use snake case for the test method names,
even if the convention in the language or the framework is camel case. Yes, I know it's not consistent and it breaks the
coding style, but I'm open to breaking rules if I find a good reason to do so. It's easy to exclude the test files from
the coding style check of this rule.

The good reason here is readability, just compare the readability of the following two test method names:

```
ItShouldIlluminateTheLedAtLowLevelLight
```

```
It_should_illuminate_the_led_at_low_level_light
```

The snake case version is much easier to read, as it resembles the natural way of using spaces between words.

**So, what about the body of the test case?**

The `Given-When-Then` or `Arrange-Act-Assert` is a great way to structure test cases. It prescribes an order of
operations:

### Given (Arrange)

The `Given` section is where you set up the test case. You do all the preparations to make the test case ready to run.
You may require a fixture, a dependency, a database, a file, etc. You need also to set the initial state. This section
should end by creating the SUT instance in the initial state.

As far as I know, all xUnit frameworks provide a `setup` method to do the preparations. Even though this is not the
place to put the `Given` section.

<div class=tip>
The `setup` method is not the place to put the `Given` section. The `setup` method is for the preparations that are common to all test cases. The `Given` section is for the preparations that are specific to the test case.
</div>

Putting the `Given` section in the `setup` method is not a good idea, because it makes the test case less readable, and
it couples the test cases together. If you need to change the initial state of the SUT, you have to change the `setup`
method, which may break other tests. The `Given` section should be as close to the `When` section.

If your `Given` section has a boilerplate code, you can extract each part to a factory method with a descriptive name.
This way, you can reuse the factory method in other test cases.

For instance, `createUser()`, `createUserWithOrders()`, and `createUserWithOrdersAndPayments()` are factory methods that
create a user with a different initial state.

### When (Act)

The `When` section is where you execute the action under test. It SHOULD be a single operation. If you need to execute
multiple operations, it's a sign that you are not unit testing! You can find more about this in
the [What is a unit test?](/blog/testing/what-is-a-unit-test) post.

### Then (Assert)

The `Then` section is where you assert the expected result. Assertions will ultimately determine the success or failure
of the test case. Each xUnit framework provides a set of assertion methods. You can use them to assert the expected
result or you can require a third-party assertion library. For example, [Chai](https://www.chaijs.com/) is a popular
assertion library for Node.js. PHPUnit has a built-in assertion library, but Laravel provides a wrapper for
the [PHPUnit assertions](https://laravel.com/docs/9.x/http-tests#available-assertions).

## Don't abuse database fixtures and seeds

You may encounter a test suite that uses database fixtures to set the initial state of the database. This is a bad idea.
Do you remember when we said A RAMP IS A RAMP? if some data is going to change, it's not a fixture anymore. The
downsides of using database fixtures are:

You have to run the DB fixtures before each test to prepare the initial state, which makes the test suite slow, and
coupled. The thing which breaks the test isolation.

Changing a state of a DB fixture in one test will affect the other tests, and it forces you to run them in a specific
order.

So, what's a fixture then? A fixture is a piece of data that should not change during the test. It could be a JSON file
containing a particular response, a file to test the upload functionality, or a database record containing a global
configuration or a list of countries.

**Seeds** are a different thing. Seeds are used to plant initial data to a Database. It's extremely useful when you need
to populate your application with data once installed, let's say an admin user or an example blog post. Seeds are not
used in the test suite.

**So, what's the solution?** use factories! Either factory methods or factory classes.

## Summary

In this post, we talked about the location of test files, **in-place** or **out-of-place**. We also talked about using
plain English to name the test methods and separating words by underscores. The `Given-When-Then`
or `Arrange-Act-Assert` is a great way to structure test cases. Do you remember what is a fixture? how to use them? and
the anti-patterns of the `Given` section.
