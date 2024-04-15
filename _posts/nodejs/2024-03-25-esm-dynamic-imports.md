---
layout: post
title: 'Effective Node.js Modules - Part 2: ESM dynamic imports'
categories: [ nodejs ]
image: /assets/img/dog-running.jpeg
image_alt: 'Dog running'
image_source: 'https://unsplash.com/photos/shallow-focus-photography-of-white-shih-tzu-puppy-running-on-the-grass-qO-PIF84Vxg'
---

One of the main differences between CJS and ESM modules is the way they handle dynamic imports. In CJS you can use
`require` to import modules anywhere in your code, but in ESM you can only use `import` at the top level of your code.
What if you want to import a module dynamically in ESM?

In this post, we will create a simple `Hello world!` application that uses dynamic imports to greet the user in
different languages. If you don't know how to enable ESM in Node.js, check the
[previous post]({% post_url nodejs/2024-01-07-effective-nodejs-modules-part-1 %}).

Below is the directory structure of our application:

```plaintext
.
├── main.js
├── package.json
└── translations
    ├── ar.js
    ├── de.js
    └── en.js
```

The `translations` directory contains three files: `en.js`, `de.js`, and `ar.js`. Each file exports constants that
represent the greeting message in a specific language. Here are the contents of the files:

```javascript
// translations/en.js
export const GREETING = 'Hello world!';
```

```javascript
// translations/ar.js
export const GREETING = 'مرحبا بالعالم!';
```

```javascript
// translations/de.js
export const GREETING = 'Hallo Welt!';
```

The `main.js` file is the entry point of our application. It gets the user's preferred language from the command
line then imports the corresponding translation module dynamically if it exists.

Here is the content of the `main.js` file:

```javascript
// main.js
const languages = ['en', 'de', 'ar'];
const defaultLanguage = 'en';

const language = process.argv[2] || defaultLanguage;

if (!languages.includes(language)) {
    console.error(`Unsupported language: ${language}`);
    process.exit(1);
}

// Get advantage of top-level await
const {GREETING} = await import(`./translations/${language}.js`);
console.log(GREETING);
```

To run the application, execute the following command:

```bash
node main.js de
```

In the `main.js` we used the `import()` expression, commonly called dynamic import. This expression will be evaluated
at runtime, and the module will be loaded asynchronously. The `await` keyword is used to wait for the module to be
loaded before continuing the execution.

<div class="tip" markdown="1">
Use dynamic import only when necessary. The static form is preferable for loading initial dependencies, and can benefit more readily from static analysis tools and tree shaking.
</div>

That's it! You have learned how to use dynamic imports in ESM modules.
