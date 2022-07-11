---
layout: post
title: Math Notes about Sum Formulas
categories: DSA
---

I'm working on enhancing my skills, expanding my knowledge and increasing my chances to pass technical interviews. Mathematics plays an important role in problem-solving. Hence, this notes! This blog post is about **Sum Formulas**.

<p class="note">
Each sum of the form:

$$ \sum_{x=1}^{n} x^{k} = 1^{k} + 2^{k} + 3^{k} + .. + n^{k} $$

where k is a positive integer, has a closed-form formula that is a polynomial of degree (k + 1).
</p>

**Triangular number**

$$ \sum_{x=1}^{n} x = 1 + 2 + 3 + ... + n = \frac{n (n + 1)}{2} $$

**Square pyramidal number**

$$ \sum_{x=1}^{n} x^{2} = 1^{2} + 2^{2} + 3^{2} + ... + n^{2} = \frac{n (n + 1) (2n + 1)}{6} $$

There is a general formula for such sums, called [Faulhaber's Formula](https://en.wikipedia.org/wiki/Faulhaber%27s_formula). 

In the next lines, I'll use mathematical induction to proof the Triangular number and the Square pyramidal number formulas.

## Triangular number.

<p class="note">
$$ \sum_{x=1}^{n} x = 1 + 2 + 3 + ... + n = \frac{n (n + 1)}{2} $$
</p>

**Base step:** Base case, for n = 1

$$ L.H.S = 1 $$

$$ R.H.S =  \frac{n (n + 1)}{2} = \frac{1 ( 1 + 1)}{2} = \frac{2}{2} = 1 $$

$$ L.H.S = R.H.S = 1 $$

---

**Inductive hypothesis Step**
The equation is true for an arbitrary integer `k`

$$ 1 + 2 + 3 + ... + k = \frac{k(k+1)}{2} $$

---

**Induction Step**

Based on the **inductive hypothesis**, let's proof the equation if true for `n = k + 1`

$$ L.H.S = 1 + 2 + 3 ... + k + k + 1 $$

$$ = \frac{k(k+1)}{2} + (k + 1) $$

$$ = \frac{k(k+1)}{2} + \frac{2(k + 1)}{2} $$

$$ = \frac{k^2 + k + 2k + 2}{2} $$

$$ = \frac{k^2 + 3k + 2}{2} $$

$$ = \frac{(k+1)(k+2)}{2} $$

$$ = \frac{(k + 1)(k+1+1)}{2} $$

--- 
For `n = k + 1`

$$ R.H.S = \frac{n(n + 1)}{2} =  \frac{(k+1)(K + 1 + 1)}{2} $$

$$ L.H.S = R.H.S \# $$

## Square pyramidal number

<p class="note">
$$ \sum_{x=1}^{n} x^{2} = 1^{2} + 2^{2} + 3^{2} + ... + n^{2} = \frac{n (n + 1) (2n + 1)}{6} $$
</p>

**Base step:** Base case, for n = 1

$$ L.H.S = 1^2 = 1 $$

$$ R.H.S = \frac{1(1+1)(2 \times 1 + 1)}{6} = \frac{2 \times 3}{6} = 1 $$

$$ L.H.S = R.H.S $$

---

**Inductive hypothesis Step**
The equation is true for an arbitrary integer `k`

$$ 1^2 + 2^2 + 3^2 + ... + k^2 = \frac{k(k+1)(2k+1)}{6} $$

---

**Induction Step**

Based on the **inductive hypothesis**, let's proof the equation if true for `n = k + 1`

$$ L.H.S = 1^2 + 2^2 + 3^2 + ... + k^2 + (k+1)^2  $$

$$ = \frac{k(k+1)(2k+1)}{6} + (k+1)^2 $$

$$ = \frac{k(k+1)(2k+1)}{6} + \frac{6(k+1)^2}{6}  $$

Given the R.H.S:

$$ R.H.S = \frac{n(n+1)(2n+1)}{6} = \frac{(k+1)(k+2)(2k+3)}{6} $$

So, we can ignore the `6` in the denominator from both sides for now:

$$ {L.H.S}\times{6} = k(k+1)(2k+1) + 6(k+1)^2 $$

$$ = (k^2 + k)(2k+1) + 6(k^2+2k+1) $$

$$ = 2k^3 + k^2 + 2k^2 + k + 6k^2 + 12k + 6 $$

$$ {L.H.S}\times{6} = 2k^3 + 9k^2 + 13k + 6  $$

---

$$ {R.H.S}\times{6} =  (k+1)(k+2)(2k+3) $$

$$ = (k^2 + 3k + 2)(2k+3) $$

$$ = 2k^3 + 6k^2 + 3k^2 + 4k + 9k + 6 $$

$$ {R.H.S}\times{6} = 2k^3 + 9k^2 + 13k + 6 $$

---

$$ L.H.S = \frac{2k^3 + 9k^2 + 13k + 6}{6} $$
    
$$ R.H.S =  \frac{2k^3 + 9k^2 + 13k + 6}{6}$$

$$ R.H.S = L.H.S \# $$

## Number Progressions
A progression, which is also known as a sequence, is nothing but a pattern of numbers. For example, `3, 6, 9, 12` is a progression because there is a pattern observed where every number here is obtained by adding 3 to its previous number.

There are four types of the most common progressions.

### Arithmetic Progression
Arithmetic Progression (AP) is a sequence of numbers where the difference between any two consecutive numbers is constant.

For Example: `3, 7, 11, 15`, is an AP where the common difference is `4`. 

For an AP:
- `a` is the first term.
- `l` is the last term.
- `d` is the common difference.
- The `n` term could be found as follows: $$ a_{n} = a + (n - 1) d $$
- We can find the **sum** as follows: $$ S = \frac{n(a + l)}{2} $$

Let's proof this formula:
<p class="note">
The sum of an arithmetic is 

$$ S = \frac{n(a + l)}{2} $$
</p>

Suppose $$ a_{1}, a_{2}, a_{3}, ..., a_{n} $$ be an arithmetic progression whose first term is `a` and the common difference is `d`.

Then:

$$ a_{1} = a $$

$$ a_{2} = a + d $$

$$ a_{3} = a + 2d $$

$$ a_{n} = a + (n - 1) d $$

---

$$ S_{n} = a + (a + d) + (a + 2d) + ... + \{a + (n - 3)d\} + \{a + (n - 2)d\} + \{a + (n - 1)d\} \;\;\;\;\;\;\;\; (i)$$

And with a simple trick of reversing the order:

$$ S_{n} = \{a + (n - 1)d\} +  \{a + (n - 2)d\} + \{a + (n - 3)d\} + ... +  (a + 2d) + (a + d) + a  \;\;\;\;\;\;\;\; (ii) $$

by adding $$ (i) $$ and $$ (ii) $$

| Term (i) | Term (ii) | Sum |
| --- | --- | -- |
| a | $$ a + (n - 1)d $$ | $$ 2a + (n-1)d $$ |
| a + d | $$ a + (n - 2)d $$ | $$ 2a + (n-1)d $$ |
| a + 2d | $$ a + (n - 3)d $$ | $$ 2a + (n-1)d $$ |
| ... | ... | ... |
| |  | $$ 2S_{n} = n\{2a + (n-1)d\} $$ |

$$ 2S_{n} = \{2a + (n-1)d\} + \{2a + (n-1)d\} + ... + \{2a + (n-1)d\} $$

---

$$ 2S_{n} = n\{2a + (n-1)d\} $$

$$ 2S_{n} = n\{a + a + (n-1)d\} $$

$$ 2S_{n} = n(a + l) $$

$$ S_{n} = \frac{n(a+l)}{2} \# $$

### Geometric Progression
Geometric Progression (GP) is a sequence of numbers where the ratio between any two consecutive numbers is constant.

$$ S = \frac{l\times k - a}{k - 1} $$

### Harmonic Progression
A series of numbers is said to be in harmonic sequence if the reciprocals (the inverse) of all the elements of the sequence form an arithmetic sequence.

For example:
$$ \sum_{x=1}^{n}{\frac{1}{x}} = 1 + \frac{1}{2} +  \frac{1}{3} + ... + \frac{1}{n}$$

### Fibonacci Progression
Fibonacci numbers form an interesting sequence of numbers in which each element is obtained by adding two preceding elements and the sequence starts with `0` and `1`. 

Sequence is defined as, 
$$ F_{0} = 0 $$ and $$ F_{1} = 1 $$ and $$ F_{n} = F_{n-1} + F_{n-2} $$
