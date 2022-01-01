---
layout: post
title: PHP Real-life use cases of singleton design pattern
date: 2021-12-30T12:45:00.000Z
categories: php
---
The singleton pattern insures that a class has only one instance and provides global access to it. Okay, many developers consider the singleton is an anti-pattern and many others don't. The most common reason for using a singleton is to control access to some shared resources, database connection which is an expensive resource or a file.

The singleton pattern is responsible for:
- Creating an instance of its class.
- Ensures that a class has just a single instance.

This obviously violates the Single Responsibility Principle, as the pattern solves two problems at the same time.

In the following lines, I'll start by explaining **how to implement a singleton**, then I'll discuss how **Laravel Container** uses the singleton pattern, Finally show you how the Local Adapter within the wonderful **Flysystem** PHP package uses the same concept to manipulate files.

## How to implement a singleton


Laravel container note: it's completely fine to have a single object within your application, but it's not fine to make it impossible to make a second instance.