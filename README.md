# git-task
[![asciicast](https://asciinema.org/a/130906.png)](https://asciinema.org/a/130906)

Recently I've learned about [keeping TODOs in git](https://coderwall.com/p/r2g2rq/keep-todos-in-git) which, I thought, was a good idea.

I need to write branch specific tasks so I know what's next todo (specially when I need to switch between branches). I've found that empty git commits are not so practical.

That was the moment when I realized that I need a tool, which can allow me to organize *my* tasks for given feature branch.

# Wait, another todo manager?

Well, not exactly. I like to plan next steps. For me it's quite common to **plan next commits** (using [imperative mood](https://chris.beams.io/posts/git-commit/#imperative)). 

This tool allows me to plan my next commits, and later use them as my actual [commit subjects](https://chris.beams.io/posts/git-commit/#imperative).  
During commit `git-task` will prepare commit message. All that needs to be done is uncommenting the line with commit which I wanted to create. After that task will be marked as finished.

[![asciicast](https://asciinema.org/a/130907.png)](https://asciinema.org/a/130907)

# How does it work?

It's really silly project so its mechanics are simple. `git-task` stores a json file inside `.git` directory. 

This way it's "bound" with the repository and will not "leak" to the server (this is only list of my future step, not a todo for entire team).  
This file does not interfere with git so it won't report any problems (or changes).

For advanced usage (preparing commit message; automatic task finishing) it's required to install git hooks in local repository.

# Requirements

* node >= 7.10
* npm

# Installation

```
@TODO
```

# Available commands

## `add <task>`

Adds new task to a current branch.

It's a default command so `add` keyword may be omitted.

```
git task Some important stuff
```

## `list` / `l`

Lists tasks for current branch

```
git task l
```

## `finish <id>` / `f <id>`

Marks selected task as *finished*.  
This can be undone with `-u` flag.

```
git task f 1
git task f -u 2
```

## `prune`

Remove all finished tasks for current branch.

```
git task prune
```

## `delete <id>`

Remove selected task.

```
git task delete 1
```

## `hooks`

Try to install git hooks to local repository.

This step is optional, however highly encouraged. Installed hooks will prepare commit message and automatically marked task as finished once it's commited.

```
git task hooks
```

For various reasons this command may fail. If so, hooks need to be installed manually.

# No tests!

This "software" is for my private use. For my own reasons I decided to skip writing test suite.

This means that you're using it on your own risk :)
