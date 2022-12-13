---
layout: post
title: Approximating square roots with Newton's method
date: 2022-12-12T11:55:59.NZ
categories: dsa
---

Newton's method is a way to approximate the square root of a number. It depends on Taylor series expansion of the
function $$f(x) = x^2 - a$$ where $$a$$ is the number we want to find the square root of.

The Taylor series expansion of $$f(x)$$ is:

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x - a)^n$$

And the terms of the series are:

$$f(x) = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \frac{f'''(a)}{3!}(x - a)^3 + \cdots \frac{f^{(n)}(a)}{n!}(
x - a)^n$$

Taylor series expansion is a way to approximate a function $$f(x)$$ by a polynomial of degree $$n$$ around a point
$$a$$. The degree of the polynomial is the number of terms in the series. The higher the degree, the more accurate the
approximation.

The square root of $$a$$ is the value of $$x$$ that satisfies:

$$sqrt(a) = x$$

$$x^2 = a$$

$$x^2 - a = 0$$

$$f(x) = x^2 - a$$

---

Newton applied this idea to find the square root of a number $$a$$ by approximating $$f(x)$$ by a polynomial of
degree 2 around $$a$$:

$$f(x) = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2$$

$$f(x) = 0 + 2a(x - a) + 0(x - a)^2$$

$$f(x) = 2ax - a^2$$

---

So, we can approximate the square root of $$a$$ by:

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

$$= x_n - \frac{x_n^2 - a}{2x_n}$$

$$= \frac{1}{2} (x_n + \frac{a}{x_n})$$

We start with an initial guess $$x_0$$ and then we iterate over the formula until we reach a desired accuracy. For
each step, we can calculate the error $$\epsilon$$ as:

$$\epsilon = \frac{|x_{n+1} - x_n|}{x_{n+1}}$$

For example, if the first guess is $$x_0 = 1$$, and the new guess is $$x_1 = 1.5$$, then the error is:

$$\epsilon = \frac{|1.5 - 1|}{1.5} = 0.333$$

The error value ranges between $$0$$ and $$1$$, and the smaller the error, the closer we are to the square root of
$$a$$. When the error equals $$0$$, we have reached the square root of $$a$$. We can also define an accepted error
so that we stop iterating when the error is less than the accepted error.

## Example (1)

Let's find the square root of $$a = 9$$ using Newton's method. We start with an initial guess $$x_0 = 1$$, and then we
iterate over the formula until we reach a desired accuracy. This time, we will use an accepted error of $$0$$. The
following table shows the steps:

| $$n$$ | $$x_n$$         | $$x_{n+1}$$ | $$\epsilon$$ |
|-------|-----------------|-------------|--------------|
| 0     | 1               | 5           | 0.8          |
| 1     | 5               | 3.4         | 0.47         |
| 2     | 3.4             | 3.023       | 0.12         |
| 3     | 3.023           | 3.000091    | 0.0076       |
| 4     | 3.000091        | 3.000000092 | 0.00003      |
| 5     | 3.000000092     | 3.000000000 | 0.00000003   |
| 6     | __3.000000000__ | 3.000000000 | 0.00000000   |

As we can see, after the sixth step, the error is equal to $$0$$, so we have reached the square root of $$9$$.

## Example (2)

Let's find the square root of $$a = 16$$ with an initial guess of $$x_0 = 1$$ and an accepted error of $$0.1$$.

| $$n$$ | $$x_n$$    | $$x_{n+1}$$ | $$\epsilon$$ |
|-------|------------|-------------|--------------|
| 0     | 1          | 8.5         | 0.88         |
| 1     | 8.5        | 5.04        | 0.69         |
| 2     | 5.04       | 4.0016      | 0.26         |
| 3     | __4.0016__ | 3.999904    | 0.00004      |

After the third step, the error is less than the accepted error, so we stop iterating. The square root of $$16$$ is
$$4.0016$$, which is close enough to the actual square root of $$16$$ which is $$4$$.

## Implementation

The following code implements Newton's method in Java:

```java
public class NewtonsMethod {
    public static double sqrt(double a, double x0, double epsilon) {
        double x = x0;
        double error = 1;
        
        while (error > epsilon) {
            double x1 = 0.5 * (x + a / x);
            error = Math.abs(x1 - x) / x1;
            x = x1;
        }
        
        return x;
    }
}
```

## Leetcode problem

We can use Newton's method to solve the [69. Sqrt(x)](https://leetcode.com/problems/sqrtx/) problem on Leetcode.

```java
class Solution {
    public int mySqrt(int x) {
        double x0 = 1;
        double epsilon = 0.00000000000001;
        double sqrt = NewtonsMethod.sqrt(x, x0, epsilon);
        return (int) sqrt;
    }
}
```

The same problem can be solved using binary search, but it's a topic for another post.
