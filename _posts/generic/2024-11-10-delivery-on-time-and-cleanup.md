---
layout: post
title: Delivery on Time and Some Clean Up 🧹
categories: [ "generic" ]
---

Delivering a project to a major client always brings a mix of excitement and relief. Last week, our team successfully
handed over a project to the Deutscher Fußball-Bund ([DFB](https://www.dfb.de/)) right on schedule. The DFB, being the
German Football Association, is not only one of our biggest clients but also one of the largest football associations
globally. We had an online meeting to oversee the project's launch and ensure everything went off without a hitch, and
it did! 🎉

During this time, I also decided to tackle some overdue cleaning tasks. From tidying up my desk and washing room
to organizing my kitchen and even my Git branches, it was a week of thorough cleanup.

My friend Eman introduced me to Hadeer, a talented organizer. She helped me organize my desk and plans to add some
aesthetic touches later.

![Desk-Bike](/assets/img/desk-bike.JPG)
I wanted to share a photo of my desk, but the surrounding mess still impacts its appearance.

![Zhgt](/assets/img/any-zhgt.PNG)
I'm thinking about either cleaning up the entire office or moving my desk to a different spot.

Another spot that needed attention was my PS4 desk:

![PS4](/assets/img/ps4.JPG)

The cable arrangement still bothers me, but I've ordered some cable management tools arriving tomorrow. Hopefully, it
will look much better after that.

On the tech side, I realized I had many local Git branches that were no longer needed since they had already been
merged. While Jetbrains IDEs can filter branches easily, I wanted to handle this cleanup from the terminal. So, I
updated my `~/.gitconfig` file with a new alias tailored for our team's workflow:

```bash
[alias]
    cleanup = "!f() { git branch | grep -v 'develop' | grep -v 'main' | grep -v 'master' | grep -v -E '^[0-9]+\\.x' | grep -v '\\*' | xargs git branch -D; }; f"
```

This way, I can simply run:

```bash
git cleanup
```

And all branches will be deleted except `develop`, `main`, `master`, and any `1.x` or similar branches.

Additionally, to keep my Git history clean, I configured my Git pulls to rebase:

```bash
[pull]
    rebase = true
```

Typically, when you pull changes from a remote repository, Git merges them into your current branch. However, with
rebase enabled, Git reapplies your local commits on top of the fetched commits, creating a linear project history. This
keeps your commit history cleaner and more readable by avoiding unnecessary merge commits.

Wrapping up, it was a week of successful deliveries and much-needed organization. I'm looking forward to the next
steps... 🐾
