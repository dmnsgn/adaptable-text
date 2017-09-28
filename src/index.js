import clamp from "clamp";

const defaults = {
  width: null,
  step: 0.5,
  minFontSize: 0
};

export default class AdaptableText {
  constructor(element, options) {
    this.element = element;
    this.options = Object.assign(defaults, options);

    // prettier-ignore
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz0123456789!?*()@£$%^&_-+=[]{}:;\'"\\|<>,./~`'.split('');
  }

  init() {
    this.reset();
  }

  reset() {
    // Get element styles
    this.styles = window.getComputedStyle(this.element);
    this.setWidth();

    // Set initial font size
    this.adaptedFontSize = parseFloat(
      this.styles.getPropertyValue("font-size")
    );
    this.initialFontsize = this.adaptedFontSize;

    // Get max character width
    this.maxCharWidth = 0;
    this.calculateMaxCharWidth();
  }

  setWidth() {
    this.width =
      this.element.getBoundingClientRect().width || this.options.width;
  }

  adapt() {
    // Get element content and replace <br>
    this.text = this.element.value || this.element.innerText;

    // Update adapted font size
    const previousFontSize = this.adaptedFontSize;
    const textWidth = this.getTextWidth(this.text, previousFontSize);

    // this.calculateMaxCharWidth();
    const availableWidth = this.width - this.maxCharWidth;

    let fontSizeGenerator;
    let newFontSize;
    if (
      textWidth > availableWidth &&
      previousFontSize > this.options.minFontSize
    ) {
      fontSizeGenerator = this.reduceFontSize(previousFontSize);
    } else {
      fontSizeGenerator = this.augmentFontSize(previousFontSize);
    }
    if (fontSizeGenerator) {
      newFontSize = fontSizeGenerator.next().value;
    }

    // Set font size if necessary
    if (previousFontSize !== newFontSize) {
      this.adaptedFontSize = clamp(
        newFontSize,
        this.options.minFontSize,
        this.initialFontsize
      );
      this.element.style.fontSize = `${this.adaptedFontSize}px`;
    }
  }

  *reduceFontSize(_fontSize) {
    let fontSize = _fontSize;
    const availableWidth = this.width - this.maxCharWidth;
    const textWidth = this.getTextWidth(this.text, fontSize);

    if (textWidth > availableWidth && fontSize > this.options.minFontSize) {
      fontSize -= this.options.step;
    } else {
      yield fontSize;
    }
    yield* this.reduceFontSize(fontSize);
  }

  *augmentFontSize(_fontSize) {
    let fontSize = _fontSize;
    const availableWidth = this.width - this.maxCharWidth;
    const textWidth = this.getTextWidth(this.text, fontSize);

    if (textWidth < availableWidth && fontSize < this.initialFontsize) {
      fontSize += this.options.step;
    } else {
      yield fontSize;
    }
    yield* this.augmentFontSize(fontSize);
  }

  getFontProperty(fontSize) {
    return `${this.styles.fontStyle} ${fontSize}px ${this.styles.fontFamily}`;
  }

  getTextWidth(text, fontSize) {
    const canvas =
      this.options.canvas ||
      (this.options.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = this.getFontProperty(fontSize);

    const lines = text.split("\n");
    let maxWidth = 0;
    for (let i = 0; i < lines.length; i++) {
      const metrics = context.measureText(lines[i]);
      maxWidth = Math.max(maxWidth, metrics.width);
    }

    return maxWidth;
  }

  calculateMaxCharWidth() {
    let len = this.chars.length;

    while (len--) {
      const charWidth = this.getTextWidth(
        this.chars[len],
        this.adaptedFontSize
      );

      if (charWidth > this.maxCharWidth) {
        this.maxCharWidth = charWidth / 2;
      }
    }
  }
}
