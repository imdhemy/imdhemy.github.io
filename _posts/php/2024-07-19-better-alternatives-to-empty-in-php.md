---
layout: post
title: Better alternatives to empty() in PHP
date: 2024-07-19
categories: [ php ]
image: /assets/img/desert.jpg
image_source: https://unsplash.com/photos/sand-landscape-R9OS29xJb-8
---

I'm working on a weekend project: a [static code analysis tool](https://github.com/symblaze/mare-scan) for PHP, just
because, well, why not? So, I've been learning more about PHP's internals and quirks. I used to use the `empty()`
function to check if a variable was empty, especially strings and arrays. But recently, I learned why using it can be a
bad idea. In this blog post, I'll share why we should stop using `empty()` and look at better alternatives.

## What does `empty()` do?

```php
empty(mixed $var): bool
```

By checking the [PHP manual](https://www.php.net/manual/en/function.empty.php), you will find:

> Determine whether a variable is considered to be empty. A variable is considered empty if it does not exist or if its
> value equals false.

Let's have a look at the following examples:

```php
empty(null); // true
empty(''); // true
empty([]); // true
```

I used to think `empty()` always behaves like in these examples, but that's not the reality!

```php
empty('0'); // true (huh?) // Technically, '0' is not an empty string.
empty(new ArrayObject()); // false (Huh! It's already empty!)
```

Surprise! `empty()` is doing a loose comparison with `false`

| `$value`                  | `== false` | `empty($value)` |
|---------------------------|------------|-----------------|
| `null`                    | true       | true            |
| `''`                      | true       | true            |
| `[]`                      | true       | true            |
| **Observe the following** |            |                 |
| `'0'`                     | true       | true            |
| `new ArrayObject()`       | false      | false           |

Not only that! But `empty()` also doesn't throw a warning if the variable does not exist. That means `empty()` is
equivalent to `!isset($value) || $value == false`.

```php
function is_empty($value): bool {
    return !isset($value) || $value == false;
}
```

In case you mistyped the variable name, your code will not complain about it.

```php
$type = 'car';
if(empty($typo)) { // Laterally THIS IS A TYPO
    echo 'This should not be printed';
}
```

The above code will print the message without any warnings or errors, even though the developer intended to check
the `type` variable length.

## Better alternatives to `empty()`

It depends on the context and the data type you are working with. Here are some alternatives:

### Strings

You can directly compare the string with an empty string.

```php
if('' === $value) {
    // Do something
}
```

### Arrays

You can compare with an empty array.

```php
if([] === $value) {
    // Do something
}
```

Or you can use the `count()` function.

```php
if(0 === count($value)) {
    // Do something
}
```

Comparing with an empty array is more readable than using the `count()` function. I wanted to be sure about the
performance difference between them, so I wrote a simple benchmark to compare how long it takes to execute each one on
an empty array and an array with `1000000` elements, and here are the results:

| Method                      | Empty Array Time (seconds) | Large Array Time (seconds) |
|-----------------------------|----------------------------|----------------------------|
| `checkWithCount`            | 0.21758413314819           | 0.2175669670105            |
| `checkWithDirectComparison` | 0.21403312683105           | 0.21817898750305           |

Based on these results, there is no significant performance difference between the two methods for both empty and large
arrays. However, from a code readability and directness perspective, using `if ([] === $value)` may still be preferred.

## More thoughts

Because `empty()` accepts any variable type, you may come across usages with Objects, integers and floats. I can't
picture a developer will need to check if an integer value is empty, maybe they want to check if it's zero. You got the
point! For that reason, I didn't provide alternatives for these types.

The `empty()` is not working as expected with magic classes. I also omitted adding alternatives for them because we
should avoid using magic methods in the first place, but if you are interested, you can check the following:

Suppose we have a regular class:

```php
class RegularClass {
    public $property = 'value';
}
```

And another magic class with dynamic properties:

```php
class MagicClass {
   private $properties = ['property' => 'value'];
   
    public function __get($name) {
         return $this->properties[$name] ?? null;
    }
}
```

Now let's create an instance of each class and check if the property is empty:

```php
$regular = new RegularClass();
var_dump($regular->property); // string(5) "value"

$magic = new MagicClass();
var_dump($magic->property); // string(5) "value"

// Now let's check if the property is empty
var_dump(empty($regular->property)); // false
var_dump(empty($magic->property)); // true (Huh!)
```

## Conclusion

`empty()` is not as straightforward as I thought. It's better to avoid using it and use the alternatives I mentioned
above. It's always better to be explicit in your code and avoid any surprises.
