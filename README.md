# git-task
[![asciicast](https://asciinema.org/a/130906.png)](https://asciinema.org/a/130906)

It's quite common for me to plan next commits. I've been looking for some suitable solution which could help me manage the things I want to do.

But not a todo app. Something that is integrated with git. First I've tried to use mashup of `git config` and bash prompt. Later I've found about [adding empty TODO commits](https://coderwall.com/p/r2g2rq/keep-todos-in-git). I've tried using [twig](https://github.com/rondevera/twig). Yet none of those solutions suite my needs.

So I've created my own.

# Wait, another todo manager?

Well, yes and no. Yes, it stores a list of todos. No, they're not *just* todos. Those are my **future commits**.  
`git-task` allows to define such commits, and later use them during actual commit.

[![asciicast](https://asciinema.org/a/130907.png)](https://asciinema.org/a/130907)

Idea is simple. Define future commits (aka tasks), pick one and start working. When finished type `git commit`.  
`git-task` will generate commit message for you - simply pick one of tasks, uncomment it and save the message. Task will be automatically marked as finished.

**Protip**: I try to name my commits using [imperative mood](https://chris.beams.io/posts/git-commit/#imperative). It's also quite useful for defining a task so it's a win-win :)

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

# Software provided *as is*

This "software" is for my private use. For my own reasons I decided to skip writing test suite.

This means that you're using it on your own risk :)
