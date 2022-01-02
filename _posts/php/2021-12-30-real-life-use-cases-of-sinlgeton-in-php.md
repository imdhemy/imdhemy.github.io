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
The Singleton class declares the static method `getInstance` that returns the same instance of its class. To do so, we declare a static private property that holds the instance. By checking its value we can decide whether to create a new instance or return the already instantiated one. The Singleton `constructor` should be hidden from the client code. Calling the `getInstance` method should be the only way to create an instance of the Singleton class. Cloning the object should be prevented as well.

Let's check the code and tests, I start by writing tests...

```php
//SingletonTest.php
<?php

namespace Tests;

use Com\Imdhemy\Singleton;
use Error;

class SingletonTest extends TestCase
{
    /**
     * @test
     */
    public function it_can_be_instantiated_by_a_static_factory_method()
    {
        $instance = Singleton::getInstance();
        $this->assertInstanceOf(Singleton::class, $instance);
    }

    /**
     * @test
     */
    public function it_must_return_the_same_instance_every_time()
    {
        $firstCall = Singleton::getInstance();
        $secondCall = Singleton::getInstance();

        $this->assertSame($firstCall, $secondCall);
    }

    /**
     * @test
     */
    public function it_should_not_be_instantiated_through_a_constructor()
    {
        $this->expectException(Error::class);
        new Singleton();
    }

    /**
     * @test
     */
    public function it_should_not_be_cloned()
    {
        $this->expectException(Error::class);
        $instance = Singleton::getInstance();
        clone $instance;
    }
}

```

And here is the Singleton class code...
```php
//Singleton.php
<?php

namespace Com\Imdhemy;

class Singleton
{
    /**
     * @var Singleton|null
     */
    private static ?Singleton $instance = null;

    /**
     * Singleton constructor
     */
    private function __construct()
    {
        //
    }

    /**
     * Prevents Cloning
     */
    private function __clone(): void
    {
        //
    }

    /**
     * @return Singleton
     */
    public static function getInstance(): Singleton
    {
        if (is_null(static::$instance)) {
            static::$instance = new static();
        }

        return static::$instance;
    }
}
```

Laravel container note: it's completely fine to have a single object within your application, but it's not fine to make it impossible to make a second instance.