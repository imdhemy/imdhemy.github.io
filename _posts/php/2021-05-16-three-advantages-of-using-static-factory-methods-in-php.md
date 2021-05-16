---
layout: post
title: Three advantages of using static factory methods in PHP
date: 2021-05-16T06:05:51.560Z
categories: php
---
Constructor overloading is a concept of having more than one constructor with a different list of parameters. PHP doesn't allow constructor overloading. Developers over time developed their workarounds over this limitation. One of those workarounds is to add optional parameters with some logic and type checks inside the constructor, Let me show you an [example from the Carbon Library](https://github.com/briannesbitt/Carbon/blob/2.48.0/src/Carbon/Traits/Creator.php#L56:L97).

- If the `$time` is instance of the `DateTimeInterface`, it calls another private creator method `constructTimezoneFromDateTime`.
- If the `$time` is a timestamp, it starts another journey with creator methods starting from `createFromTimestampUTC`.
- If the `$time` is an empty string or is `"now"`, it creates a new object of the current time.

**If PHP allows constructor overloading, we may have the following constructors:**

```php
class Carbon
{   
    /**
    * Carbon constructor.
    */
    function Carbon()
    {
        // construct with no params
    }
       
     /**
     * Carbon constructor.
     * @param Timestamp $timestamp
     */
    function Carbon(Timestamp $timestamp)
    {
        // construct using a timestamp param
    }
    
    /**
    * Carbon constructor.
    * @param DatetimeInterface $datetime
    */
    function Carbon(DatetimeInterface $datetime)
    {
        // construct from a DateTime
    }

    /**
    * Carbon constructor.
    * @param DateTimeInterface $dateTime
    * @param DateTimeZone $timeZone
    */
    function Carbon(DateTimeInterface $dateTime, DateTimeZone $timeZone) 
    {
        // construct from a datetime & timezone
    }
    
    // Other constructors todo...
}
```
On instantiation, the debugger/interpreter will choose the proper constructor to use based on the parameter types, count, and order.

Let me show you another example from the Carbon Library:
```php
$now = Carbon::now();
$tomorrow = Carbon::tomorrow();
$y2k = Carbon::create(2000, 1, 1, 0, 0); // year, month, day, hour, minute
$fromDate = Carbon::createFromDate($year, $month, $day, $tz);
$time = Carbon::createFromTimestamp(time());
$timeFromFormat = Carbon::createFromFormat('Y-m-d H', '1990-09-07 22');
```

Being a wrapper over the PHP Datetime, Carbon has a long list of static factory methods indeed!

Even If PHP was allowing constructor overloading, I'd go for another technique that should be a part of every programmer's toolkit as Joshua Bloch mentioned in his book "[Effective Java](https://www.goodreads.com/book/show/34927404-effective-java)". A class can provide a public _static factory method_, which is simply a static method that returns an instance of the class.

