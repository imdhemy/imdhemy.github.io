---
layout: post
title: Singleton Design Pattern in Laravel
date: 2024-04-15T06:05:51.560Z
categories: [ php ]
image: /assets/img/stay_single.jpeg
image_source: https://unsplash.com/photos/white-and-blue-labeled-carton-jmRikC7H2FA
---

Google search console told me that I got some visits from people searching for "Singleton Design Pattern in Laravel".
But they landed on my [PHP Real-world use cases of singleton design pattern]({% post_url
2021-12-30-real-world-use-cases-of-sinlgeton-in-php %}) post. So I decided to make them happy with a dedicated post
about Singleton Design Pattern in Laravel.

In the mentioned post, I explained the Singleton Design Pattern in PHP, how to implement it, how to test it, and some
real-world use cases. If you are not familiar with this pattern, you can check it out.

## Why would you use Singleton Design Pattern?

A perfect use case for the Singleton is a FileSystem class. You want to perform file operations in your application, and
you want to use the same instance of the FileSystem class everywhere in your application. It's impossible to depend on
the constructors to get the same instance of the FileSystem, that's where the Singleton Design Pattern comes in.

It may look unnecessary to use the Singleton Design pattern in PHP because each request is a new instance of the
application and all instances are destroyed after the request is done. But you get more benefits from it using it in
something like a Queue worker or a Laravel Octane server.

## Some Laravel Binding basics

Before we create our Laravel Singleton, let's understand some Laravel binding basics. The Laravel service container is a
powerful tool for managing class dependencies and performing dependency injection. Binding is the process of defining
how the container should resolve a class or an interface. Most of the time you don't need to instruct the container how
to resolve your dependencies, but sometimes you do.

To bind a class into the container, you can use the `bind()` method inside one of the service providers. The following
example binds a `Foo` class. We can use the `\App\Providers\AppServiceProvider` for this.

Let's assume we have a `Foo` class that can tell us when it was created.

```php
<?php

declare(strict_types=1);

namespace App;

final readonly class Foo
{
    public function __construct(public int $createdAt)
    {
    }
}
```

Now we can bind the `Foo` class to the container.

```php
<?php

namespace App\Providers;

use App\Foo;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(Foo::class, function () {
            return new Foo(time());
        });
    }
    
    // .. other methods
}
```

Now we can resolve the `Foo` class from the container.

```php
<?php

use App\Foo;
use Illuminate\Support\Facades\Route;

Route::get('/', static function (Foo $foo) {
   return $foo->createdAt;
});

```

Now if you visited your home page, you can see the timestamp when the `Foo` class was created, Something like this

```markdown
1713182568
```

## Binding a Singleton

The `singleton` method binds a class or interface into the container that should only be resolved one time. Once a
singleton binding is resolved, the same object instance will be returned on subsequent calls into the container. To see
it in action, let's change our `Foo` example to a Singleton.

```diff
// app/Providers/AppServiceProvider.php

    public function register(): void
    {   
-       $this->app->bind(Foo::class, function () {
+       $this->app->singleton(Foo::class, function () {
            return new Foo(time());
        });
    }

```

Now, let's create two instances of the `Foo` class in our route.

```php
<?php
// routes/web.php

use App\Foo;
use Illuminate\Support\Facades\Route;

Route::get('/', static function () {
  $firstCall = app(Foo::class);

  // Simulate a delay
  sleep(1);

  $secondCall = app(Foo::class);

  return response()->json([
        'first_call' => $firstCall->createdAt,
        'second_call' => $secondCall->createdAt,
        'is_same_instance' => $firstCall === $secondCall,
    ]);
});
```

The response should be something like this

```json
{
  "first_call": 1713183052,
  "second_call": 1713183052,
  "is_same_instance": true
}
```

As you can see, the `first_call` and `second_call` are the same, and the `is_same_instance` is `true`. Try to replace
the `singleton` with `bind` and see the difference.

## Two types of Singletons binding in Laravel

We have already tried the `singleton()` method, but there is another way to bind a Singleton in Laravel. The Scoped
Bindings. The `scoped()` method binds a class or interface into the container that should only be resolved one time
within a given Laravel request / job lifecycle. While this method is similar to the singleton method, instances
registered using the scoped method will be flushed whenever the Laravel application starts a new "lifecycle", such as
when a Laravel Octane worker processes a new request or when a Laravel queue worker processes a new job:

```diff
// app/Providers/AppServiceProvider.php

    public function register(): void
    {   
-       $this->app->singleton(Foo::class, function () {
+       $this->app->scoped(Foo::class, function () {
            return new Foo(time());
        });
    }

```

## Conclusion

Laravel offers two types of Singleton bindings, the `singleton()` and the `scoped()`, each with its own use cases and
lifecycle.
