---
layout: post
title: How to avoid boilerplate code in Symfony Voters
categories: [ php ]
image: /assets/img/vote.jpeg
image_source: https://unsplash.com/photos/white-and-black-letter-b-9xp4F57ATzs
---

Symfony voters are the way to go when you need to centralize the authorization logic of your application. There have
been multiple trials to improve the way we write voters, one of them was by introducing the `AbstractVoter` class in
[Symfony 2.6](https://symfony.com/blog/new-in-symfony-2-6-simpler-security-voters). Later on, it was deprecated in
[Symfony 2.8](https://symfony.com/blog/new-in-symfony-2-8-simpler-security-voters) to be removed in v3.0 with the
introduction of the `Voter`class. The continuous improvement didn't stop there, and I believe it will not.

In this post, I will contribute to the trials of improving the way we write voters by introducing the `CanDoVoter`.

## The problem

Suppose the logic to decide whether a user can `view` or `edit` a `Post` object is pretty complex. For example, a User
can always edit or view a Post they created. And if a Post is marked as "public", anyone can view it. We can write
a `PostVoter` to handle this logic.

```php
//src/Acme/Post/PostVoter.php
namespace App\Acme\Post;

use App\Domain\Entity\Post;
use App\Domain\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

final class PostVoter extends Voter
{   
    protected function supports(string $attribute, $subject): bool
    {
        return in_array($attribute, ['get', 'update']) && $subject instanceof Post;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            // This means if the user is not logged in, they can't view or edit the post
            return false;
        }

        $post = $subject;
        assert($post instanceof Post);
        
        // The user can always edit or view a post they created
        if($user === $post->getAuthor()) {
            return true;
        }
        
        // If the post is public, anyone can view it
        if($attribute === 'get' && $post->isPublic()) {
            return true;
        }
        
        // otherwise, the user can't view or edit the post
        return false;
    }
}
```

Now, suppose we have another entity, `Comment`, and we need to write a `CommentVoter` to handle the logic of whether
a user can perform some actions on a `Comment` object. We will end up repeating a similar code in `supports()` and
the beginning of `voteOnAttribute()` methods till we get the `user` and `subject` objects.

```php
//src/Acme/Comment/CommentVoter.php

namespace App\Acme\Comment;

use App\Domain\Entity\Comment;
use App\Domain\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

final class CommentVoter extends Voter
{
    protected function supports(string $attribute, $subject): bool
    {
        return in_array($attribute, ['get', 'update']) && $subject instanceof Comment;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        $comment = $subject;

        // Do the logic here
    }
}
```

## Avoiding the repeated code in the supports()

The first step is to avoid the repeated code in the `supports()` method. The `supports()` method goal is to check if the
voter supports the given attribute and subject. We can extract them to configuration properties.

```php
namespace App\Foundation\Security;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

abstract class CanDoVoter extends Voter
{
    /**
     * @var string[] the attributes that this voter supports
     */
    protected array $supportedAttributes = [];

    /**
     * @var class-string the subject that this voter supports
     */
    protected string $supportedClass;
    
    protected function supports(string $attribute, mixed $subject): bool
    {
        if (! in_array($attribute, $this->supportedAttributes, true)) {
            return false;
        }

        if (! is_a($subject, $this->supportedClass, true)) {
            return false;
        }

        return true;
    }
}
```

## Avoiding the repeated code in the voteOnAttribute()

The `voteOnAttribute()` should perform the actual voting logic to decide whether the user can perform the given
attribute on the given subject. To do so, we need to get the `user` and `subject` objects. We can extract this code
as follows:

```php
namespace App\Foundation\Security;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

abstract class CanDoVoter extends Voter
{
    // The supports() method is removed for brevity

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $method = 'can'.ucfirst($attribute);
        $user = $token->getUser();
        if (is_null($user)) {
            return false;
        }

        $vote = $this->$method($user, $subject);
        assert(is_bool($vote));

        return $vote;
    }
}
```

Based on the `voteOnAttribute()` implementation, we need to define a method for each supported attribute. The method
name should be `can` followed by the attribute name with the first letter capitalized. For example, if the supported
attributes are `['get', 'update']`, we should define `canGet()` and `canUpdate()` methods. The `user` is passed as the
first argument, and the `subject` is passed as the second argument.

## Introducing the CanDoVoter

A final version of the `CanDoVoter` class is as follows:

```php
namespace App\Foundation\Security;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

abstract class CanDoVoter extends Voter
{   
    public const LIST = 'list';
    public const GET = 'get';
    public const CREATE = 'create';
    public const UPDATE = 'update';
    public const DELETE = 'delete';
    
    protected array $supportedAttributes = [];
    protected string $supportedClass;

    protected function supports(string $attribute, mixed $subject): bool
    {
        if (! in_array($attribute, $this->supportedAttributes, true)) {
            return false;
        }

        if (! is_a($subject, $this->supportedClass, true)) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $method = 'can'.ucfirst($attribute);
        $user = $token->getUser();
        if (is_null($user)) {
            return false;
        }

        $vote = $this->$method($user, $subject);
        assert(is_bool($vote));

        return $vote;
    }
}
```

## Using the CanDoVoter

Now, we can use the `CanDoVoter` to write the `PostVoter` as follows:

```php
namespace App\Acme\Post;

use App\Domain\Entity\Post;
use App\Domain\Entity\User;
use App\Foundation\Security\CanDoVoter;

final class PostVoter extends CanDoVoter
{
    protected array $supportedAttributes = [self::GET, self::UPDATE];
    protected string $supportedClass = Post::class;

    private function canGet(User $user, Post $post): bool
    {   
        if ($post->isPublic()) {
            return true;
        }
        
        if ($user === $post->getAuthor()) {
            return true;
        }

        return false;
    }

    private function canUpdate(User $user, Post $post): bool
    {
        return $user === $post->getAuthor();
    }
}
```

And in your controller, you can use the voter as follows:

```php
namespace App\Controller;

use App\Domain\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Acme\Post\PostVoter;

final class PostController extends AbstractController
{
    public function show(Post $post): Response
    {
        $this->denyAccessUnlessGranted(PostVoter::GET, $post);
        
        // The logic to show the post
    }
    
    public function update(Post $post): Response
    {
        $this->denyAccessUnlessGranted(PostVoter::UPDATE, $post);
        
        // The logic to update the post
    }
}
```

## Testing the canDoVoter

We have discussed before [how to organize our unit tests]({% post_url 2022-11-11-how-to-organize-your-unit-tests %}).
It's a good practice to write unit tests that document your business logic, and testing the interface is the way to go.
That means you should write your tests against the `vote()` method not the `can*()` methods. The `can*()` methods
should be private methods, and you should not test them directly.

<div class="tip" markdown="1">

Always test the public interface of your classes. In this case, the public interface is the `vote()` method.

</div>

Below is an example of how to test the `PostVoter`:

```php
final class PostVoterTest extends TestCase
{
   public function any_user_can_view_a_public_post(): void 
   {
       // Arrange
       $post = new Post();
       $post->setPublic(true);
       $user = new User();
       $token = $this->createMock(TokenInterface::class);
       $token->method('getUser')->willReturn($user);
       $sut = new PostVoter();
       
       // Act
       $actual = $sut->vote($token, $post, [PostVoter::GET]);
       
       // Assert
       $this->assertEquals(Voter::ACCESS_GRANTED, $actual);
   }
}
```

Avoid test names like: `it_should_fail_when_the_user_is_not_the_author()`. Instead, use test names that describe the
behavior of the system under test.

```diff
- it_should_fail_when_the_user_is_not_the_author()

+ only_the_author_can_update_the_post()
+ only_the_author_can_view_a_private_post()
+ any_user_can_view_a_public_post()
```

## Conclusion

You can have the `CanDoVoter` and much more out-of the box by using
the [Symblaze Security Bundle](https://github.com/symblaze/security-bundle).

In this post, we have introduced a new way to write Symfony voters with less boilerplate code, the `CanDoVoter`. The
`CanDoVoter` class is an abstract class that you can extend to write your voters. Improving the way we write voters
will make our codebase more maintainable and easier to read. I hope you find this post helpful, and I would love to
hear your feedback.
