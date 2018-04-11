(function($) {
  $.fgStickyComponent = function(el, options) {
    var defaults = {
      topoffset: 75,
      triggertop: 150,
      startselector: undefined,
      activeclass: 'fg-sticky-active',
      bottomoffset: 75,
      removesize: 640,
      stopselector: 'footer',
      debug: false,
      onInit: function() {}

    };
    var plugin = this;
    plugin.settings = {};
    plugin.globals = {
      parentSize: 0,
      parentTop: 0

    };

    var $element = $(el), // reference to the jQuery version of DOM element
      element = el; // reference to the actual DOM element

    // the "constructor" method that gets called when the object is created
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options, $element.data());
      plugin._resize();

      //window resize
      $(window).resize(function(event) {
        plugin._resize();
      });
      $(window).scroll(function() {
        plugin._resize();
      });
      plugin.settings.onInit($element);

    };
    plugin.is_touch_device = function() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    };

    plugin._resize = function() {
      // checking if functoin is enabled
      if (window.innerWidth >= plugin.settings.removesize) {
        //setting width to same as parent
        $element.css({
          width: $element.parent().innerWidth() + 'px',
          height: 'auto',
          position: 'absolute'
        });
        plugin.globals.height = $element.outerHeight(true);
        plugin.globals.parentSize = $element.parent().innerWidth();
        plugin.globals.parentTop = $element.parent().offset().top;
        // if has st
        plugin.settings.triggertop = (plugin.settings.startselector === undefined) ? plugin.settings.triggertop : plugin.settings.startselector.offset().top;
        //checking if top of page is passed trigger, go to scrolling down mode
        if (plugin.settings.triggertop <= $(window).scrollTop() + plugin.settings.topoffset) {
          var windowScrollTopLimit = $(window).scrollTop() + (plugin.globals.height + plugin.settings.topoffset + plugin.settings.bottomoffset);

          //_debug('Sticky Mode window windowtop', $(window).scrollTop());
          var stickyAbsolutePosition = ($(plugin.settings.stopselector).offset().top - $element.parent().offset().top) - (plugin.settings.bottomoffset + plugin.globals.height);

          // Adding active class if not already and trigger active event

          if ($element.data('status') !== 'active') {
            $element.data('status', 'active');
            $element.addClass(plugin.settings.activeclass);
            $element.trigger('fg.stickycomponent.active', [plugin.globals, $(window).scrollTop()]);
          }

          // this means it has at its lower limits	
          if ($(plugin.settings.stopselector).offset().top < windowScrollTopLimit) {
            $element.css({
              top: stickyAbsolutePosition + 'px',
              position: 'absolute'
            });
            if ($element.data('state') !== 'bottom') {
              $element.data('state', 'bottom');
              $element.trigger('fg.stickycomponent.bottom', [plugin.globals, $(window).scrollTop()]);
            }
          }
          // this means scrolling down.
          else {
            if ($element.data('state') !== 'moving') {
              $element.data('state', 'moving');
              $element.trigger('fg.stickycomponent.moving', [plugin.globals, $(window).scrollTop()]);
            }

            // testing if touch device use absolute instead of fixed as fixed is clitch on touch devices.
            if (!plugin.is_touch_device()) {
              $element.css({
                top: plugin.settings.topoffset + 'px',
                position: 'fixed'
              });
            } else {
              var topForMobile = $(window).scrollTop() - $element.parent().offset().top + plugin.settings.topoffset;
              $element.css({
                top: topForMobile + 'px',
                postion: 'absolute'
              });
            }
          }
        } else {
          $element.css({
            top: 0,
            position: 'relative'
          });
          if ($element.data('status') !== 'normal') {
            $element.data('status', 'normal');
            $element.removeClass(plugin.settings.activeclass);
            $element.trigger('fg.stickycomponent.normal', [plugin.globals, $(window).scrollTop()]);
          }
        }
      }
      // don't do anything due to size of screen
      else {
        $element.css({
          top: 0,
          position: 'relative',
          width: $element.parent().innerWidth() + 'px',
          height: '100%'
        });
      }
    };
    var _debug = function(title, msg) {
      if (plugin.settings.debug) {
        console.log(new Date(), title + ' : ', msg);
      }
    };
    plugin.init();
  };
  // add the plugin to the jQuery.fn object
  $.fn.fgStickyComponent = function(options) {
    // iterate through the DOM elements we are attaching the plugin to
    return this.each(function() {
      // if plugin has not already been attached to the element
      if (undefined === $(this).data('fgStickyComponent')) {
        var plugin = new $.fgStickyComponent(this, options);
        $(this).data('fgStickyComponent', plugin);
      }
    });
  };
})(jQuery);
