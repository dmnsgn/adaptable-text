
do ($ = jQuery, window, document) ->

  pluginName = "adaptableText"
  defaults =
    minFontSize: 15

  class AdaptableText
    constructor: (@element, options) ->
      @settings = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName
      @init()

      return

    init: ->

      @reset()

      @adapt()

      return

    ###
      Get element styles
    ###
    reset: ->

      @elementWidth = @element.offsetWidth
      @styles = window.getComputedStyle @element
      @currentFontSize = +@styles.fontSize.replace('px', '')
      @initialFontsize = @currentFontSize

      @maxCharWidth = 0
      @_calculateMaxCharWidth()

      return this

    ###
      Change element style to fit
    ###
    adapt: ->

      # Get content
      @text = @element.value or @element.textContent

      # https://developer.mozilla.org/en-US/docs/Web/CSS/font
      textWidth = @_getTextWidth @text, "#{@styles.fontStyle} #{@currentFontSize}px #{@styles.fontFamily}"

      # Change current font size if needed
      @previousFontSize = @currentFontSize
      @_checkSize()

      # Apply styles
      if @previousFontSize isnt @currentFontSize
        @currentFontSize = ~~(@currentFontSize * 100) / 100
        @element.style.fontSize = "#{@currentFontSize}px"

      return this

    _checkSize: ->

      if @_getTextWidth(@text, "#{@styles.fontStyle} #{@currentFontSize}px #{@styles.fontFamily}") < @elementWidth - @maxCharWidth

        recursiveCheck = =>
          textWidth = @_getTextWidth @text, "#{@styles.fontStyle} #{@currentFontSize}px #{@styles.fontFamily}"
          if @_getTextWidth(@text, textWidth) < @elementWidth - @maxCharWidth and @currentFontSize < @initialFontsize
            @currentFontSize += 0.1
            recursiveCheck()
          else
            return

      else
        recursiveCheck = =>
          textWidth = @_getTextWidth @text, "#{@styles.fontStyle} #{@currentFontSize}px #{@styles.fontFamily}"
          if @_getTextWidth(@text, textWidth) > @elementWidth - @maxCharWidth and @currentFontSize > @settings.minFontSize
            @currentFontSize -= 0.1
            recursiveCheck()
          else
            return

      recursiveCheck()

      return

    ###
      Get text width via canvas
    ###
    _getTextWidth: (text, font) ->
      canvas = @canvas or (@canvas = document.createElement('canvas'))
      context = canvas.getContext('2d')
      context.font = font
      metrics = context.measureText(text)

      return metrics.width

    ###
      Calculate max char width
    ###
    _calculateMaxCharWidth: ->

      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz0123456789!?*()@£$%^&_-+=[]{}:;\'"\\|<>,./~`'.split('')
      len = chars.length

      while len--
        char = chars[len]
        charWidth = @_getTextWidth char, "#{@styles.fontStyle} #{@styles.fontSize} #{@styles.fontFamily}"
        if charWidth > @maxCharWidth
          @maxCharWidth = charWidth

      return

  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data @, "#{pluginName}"
        $.data @, "#{pluginName}", new AdaptableText @, options
