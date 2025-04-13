# web-module-curator

Use es6 modules from npm in webapps without transpiling.

A tool class, to create a library out of the sources of `node_modules` 
to use them in web apps as native es6 modules.

Mainly used in `postinstall.js`. 

It works in these plain es6 module based apps, which are not transpiled or compiled:

- [cm-chessboard](https://shaack.com/projekte/cm-chessboard/)
- [chess-console](https://shaack.com/projekte/chess-console/examples/game-with-random.html)

## Usage

```js
// Create an instance of the `WebModuleCurator` in your `postinstall.js`:

const WebModuleCurator = require("web-module-curator")
const curator = new WebModuleCurator(__dirname) // parameter projectRoot

// Then add Modules:

curator.addModule("npm-module-name-1");
curator.addModule("npm-module-name-2");
// [..]
```

The module sources will be copied from the `node_modules` to a `lib` folder for easy handling of
the relative include path from es6 modules. It's hard to explain, but it works. ;) 

## API

### constructor

```js
/**
 * Create a curator
 * @param projectRoot Your project root, mostly `__dirname`
 * @param props Configuration properties
 */
WebModuleCurator(projectRoot, props)
```

Default props

```js
props = {
    nodeModulesPath: path.resolve(__dirname, '../../'), // path to `node_modules`
    projectLibFolder: "lib", // library folder where the module sources are linked/copied to
    mode: "copy" // set to "symlink" to symlink sources instead of copying
}
```

### addModule

```js
/**
 * Add a module to the library
 * @param moduleName Name of the module
 * @param moduleSourceRoot  The source root inside the module folder
 * @param moduleSource The module source folder or file inside the 'moduleSourceRoot'
 */
addModule(moduleName, moduleSourceRoot = "src", moduleSource = moduleName)
```