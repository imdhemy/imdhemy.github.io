---
layout: post
title: What Symfony developers should know before using Voters
categories: [ php ]
image: /assets/img/voting.webp
image_source: Shutterstock
---

Voters are Symfony's most powerful way of managing permissions. They allow you to centralize all permission logic, then
reuse them in many places. In this post, We will cover some of the basics of Symfony's security system that you
should know before using voters.

## Permissions should be linked to a user

In Symfony, permissions are always linked to a user object. If you need to secure parts of your application, you
need to create a user object that implements the `UserInterface`.

<div class="tip">

Permissions should be linked to a user object. Always stick to this rule, even if you have an external user system

</div>

Some applications have an external SSO system that provides user information through an access token. Even in this case,
you should not depend directly on the access token to check permissions. Instead, you should create a user object that
implements the `UserInterface`. If you opt out of this approach, you will lose many benefits that you get from
Symfony's security system.

## Security User Interface

The `UserInterface` provided by
the [Symfony security component](https://github.com/symfony/symfony/blob/923c4efa1df53e351aa52be1907191977cbf980f/src/Symfony/Component/Security/Core/User/UserInterface.php#L31)
helps you to make sure that your user object has all the necessary methods to work with Symfony's security system
regardless of how you load or create the user object, e.g., from a database, an API, or a Token.

<div class="tip">

The security user interface is the contract between your user object and Symfony's security system.

</div>

Let's take a look at the `UserInterface`:

The first method is `getRoles()`. The name of the method is self-explanatory, it should return an array of roles for the
user. We will cover roles in the next section.

The second method is `eraseCredentials()`. This method is designed to clear any sensitive data that the user object
might be holding at any given point. For instance, clearing the plain text password after the user is authenticated.

The last method is `getUserIdentifier()`. This method should return the **Public representation** of a user e.g.,
the `username`. This method can be used by the user providers which helps you to get many benefits, like [fetching
the user object in your
service](https://symfony.com/doc/current/security.html#fetching-the-user-from-a-service), [impersonating a user](https://symfony.com/doc/current/security/impersonating_user.html),
etc.

## User Roles

When a user is authenticated, Symfony calls the `getRoles()` method on the user object to determine the roles of the
user. It doesn't matter how the roles are stored in the database or how they are generated. The only thing that matters
is that every role must start with the `ROLE_` prefix - otherwise, things won't work as expected. You will use these
roles to grant access to specific parts of your application.

<div class="tip">

All roles should start with the `ROLE_` prefix. This is a requirement of Symfony's security system.

</div>

Symfony provides a role hierarchy system out of the box. Instead of assigning multiple roles to a user, you can
configure a role hierarchy. This way, you can assign a single role to a user, and Symfony will automatically grant
access to all the roles in the hierarchy.

```yaml
# config/packages/security.yaml
security:
  # ...

  role_hierarchy:
    ROLE_MODERATOR: ROLE_USER
    ROLE_ADMIN: ROLE_MODERATOR
    ROLE_SUPER_ADMIN: ROLE_ADMIN

```

Using the above configuration, if a user has the `ROLE_SUPER_ADMIN` role, Symfony will automatically grant access to
`ROLE_ADMIN`, `ROLE_MODERATOR`, and `ROLE_USER`. This is illustrated as follows:

The `ROLE_SUPER_ADMIN` role inherits the `ROLE_ADMIN` role, which inherits the `ROLE_MODERATOR` role, which inherits
the `ROLE_USER` role. It's worth noting that a role can inherit multiple roles.

```yaml
# config/packages/security.yaml
security:
  # ...

  role_hierarchy:
    ROLE_ADMIN: ROLE_USER
    ROLE_SUPER_ADMIN: [ ROLE_ADMIN, ROLE_ALLOWED_TO_SWITCH ]
```

For role hierarchy to work, do not use `$user->getRoles()` manually, instead you should always depend on the
`isGranted()` or `denyAccessUnlessGranted()` methods provided by the `AuthorizationCheckerInterface`.

<div class="tip">

Let symfony does the heavy lifting for you. Always use the security methods to check for roles.

</div>

```diff
// BAD - $user->getRoles() will not know about the role hierarchy
- $hasAccess = in_array('ROLE_ADMIN', $user->getRoles());

// GOOD - use of the normal security methods
+ $hasAccess = $this->isGranted('ROLE_ADMIN');
+ $this->denyAccessUnlessGranted('ROLE_ADMIN');

```

## Decision Strategy

When you start using voters, Symfony will ask each voter to vote on the access decision. There are three decisions
that a voter can make, like any other voting system:

1. `ACCESS_GRANTED`: The voter grants access to the resource.
2. `ACCESS_DENIED`: The voter denies access to the resource.
3. `ACCESS_ABSTAIN`: The voter abstains from voting.

Normally, only one voter will vote at any given time, and all the rest will `abstain`. However, if you want to
change this behavior, you need to know about the `decision_strategy` configuration.

<div class="tip">
It's always good to keep the default `decision_strategy` and design your voters accordingly. A resource oriented
voter should only vote on the resource it is designed for.
</div>

Suppose you have a feature that requires a user to be part of a group and is older than 18 years. You have two separate
voters to check these conditions. The following table will help you understand different decision strategies:

| Decision Strategy     | Description                                                                                                                                                                               | Voter 1          | Voter 2          | Voter 3          | Result           |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|------------------|------------------|------------------|
| affirmative (default) | This grants access as soon as there is one voter granting access                                                                                                                          | `ACCESS_GRANTED` | `ACCESS_ABSTAIN` | `ACCESS_ABSTAIN` | `ACCESS_GRANTED` |
| consensus             | This grants access if there are more voters granting access than denying. In case of a tie the decision is based on the allow_if_equal_granted_denied config option (defaulting to true); | `ACCESS_GRANTED` | `ACCESS_GRANTED` | `ACCESS_DENIED`  | `ACCESS_GRANTED` |
| unanimous             | This only grants access if there is no voter denying access.                                                                                                                              | `ACCESS_GRANTED` | `ACCESS_GRANTED` | `ACCESS_DENIED`  | `ACCESS_DENIED`  |
| priority              | This grants or denies access by the first voter that does not abstain, based on their service priority                                                                                    | `ACCESS_GRANTED` | `ACCESS_DENIED`  | `ACCESS_ABSTAIN` | `ACCESS_GRANTED` |

Back to our example, if you want to grant access only if both voters grant access, you should use the `unanimous`
decision strategy.

```yaml
# config/packages/security.yaml
security:
  access_decision_manager:
    strategy: unanimous
    allow_if_all_abstain: false
```

## Summary

In this post, we covered some of the basics of Symfony's security system that you should know before using voters.
understanding them will help you make the most out of Symfony's security system. You should always consult the Symfony
documentation for the most up-to-date information and best practices. In the next article, we will cover how to create
a custom voter and how to use it in your application.
