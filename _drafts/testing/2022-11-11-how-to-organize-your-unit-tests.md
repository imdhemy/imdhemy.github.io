---
layout: post
title: How to organize your unit tests
date: 2022-11-11T22:48:41.NZ
categories: testing
---

One day, on the school of medicine, the lecturer told us an important thing about naming. He was explaining the self clearing mechanism of the airways in the respiratory system which is known as **mucociliary escalator** and he said, to understand anything in medicine, you need to understand the idea behind the name, you need to understand the culture behind the name. Check the following image, it auto-moves the particles outside the lungs like an escalator.

We are not native English speakers, so this advice applies to us.

![mucociliary escalator](/assets/img/mucociliary-escalator.gif)


I believe it's the same for programming, understanding the idea or the culture behind the name makes it easier to understand the concept. So, let's talk about the idea behind the names of the unit tests.

## The names in testing

In general, testing is finding out how well something works. In terms of human beings, testing tells what level of knowledge or skill has been aquired. In terms of electronics, testing tells how well the device works.

The deivce under test is the thing that is being tested. In the case of testing a car stability the car is the device under test. It's referred to as **DUT**.

Engineers may use a device called **test fixture** to test the DUT. The test fixture is a device that is used to hold the DUT in a specific position or to provide a specific input or output to the DUT. In the case of testing if a car stability, the test fixture may be a ramp.

Let's map this to programming. The DUT will be **SUT** (System under test). The test fixture is a peice of data that could be a dependency or an argument passed to the SUT. It can also be data in the database or a file in the file system. 

<p class=note>
Test fixture's state and behavior should not change during the test, the ramp remains a ramp, or at least the changes should be predictable and controllable.
</p>

