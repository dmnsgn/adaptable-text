// Generated by CoffeeScript 1.9.2
(function() {
  (function($, window, document) {
    var AdaptableText, defaults, pluginName;
    pluginName = "adaptableText";
    defaults = {
      minFontSize: 15
    };
    AdaptableText = (function() {
      function AdaptableText(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
        return;
      }

      AdaptableText.prototype.init = function() {
        this.reset();
        this.adapt();
      };


      /*
        Get element styles
       */

      AdaptableText.prototype.reset = function() {
        this.elementWidth = this.element.offsetWidth;
        this.styles = window.getComputedStyle(this.element);
        this.fontSize = +this.styles.fontSize.replace('px', '');
        this.maxCharWidth = 0;
        this._calculateMaxCharWidth();
      };


      /*
        Change element style to fit
       */

      AdaptableText.prototype.adapt = function() {
        var textWidth;
        this.text = this.element.value;
        console.log(this.elementWidth / this.maxCharWidth, this.styles.fontSize, this.settings.minFontSize);
        textWidth = this._getTextWidth(this.text, this.styles.fontStyle + " " + this.fontSize + "px " + this.styles.fontFamily);
        if (textWidth > this.elementWidth - this.maxCharWidth && this.maxCharWidth !== 0) {
          if (this.fontSize > this.settings.minFontSize) {
            this.fontSize -= 1;
          }
          console.log(this.fontSize);
          this.element.style.fontSize = this.fontSize + "px";
          console.log(this.elementWidth / this.maxCharWidth, this.fontSize, this.settings.minFontSize);
        }
      };


      /*
        Get text width via canvas
       */

      AdaptableText.prototype._getTextWidth = function(text, font) {
        var canvas, context, metrics;
        canvas = this.canvas || (this.canvas = document.createElement('canvas'));
        context = canvas.getContext('2d');
        context.font = font;
        metrics = context.measureText(text);
        return metrics.width;
      };


      /*
        Calculate max char width
       */

      AdaptableText.prototype._calculateMaxCharWidth = function(text, font) {
        var char, charWidth, chars, len;
        chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('');
        len = chars.length;
        while (len--) {
          char = chars[len];
          charWidth = this._getTextWidth(char, this.styles.fontStyle + " " + this.styles.fontSize + " " + this.styles.fontFamily);
          if (charWidth > this.maxCharWidth) {
            this.maxCharWidth = charWidth;
          }
        }
      };

      return AdaptableText;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "" + pluginName)) {
          return $.data(this, "" + pluginName, new AdaptableText(this, options));
        }
      });
    };
  })(jQuery, window, document);

}).call(this);
