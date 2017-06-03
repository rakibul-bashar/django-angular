---
title: Tasks
related:
  doc:
    - link: updaters
      title: Running updaters
      anchor: '#running-updaters'
    - updaters
    - updatefile
---

Tasks are used for wrapping code that should be executed at a later point, either when specified by command line or explicitly run when using the API.

<!-- toc -->

## Creating tasks

Tasks are asynchronous functions that are registered by name using the `.task` method, and can be run using the `.build` method.

```js
app.task('foo', function(cb) {
  // since tasks are asynchronous, you must call the callback when the task is complete
  cb();
});
```

## Running tasks

Tasks can be run by command line or API.

### Command line

Pass the names of the tasks to run after the `update` command.

**Examples**

Run task `foo`:

```sh
update foo
```

Run tasks `foo`, `bar` and `baz`:

```sh
update foo bar baz
```

**Conflict resolution**

You might notice that [updaters](updaters.md) can also be run from the command line using the same syntax. Update can usually determine whether you meant to call tasks or updaters. Visit the [running updaters](updaters.md#running-updaters) documentation for more information.

### Task API

#### .task

Create a task:

```js
app.task(name, fn);
```

**Params**

* `name` **{String}**: name of the task to register
* `fn` **{Function}**: asynchronous callback function, or es6 generator function

**Example**

```js
app.task('default', function(cb) {
  // do task stuff (be sure to call the callback)
  cb();
});
```

**Stream or callback**

When using update's file system API (`.src`/`.dest` etc), you can optionally return a stream instead of calling a callback. Either a callback must be called, or a stream must be returned, otherwise update has no way of knowing when a task is complete.

#### .build

Run one or more tasks.

**Params**

* `names` **{String|Array|Function}**: names of one or more tasks to run, or callback function if you only want to run the [default task](#default-task)
* `callback`: callback function, invoked after all tasks have finished executing. The callback function exposes `err` as the only argument, with any errors that occurred during the execution of any tasks.

**Example**

```js
app.task('foo', function(cb) {
  // do task stuff
  cb();
});

app.task('bar', function(cb) {
  // do task stuff
  cb();
});

app.build(['foo', 'bar'], function(err) {
  if (err) return console.log(err);
  console.log('done');
});
```

#### .update

The `.update` method may also be used to run tasks. However, `.update` can be used to run _tasks and updaters_, thus it will also look for updaters to run when a task is not found.

_To ensure that only tasks are run, use the `.build` method._

See the [updaters documentation](updaters.md) for more details.

### Task composition

#### Task dependencies

When a task has "dependencies", this means that one or more other tasks need to finish before the task is executed.

Dependencies can be passed as the second argument to the `.task` method.

**Example**

In the following example, task `foo` has dependencies `bar` and `baz`:

```js
app.task('foo', ['bar', 'baz'], function(cb) {
  // do task stuff
  cb();
});
```

Task `foo` will not execute until tasks `bar` and `baz` have completed.

#### Alias tasks

An "alias" task is a task with one or more dependencies and _no callback_.

**Example**

In this example, task `foo` is an alias for tasks `bar` and `baz`:

```js
app.task('foo', ['bar', 'baz']);
```

In this example, task `foo` is an alias for task `baz`

```js
app.task('foo', ['baz']);
```

### default task

The `default` task is run automatically when a callback is passed as the only argument:

```js
app.task('default', function(cb) {
  // do task stuff
  cb();
});

// no need to specify "default", but you can if you want
app.build(function(err) {
  if (err) return console.log(err);
  console.log('done');
});
```
