---
layout: post
title: 'Effective Node.js Modules - Part 1: Basic Syntax'
categories: [ nodejs ]
image: /assets/img/dog-laptop-code-bed.jpeg
---

Do you know what is the difference between the following two code snippets?

```js
const { app, connection } = require('./config');
```

And this one:

```js
import { app, connection } from './config.js';
```

Both of them import the `app` and `connection` from the `config` module, but the first one is using the **CommonJS** (
CJS) module system, and the second one is using the **ECMAScript** (ES) module system.

Modules allow you to split your code into small units, that can be reused and tested independently. They are also the
main way to enforce information hiding by exposing (exporting) only the public API of the module.

In this series of posts, we will talk about how to use modules effectively in your Node.js applications. By the end of
this series, you should be able to make pragmatic decisions about how to use modules effectively in your Node.js
applications.

| 📋 | Posts in this series |
|----|----------------------|
| 1  | Basic Syntax         |
| 2  | ...                  |

Javascript was introduced in 1995 as a scripting language for browsers. It was not designed to be used as a server
language. Browsers should keep an eye on the security of the user and the system, so they need to limit the access of
the Javascript code to the system resources. The nature of the Javascript and the browser environment allowed the use
of the `script` tag to load Javascript code didn't help the developers to write modular code. Developers used multiple `script`
tags to load the Javascript code in the right order.

```html

<script src="foo.js"></script>
<script src="bar.js"></script>
<script src="baz.js"></script>
```

When Node.js was introduced in 2009 as a server-side Javascript runtime, it came with full access to the underlying
system resources. This allowed providing the CommonJS module system to allow developers to write modular code and
organize their applications into small reusable units.

### CJS: CommonJS module system

The CJS module system is the default module system of Node.js. **CJS** uses `require` to import modules
and `module.exports`or `exports` to export modules. `exports` is a reference to `module.exports`, so you can use either
of them to export modules as follows:

```js
// config.js
module.exports = {
  app: {
    name: 'Awesome App',
    port: 3000,
  }
}
```

Is the same as:

```js
// config.js
exports.foo = {
  app: {
    name: 'Awesome App',
    port: 3000,
  }
}
```

The `require` function returns the exported value of the module.

```js
// main.js
const config = require('./config.js')

console.log(config) // { app: { name: 'Awesome App', port: 3000 } }
```

You can also use the `require` function to import a single module from a file that exports multiple modules.

```js
// config.js
module.exports = {
  app: {
    name: 'Awesome App',
    port: 3000,
  },
  connection: {
    host: 'localhost',
    port: 27017,
  }
}
```

```js
// main.js
const { connection } = require('./config.js')

console.log(connection) // { host: 'localhost', port: 27017 }
console.log(app) // ReferenceError: app is not defined
```

The CJS allows you to conditionally import modules using the `require` function. This is useful when you want to load
modules based on a specific condition.

```js
// main.js
const config = require('./config')

let logger
if (config.app.env === 'test') {
  logger = require('./silent-logger')
} else {
  logger = require('./logger')
}
```

### ESM: ECMAScript module system

<div class="tip">
   <p>
If you want to use ESM modules, you need to set the "type" to module "module" in the package.json file. Or name your files with the ".mjs" extension.
</p>
</div>

```js
// package.json
{
  "type": "module"
}
```

ECMAScript modules (ESM) are the standard official module system of Javascript. It was introduced in 2015 as part of
the ES6 specification. It was introduced with the goal of narrowing the gap between the browser and the server when
it comes to the module system. It was added to Node.js on `v8.5.0` as an experimental feature. By `v13.2.0`, loading
ESM modules became available without any command-line flags.

ESM uses `export` to export modules and `import` to import modules.

<div class="tip">
    <p>ESM uses `export` in the singular format not `exports` like CJS.</p>
</div>

The following example shows how to export a function:

```js
// sum.mjs
function sum (a, b) {
  return a + b
}

export { sum }
```

The following example shows how to import that function:

```js
// app.mjs
import { sum } from './sum.mjs' // File extension is required to import relative modules

console.log(sum(7, 9)) // 16
```

You can also export a default module using the `export default` syntax. This is useful when you want to export a single
module from a file. Exporting a default module doesn't prevent you from exporting other modules from the same file.

The following example shows how to export a default module:

```js
// sum.mjs
export default function sum (a, b) {
  return a + b
}
```

The following example shows how to import that function:

```js
// app.mjs
import sum from './sum.mjs'

console.log(sum(7, 9)) // 16
```

The following example shows a mixed export of a default module and other modules:

```js
// calculator.mjs
export function sum (a, b) {
  return a + b
}

export function subtract (a, b) {
  return a - b
}

export default function calculate (input) {
  // a magic function that takes a string input like "1 + 2" and returns the result
}
```

If you imported the default module, then you have access to the `calculate` function which is the default export of
the module. You can also give it any name you want.

```js
// app.mjs

import myCalculator from './calculator.mjs'

console.log(myCalculator('1 + 2')) // 3

myCalculator.sum(1, 2) // TypeError: myCalculator.sum is not a function
```

If you imported the module using the `import * as` syntax, then you have access to all the exported modules. The `import * as`
imports all the exported modules in a single object.

```js
// app.mjs

import * as calculator from './calculator.mjs'

console.log(calculator.sum(1, 2)) // 3
console.log(calculator.subtract(1, 2)) // -1
console.log(calculator.default('1 + 2')) // 3
```

As you already noticed, using something like `calculator.default` is not very convenient. You can get the same
result by the following readable syntax:

```js
// app.mjs

import calculate, { sum, subtract } from './calculator.mjs'

console.log(sum(1, 2)) // 3
console.log(subtract(1, 2)) // -1
console.log(calculate('1 + 2')) // 3
```

The `calculate` is our custom name for the default export of the module, the other modules are imported using their
original names. You can also use the `as` keyword to rename the imported modules.

```js
// app.mjs

import calculate, { sum as add, subtract } from './calculator.mjs'

console.log(add(1, 2)) // 3
console.log(subtract(1, 2)) // -1
console.log(calculate('1 + 2')) // 3
```

The ESM modules doesn't support conditionally importing modules. All the imports should be at the top of the file.

<div class="danger">
    <p>The following code will throw a SyntaxError: </p>
</div>

```js
// app.mjs

import config from './config.mjs'

if (config.app.env === 'test') {
  import logger from './silent-logger.mjs'
} else {
  import logger from './logger.mjs'
}
```

## Summary

In this post, we talked about the basic syntax of the CJS and ESM modules. We talked about how to import and export
modules using both module systems. We didn't cover all the details, but we covered the basics that you need to know to
differentiate between the two module systems.

<sub>
Image: [Photo by Jorge Rosal on Unsplash](https://unsplash.com/photos/a-dog-lays-on-a-bed-next-to-a-laptop-IGfoMhQhtwo)</sub>
