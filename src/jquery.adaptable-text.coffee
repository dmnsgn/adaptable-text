
do ($ = jQuery, window, document) ->

  pluginName = "adaptableText"
  defaults =
    # fontStyle: "normal"
    # fontSize: "10px"
    # fontFamily: "Arial"
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
      @fontSize = +@styles.fontSize.replace('px', '')

      @maxCharWidth = 0
      @_calculateMaxCharWidth()

      return

    ###
      Change element style to fit
    ###
    adapt: ->

      # TODO; check if textContent or value
      @text = @element.value

      console.log @elementWidth / @maxCharWidth, @styles.fontSize, @settings.minFontSize

      # https://developer.mozilla.org/en-US/docs/Web/CSS/font
      textWidth = @_getTextWidth @text, "#{@styles.fontStyle} #{@fontSize}px #{@styles.fontFamily}"

      if textWidth > @elementWidth - @maxCharWidth and @maxCharWidth isnt 0
        if @fontSize > @settings.minFontSize
          @fontSize -= 1
        console.log @fontSize
        @element.style.fontSize = "#{@fontSize}px"

        console.log @elementWidth / @maxCharWidth, @fontSize, @settings.minFontSize
      # console.log @_getTextWidth @text, "#{@_defaults.fontStyle} #{@_defaults.fontSize} #{@_defaults.fontFamily}"

      return

    ###
      Get text width via canvas
    ###
    _getTextWidth: (text, font) ->
      # console.log font
      canvas = @canvas or (@canvas = document.createElement('canvas'))
      context = canvas.getContext('2d')
      context.font = font
      metrics = context.measureText(text)

      return metrics.width

    ###
      Calculate max char width
    ###
    _calculateMaxCharWidth: (text, font) ->

      chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('')
      len = chars.length

      while len--
        char = chars[len]
        charWidth = @_getTextWidth char, "#{@styles.fontStyle} #{@styles.fontSize} #{@styles.fontFamily}"
        if charWidth > @maxCharWidth
          # console.log char, charWidth
          @maxCharWidth = charWidth

      return

  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data @, "#{pluginName}"
        $.data @, "#{pluginName}", new AdaptableText @, options
