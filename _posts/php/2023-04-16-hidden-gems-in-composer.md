---
layout: post
title: Hidden Gems in Composer Every PHP Developer Should Know
categories: [ php ]
image: /assets/img/glass-on-music-notes.jpeg
---

Composer is the most popular PHP dependency manager. I've heard about other package managers like `PEAR` & `Phing`, but
I've never used them. While many developers are familiar with basic Composer commands like `install`, `update`,
and `require`, there are several hidden gems in Composer that can make maintaining your dependencies easier. In this
blog post, We'll explore some of these hidden gems.

## 1. composer bump & composer audit

Composer 2.4 added two new commands `composer bump` and `composer audit`.

`composer bump` "bumps" the package version constraints listed in the composer.json file by increasing them to the
latest version within the allowed constraints.

`composer audit`, scans the installed packages for reported security vulnerabilities. It exists with an error code if
there are any packages installed with known security vulnerabilities.

You can read more about them in the official [blog post](https://php.watch/articles/composer-24).

## 2. composer outdated

Keeping your dependencies up-to-date is important for security and compatibility reasons. However, it can be
time-consuming to manually check for updates to each package in your project. This is where `composer outdated` comes
in. This command lists all the packages that have newer versions available, this comes with a color legend to help you
determine which packages are recommended to update or just possible to update.

```bash
composer outdated
```

```bash
Color legend:
- patch or minor release available - update recommended
- major release available - update possible

Direct dependencies required in composer.json:
blackfire/php-sdk                  v1.33.0            v1.35.0            Blackfire.io PHP SDK
doctrine/annotations               1.14.3             2.0.1              Docblock Annotations Parser

... Other packages are omitted for brevity ...

```

## 3. composer show --latest

Similar to composer outdated, `composer show --latest` shows you the latest version of each package that is available on
the remote repository. This can be helpful for keeping track of the latest package versions and deciding when to update
your project. The `composer show` command has a lot of other useful options that you can explore by running
`composer show --help`.

## 4. composer why & composer why-not

Sometimes, when you try to install a package with Composer, it fails due to dependency conflicts or other issues. In
these situations, it can be difficult to determine why the package cannot be installed. This is where `composer why` and
`composer why-not` come in.

`composer why` command tells you which other packages depend on a certain package. For example, you can run the
following command to find out which packages depend on `vimeo/psalm`:

```bash
composer why vimeo/psalm
```

`composer why-not` shows you a detailed explanation of why a package cannot be installed, including all the packages
that are blocking it. This can be helpful for troubleshooting complex dependency issues. Specify a version constraint to
verify whether upgrades can be performed in your project, and if not why not. See the following example to find out why
PHPUnit 10 cannot be installed in your project:

```bash
composer why-not phpunit/phpunit 10
```

## 5. composer --with-dependencies

The `composer update`, `composer require`, and `composer remove` commands have a `--with-dependencies` and
`--with-all-dependencies` option that can be used to update all the dependencies of a package. This can be useful when
you want to update a package and all the packages that depend on it. For example, you can run the following command to
update the `symfony/console` package and all the packages that depend on it:

```bash
composer update symfony/console --with-dependencies
```

There are shortcuts for these options, you can use `-W` and `-w` instead of `--with-dependencies` and
`--with-all-dependencies`.

- `--with-dependencies (-w)`: Update also dependencies of packages in the argument list, except those which are root
  requirements.
- `--with-all-dependencies (-W)`: Update also dependencies of packages in the argument list, including those which are
  root requirements.

It'd be better to use the short versions as they work fine with different commands like `composer require` that has a
`--update-with-dependencies (-w)` and `--update-with-all-dependencies (-W)` option.

## Conclusion

Upgrading your dependencies can be a tedious task, but it's important to keep your project up-to-date. Using the
mentioned commands can help you resolve dependency issues and keep your project up-to-date. I hope you found this
article useful.

<small>Photo by [Dayne Topkin](https://unsplash.com/@dtopkin1) on [Unsplash](https://unsplash.com)</small>
