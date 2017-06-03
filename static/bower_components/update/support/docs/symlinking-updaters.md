---
title: Symlinking updaters
related:
  doc: ['tasks', 'updatefile', 'installing-updaters', 'updaters']
---

While developing [updaters](updaters.md), you might find it useful to symlink them to global `node_modules` so that Update's CLI will find them and run them, as if they had been installed from npm using `npm install --global`.

The following example shows you to do this.

## Example

**1. Create an updater project**

Create a new project named `updater-aaa`. You can expedite this using [generate][] or Google's Yeoman or however you prefer.

**2. Add `index.js`**

In `index.js`, add the following code:

```js
// -- index.js --
module.exports = function(app) {
  app.task('default', function(cb) {
    console.log('updater', app.name, '> task', this.name);
    cb();
  });
};
```

- `app.name` will display the name of the updater being run
- `this.name` will display the name of the task being run

_(Also make sure the `index.js` is listed in the `main` property in package.json, so that node's `require()` system finds the file)_

**3. Symlink**

Next, we need to symlink the module to global `node_modules`, so that `updater-aaa` is discoverable by Update's CLI.

From the root of the `updater-aaa` project, run the following command:

```sh
$ npm link
```

**4. Run**

To test that `updater-aaa` was symlinked properly, run the following command:

```sh
$ update aaa
```

You should see something like the following in the terminal

```sh
updater updater-aaa > task default
```

If not, review the steps and make sure you did everything described. If you still can't get it working please [create an issue](../../../issues) so we can look into it.

**Next steps**

If you'd like to see how multiple updaters can work together, repeat the same steps described above to create and symlink `updater-bbb` and `updater-ccc`.

Then run:

```sh
update aaa bbb ccc
```

