---
layout: post
title: Why you need a builder to create your entities and models
categories: php
---
[Static factories]({% post_url php/2021-05-16-three-advantages-of-using-static-factory-methods-in-php %}) and constructors share a limitation; they do not scale well to large numbers of optional parameters. Consider the case of a class presenting a **User** in a social network platform. This class has only three required fields (`$name`, `$email` & `$password`) and a bunch of optional fields with default values, for instance: (`$address`, `$avatar`, `$gender`, `$emailVerifiedAt`, etc...).

_**As a side note:** this is not my preferred way to design a user entity, but this is only here in purpose of clarifying the situation of having a long parameter list._

Starting from here, I'll explore the practices I previously did or noticed them in other developers code.

## The Laravel Models Taste
Laravel models provides two methods to create a model instance, the most popular `create` method and the less popular`make` method. Both methods are not implemented in the base `Model` class. But Laravel defines a `__call()` and `__callStatic()` methods, it goes handled through them. [Those methods forward the call to a query builder!](https://github.com/laravel/framework/blob/8.x/src/Illuminate/Database/Eloquent/Model.php#L1952)

Finally, we have a model class that has no properties, a parameterless constructor! Everything is injected magically into the class. 

The Model class looks like the following snippet:
```php
class User extends Model
{
    //
}
```
The client code be like:
```php
$user = User::create([
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => $passwordHash
]);
```
**IMHO, this is not so good due to the following reasons!**

- Sooner or latter, you'll end up with a model with **invalid state** or any [kind of unexpected behaviour](https://www.php.net/manual/en/language.oop5.overloading.php#119407).
- The model **has no properties** and even more if you defined the properties to solve this problem the code will break!
- All properties are treated as public properties which means **no encapsulation** at all!
- Your **IDE doesn't understand** that!
- You need to **check your schema** in a repeated manner to remember the properties and their types.
- Feel free to add more problems to this list... 

## A factory that accepts an array of attributes
Another technique I noticed some developers use is to provide a factory that receives an array of attributes, then starts a series of `isset` call accompanied by a call to a setter method! 

```php
class User extends Entity
{
    private string $name;
    private string $email;
    
    // and so on ...
    
    public function setName(string $name)
    {
        $this->name = $name;
    }
    
    public function setEmail(string $email)
    {
        $this->email = $email;
    }
    
    // ... 
    
    public static function create(array $attributes)
    {
        $obj = new User();
        
        if(isset($attributes['name'])) $obj->setName($attributes['name']);
        if(isset($attributes['email'])) $obj->setEmail($attributes['email']);
        // ... Pew Pew Pew
    }
}
```

Just imagine repeating this to cover all the class properties!

- With **parameterless constructors** you need to handle required params yourself!
- Again, have entities with **invalid state**!
- **Hard to read**, hard to maintain code.
- Your **IDE doesn't understand** that!

## Telescoping constructor
Telescoping constructor means to provide a constructor with only the required parameters, another with a single optional parameter, a third with two optional parameters and so on.

Since PHP doesn't allow constructor overloading, PHP developers started to provide a constructor with a full list of properties starting with the required params.

```php
class User
{
    // .. 
    public function __construct(string $name, string $email, string $password, int $foo=5, int $bar=12, ?Address $address = null, ?File $avatar=null, ?DateTime $createdAt=null)
    {
       // ..
    }
}
```
When you want to create an instance, you use pass the shortest list of parameters you want to set. Typically, this constructor invocation will require many parameters that you don't to set, but you are forced to pass a value for them.
```php
$user = new User('John Doe', 'john@example.com', $passwordHash, 5, 12, null, $avatar);
```
In this case, we're forced to pass `5, 12, null` values which are the default values since the avatar comes after them in order!

The telescoping constructor work, but it is hard to write client code when there are many parameters, and harder still to read it. The reader is left wondering what all those values mean and must carefully count parameters to find out. Umm, what if he swapped the `12` and `50` being having the same data type, the code won't break, but it's invalid state again!


## Fluent Setters
Fluent Setters is the PHP way to imitate the [JavaBeans](https://en.wikipedia.org/wiki/JavaBeans) Pattern In which you call a parameterless constructor followed by call to setter methods. It's called fluent because all setter method return the object instance allowing you to call them in chains.

This pattern has none of the disadvantages of the telescoping constructor pattern. It is easy and easy to read the resulting code:

```php
$user = new User();
$user->setName('John Doe')
    ->setEmail('john@example.com')
    ->setPassword($passwordHash)
    ->setAddress('Via Lactea');
```

Unfortunately, the Fluent setters pattern has the following disadvantages:
- A class with a parameterless constructor is subject to being instantiated in **invalid state**.
- Having to create setters for every property which leads to immense quantity of **boilerplate code**.

## Using a builder is a good solution!
We can use a form of the [Builder Pattern](https://refactoring.guru/design-patterns/builder) which combines the safety of the telescoping constructors and the readability of the fluent setters. Instead of creating the desired object directly, the client calls a static factory method with all the required parameters and gets an object of the builder class which provides setter-like methods for other optional methods. Finally, the client calls a parameterless `build` method to get an instance of the required class.




---
```php
/**
 * @test
 */
public function test_builder_can_create_user()
{
    $user = User::builder()
        ->name('John Doe')
        ->email('john@example.com')
        ->address('Via Lactea')
        ->build();
    $this->assertInstanceOf(User::class, $user);
}
```

```php
class User
{
    /**
     * @var string
     */
    private string $name;

    /**
     * @var string
     */
    private string $email;

    /**
     * @var string
     */
    private string $address;

    /**
     * User constructor.
     * @param \App\UserBuilder $builder
     */
    public function __construct(UserBuilder $builder)
    {
        $this->name = $builder->getName();
        $this->email = $builder->getEmail();
        $this->address = $builder->getAddress();
    }

    /**
     * @return \App\UserBuilder
     */
    public static function builder(): UserBuilder
    {
        return new UserBuilder();
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return User
     */
    public function setName(string $name): User
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return User
     */
    public function setEmail(string $email): User
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @param string $address
     * @return User
     */
    public function setAddress(string $address): User
    {
        $this->address = $address;
        return $this;
    }
}
```

```php
class UserBuilder
{
    /**
     * @var string
     */
    private string $name;

    /**
     * @var string
     */
    private string $email;

    /**
     * @var string
     */
    private string $address;

    /**
     * @param string $name
     * @return $this
     */
    public function name(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @param string $email
     * @return $this
     */
    public function email(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @param string $address
     * @return $this
     */
    public function address(string $address): self
    {
        $this->address = $address;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @return \App\User
     */
    public function build(): User
    {
        return new User($this);
    }
}
```