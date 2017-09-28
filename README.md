# adaptable-text

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


> Adapt font size to a specified width.

## Install

```
$ npm install --save adaptable-text
```

## API

### LoadItem

```js
const textToAdapt = new AdaptableText(document.querySelector(".textToAdapt"), {
  step: 0.1,
  minFontSize: 10,
  width: null
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

|Key|Description
|:---------|:---------|
|**step**|The step used by the generator to calculate the width of the element|
|**minFontSize**|A minimum font size for the element (max would be the size defined in a stylesheet retrieved by `window.getComputedStyle(this.element)`)|
|**width**|A maximum widht for the container.|

## Scripts
### Dev

```bash
npm run dev
```

### Test

```bash
npm run test
```

### Build

```bash
npm run build
```

## License

MIT © [Damien Seguin](https://github.com/dmnsgn)
