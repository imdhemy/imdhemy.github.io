---
layout: post
title: Why you need a builder to create your entities and models
categories: php
---
[Static factories]({% post_url php/2021-05-16-three-advantages-of-using-static-factory-methods-in-php %}) and constructors share a limitation; they do not scale well to large numbers of optional parameters. Consider the case of a class presenting a User in a social network platform.

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