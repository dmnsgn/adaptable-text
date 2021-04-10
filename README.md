# adaptable-text

[![npm version](https://img.shields.io/npm/v/adaptable-text)](https://www.npmjs.com/package/adaptable-text)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/adaptable-text)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/adaptable-text)](https://www.npmjs.com/package/adaptable-text)
[![dependencies](https://img.shields.io/david/dmnsgn/adaptable-text)](https://github.com/dmnsgn/adaptable-text/blob/main/package.json)
[![types](https://img.shields.io/npm/types/adaptable-text)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/adaptable-text)](https://github.com/dmnsgn/adaptable-text/blob/main/LICENSE.md)

Adapt font size to a specified width.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

## Installation

```bash
npm install adaptable-text
```

## Usage

```js
import AdaptableText from "adaptable-text";

const textToAdapt = new AdaptableText(document.querySelector(".textToAdapt"), {
  step: 0.1,
  minFontSize: 10,
  width: null,
});
textToAdapt.init();

// Adapt
const adapt = () => {
  textToAdapt.setWidth();
  textToAdapt.adapt();
};

// Listen for a resize event
window.addEventListener("resize", adapt);

// Kick off
requestIdleCallback(() => {
  adapt();
});
```

## API

<!-- api-start -->

## Classes

<dl>
<dt><a href="#AdaptableText">AdaptableText</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Options">Options</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="AdaptableText"></a>

## AdaptableText

**Kind**: global class

- [AdaptableText](#AdaptableText)
  - [new AdaptableText(element, [options])](#new_AdaptableText_new)
  - [.init()](#AdaptableText+init)
  - [.setWidth()](#AdaptableText+setWidth)
  - [.adapt()](#AdaptableText+adapt)

<a name="new_AdaptableText_new"></a>

### new AdaptableText(element, [options])

Creates an instance of AdaptableText.

| Param     | Type                             |
| --------- | -------------------------------- |
| element   | <code>HTMLElement</code>         |
| [options] | [<code>Options</code>](#Options) |

<a name="AdaptableText+init"></a>

### adaptableText.init()

Initialise the adaptor.

**Kind**: instance method of [<code>AdaptableText</code>](#AdaptableText)
<a name="AdaptableText+setWidth"></a>

### adaptableText.setWidth()

Set the desired width for adaptation from options.width or getBoundingClientRect().width

**Kind**: instance method of [<code>AdaptableText</code>](#AdaptableText)
<a name="AdaptableText+adapt"></a>

### adaptableText.adapt()

Adapt font size to a specified width

**Kind**: instance method of [<code>AdaptableText</code>](#AdaptableText)
<a name="Options"></a>

## Options : <code>Object</code>

**Kind**: global typedef
**Properties**

| Name          | Type                | Default          | Description                                                                                                                               |
| ------------- | ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [step]        | <code>number</code> | <code>0.5</code> | The step used by the generator to calculate the width of the element.                                                                     |
| [minFontSize] | <code>number</code> | <code>0</code>   | A minimum font size for the element (max would be the size defined in a stylesheet retrieved by `window.getComputedStyle(this.element)`). |
| [width]       | <code>number</code> | <code></code>    | A maximum widht for the container..                                                                                                       |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/adaptable-text/blob/main/LICENSE.md).