Another Good example is the `Request` [class from Symfony](https://github.com/symfony/http-foundation/blob/5.x/Request.php), which has a [long list of constructor params](https://github.com/symfony/http-foundation/blob/5.x/Request.php#L258)

```php
public function __construct(array $query = [], array $request = [], array $attributes = [], array $cookies = [], array $files = [], array $server = [], $content = null){
//
}
```
They provided a static factory method to instantiate this class [from globals](https://github.com/symfony/http-foundation/blob/5.x/Request.php#L304):

You can check a fresh project of Symfony-5 to find the following line in `public/index.php`
```php
$request = Request::createFromGlobals();
```

After this quite long introduction, let's get into the topic. Here are three advantages to consider using static factory methods instead of constructors.

## They have names
Java developers can overload their constructors, but in PHP we have to add some logic inside our constructors to do the same. Currently, PHP has type hints, so we can get rid of type checks, and the constructor logic as well and provide clean, logic-free constructors besides descriptive easy to remember static factory methods. Consider the following example:

```php
class Conversation
{   
    /**
    * Conversation constructor.
    * @param ConversationType $type
    * @param UserCollection $members
    */
    public function __construct(ConversationType $type, UserCollection $members) 
    {
       $this->type = $type;
       $this->members = $members;
    }
    
    /**
    * creates a one-to-one conversation
    * @param UserCollection $members
    * @return static
    */
    public static function oneToOne(UserCollection $members): self
    {
        return new self(ConversationType::oneToOne(), $members);
    }
    
    /**
    * creates a group conversation
    * @param UserCollection $members
     * @return static
     */
    public static function group(UserCollection $members): self
    {
        return new self(ConversationType::group(), $members);
    }
}
```
For more explanation, In a chat application, we have two types of conversations, a user can start a one-to-one conversation or a group conversation. The `Conversation` constructor accepts a `ConversationType` and `UserCollection` to instantiate a new conversation object. To make it easier for the client, we provided two static factory methods `oneToOne` and `group`.

We can solve the same problem through [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)). Polymorphism may be a good idea for a Conversation instantiation, but it's not so good for a Value object class, the `ConversationType` for instance is a good example for this.

## They can cache
Unlike constructors, static factory methods are not required to create a new object each time they are invoked. Consider the Value object class `ConversationType` in the previous chat app example. Our chat application allows the user to list all his chat history, suppose the user has 10 conversations in his history, half of them are one-to-one conversations. In this case, if we used the ordinary constructors, we will end with five identical objects of type `ConversationType` for the five one-to-one conversations and another five identical objects for the group conversations. 

I agree they are lightweight objects, but in other scenarios and applications, we may overload our limited Memory! Back to our example, at most we only need two different objects of `ConversationType` at most!

```php
final class ConversationType
{
    public const ONE_TO_ONE = 'one_to_one';
    public const GROUP = 'group';

    private static array $cache = [];
    private string $type;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    public static function oneToOne(): self
    {
        $isCached = isset(self::$cache[self::ONE_TO_ONE]);

        if (!$isCached) {
            self::cacheOneToOne();
        }

        return self::$cache[self::ONE_TO_ONE];
    }

    private static function cacheOneToOne(): void
    {
        self::$cache[self::ONE_TO_ONE] = new self(self::ONE_TO_ONE);
    }
}
```

The ability of static factory methods to return the same object from repeated invocations allows classes to maintain strict control over what instances exist at any time. I suggest you check the rarely used within PHP applications [Flyweight](https://refactoring.guru/design-patterns/flyweight) pattern after reading this article. 

## They form the basis of Service provider frameworks

A service provider framework is a system in which providers implement a _service_, and the system makes the implementation available to clients, decoupling the clients from the implementation. There are three essential components in a service provider framework:

1. A service interface.
2. A provider registration API.
3. A service access API.

Let's have an example from our beloved framework, [Laravel](https://laravel.com/docs/8.x/providers), it's official documentation states:
>Service providers are the central place of all Laravel application bootstrapping. Your application, as well as all of Laravel's core services, are bootstrapped via service providers.

1. Any Service should extend the abstract class `Illuminate\Support\ServiceProvider`. [**Interface^**]
2. All service providers are registered in the config/app.php configuration file. [**Registration^**]
3. First, the register method will be called on all providers, then, once all providers have been registered, the boot method will be called. [**Access^**]

Service providers are responsible for bootstrapping all the framework’s various parts, such as the database, queue, validation, and routing components. Since it configures all the features offered by Laravel, it’s the essential component of your Laravel application.

In a standard laravel request, Laravel bootstrap an [Application instance](https://github.com/laravel/laravel/blob/8.x/public/index.php#L47), which in turn invokes the `register` methods of the [base service providers](https://github.com/laravel/framework/blob/8.x/src/Illuminate/Foundation/Application.php#L177) including: 

- `Illuminate\Events\EventServiceProvider`
- `Illuminate\Log\LogServiceProvider`
- `Illuminate\Routing\RoutingServiceProvider`

In the same way, laravel allows you to add service providers as much as your application requires!

## Summary
In summary, static factory methods and public constructors both have their uses, and it pays to understand their relative merits. Firstly, think about the best fit [creational design pattern](https://refactoring.guru/design-patterns/creational-patterns) to use, secondly consider using a static factory method, lastly, write clean logic free public constructors.

