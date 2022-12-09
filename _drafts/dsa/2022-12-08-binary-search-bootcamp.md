---
layout: post
title: Binary search bootcamp
date: 2022-12-08T15:31:10.NZ
categories: dsa
---

This post is not a tutorial on binary search. The internet if full of them. The goal of this post is to give some
notes on how to approach binary search problems, and follows the technique of repeatedly practicing different
problems on the same topic until you are comfortable with the topic.

If you are not familiar with binary search, I recommend you the
this [video](https://www.youtube.com/watch?v=P3YID7liBug)

## Binary search implementation

This section is added to give you a quick reference on how to implement binary search. Feel free to skip it if you are already familiar with binary search.

### Recusive implementation

```java
public int binarySearch(int[] nums, int target) {
    return binarySearch(nums, target, 0, nums.length - 1);
}

private int binarySearch(int[] nums, int target, int left, int right) {
    if (left > right) 
        return -1;

    int mid = left + (right - left) / 2;
    if (nums[mid] == target) 
        return mid;

    if (nums[mid] < target)
        return binarySearch(nums, target, mid + 1, right);

    return binarySearch(nums, target, left, mid - 1);
}
```

### Iterative implementation

```java
public int binarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) 
            return mid;

        if (nums[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }

    return -1;
}
```

### Jumps Implementation

I'm not sure about the name of this implementation. It's a variation of the recursive implementation and depends on making jumps of size `b` instead of dividing the array in half. The idea is to jump `b` elements at a time until the element at index `k + b` is greater than the target. Then we know that the target is in the range `[k, k + b]`. We can then perform a binary search on this range.

```java
public int binarysearch(int[] nums, int target){
    int k = 0;
    int n = nums.length;

    for (int b = n / 2; b >= 1; b /= 2) {
        while (k + b < n && nums[k + b] <= target)
            k += b;
    }

    return nums[k] == target ? k : -1;
}
```

