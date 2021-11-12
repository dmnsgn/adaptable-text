import clamp from "clamp";

/**
 * @typedef {Object} Options
 * @property {number} [step=0.5] The step used by the generator to calculate the width of the element.
 * @property {number} [minFontSize=0] A minimum font size for the element (max would be the size defined in a stylesheet retrieved by `window.getComputedStyle(this.element)`).
 * @property {number} [width=null] A maximum width for the container..
 */

class AdaptableText {
  /**
   * Creates an instance of AdaptableText.
   * @param {HTMLElement} element
   * @param {Options} [options]
   */
  constructor(element, options) {
    this.element = element;
    this.options = Object.assign(
      {
        width: null,
        step: 0.5,
        minFontSize: 0,
      },
      options
    );

    // prettier-ignore
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz0123456789!?*()@£$%^&_-+=[]{}:;\'"\\|<>,./~`'.split('');
  }

  /**
   * Initialise the adaptor.
   */
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

  /**
   * Set the desired width for adaptation from options.width or getBoundingClientRect().width
   */
  setWidth() {
    this.width =
      this.options.width || this.element.getBoundingClientRect().width;
  }

  /**
   * Adapt font size to a specified width
   */
  adapt() {
    // Get element content and replace <br>
    this.text = this.element.value || this.element.innerText;

    // Update adapted font size
    const previousFontSize = this.adaptedFontSize;
    const textWidth = this.getTextWidth(this.text, previousFontSize);

    this.calculateMaxCharWidth();
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

export default AdaptableText;
