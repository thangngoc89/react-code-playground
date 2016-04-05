> This project is under **heavy development**
> If you a looking for a stable one you can use
> [jotted](https://github.com/ghinda/jotted) or
> [editr.js](https://github.com/Idered/Editr.js)

# Code playground [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

A component for rendering HTML, CSS, Javascript code with editable source and live preview.
You can think of this like CodePen or JSFiddle of you own.

[![travis-ci.org](https://travis-ci.org/thangngoc89/react-code-playground.svg?branch=master)](https://travis-ci.org/thangngoc89/react-code-playground)
[![codecov.io](https://codecov.io/github/thangngoc89/react-code-playground/coverage.svg?branch=master)](https://codecov.io/github/thangngoc89/react-code-playground?branch=master)

# Install

```shell
npm install --save code-playground
```

(WIP)

# Plugins

## Parsers (aka preprocessors)

`code-playground` is a lightweight component with no built-in preprocessors (I called them parsers).
You can add parsers via plugin interface.

List of available parsers 

- SASS (built-in, will be refactored into it's own package)

# Development

```
git clone https://github.com/thangngoc89/react-playground-component
npm install
npm start
```


# FAQ

## 1. How is this different from [component-playground](https://github.com/FormidableLabs/component-playground)

`component-playground` is for React Components while `code-playground` is for any front-end code that can be display on browser.

## 2. Can I use this on a site doesn't use React ?

Sorry but I don't have plan for this at the momment.

You can use some standalone alternative solution like
[jotted](https://github.com/ghinda/jotted) or
[editr.js](https://github.com/Idered/Editr.js).
In facts, Code playground was inspired by those projects
