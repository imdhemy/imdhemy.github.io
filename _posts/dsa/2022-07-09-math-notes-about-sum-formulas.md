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

$$ L.H.S = R.H.S $$

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

$$ R.H.S = L.H.S $$
