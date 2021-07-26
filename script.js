/*!
Waypoints Sticky Element Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
  function Sticky(options) {
    this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options)
    this.element = this.options.element
    this.$element = $(this.element)
    this.createWrapper()
    this.createWaypoint()
  }

  /* Private */
  Sticky.prototype.createWaypoint = function() {
    var originalHandler = this.options.handler

    this.waypoint = new Waypoint($.extend({}, this.options, {
      element: this.wrapper,
      handler: $.proxy(function(direction) {
        var shouldBeStuck = this.options.direction.indexOf(direction) > -1
        var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : ''

        this.$wrapper.height(wrapperHeight)
        this.$element.toggleClass(this.options.stuckClass, shouldBeStuck)

        if (originalHandler) {
          originalHandler.call(this, direction)
        }
      }, this)
    }))
  }

  /* Private */
  Sticky.prototype.createWrapper = function() {
    if (this.options.wrapper) {
      this.$element.wrap(this.options.wrapper)
    }
    this.$wrapper = this.$element.parent()
    this.wrapper = this.$wrapper[0]
  }

  /* Public */
  Sticky.prototype.destroy = function() {
    if (this.$element.parent()[0] === this.wrapper) {
      this.waypoint.destroy()
      this.$element.removeClass(this.options.stuckClass)
      if (this.options.wrapper) {
        this.$element.unwrap()
      }
    }
  }

  Sticky.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  }

  Waypoint.Sticky = Sticky
}())
;

$(function() { 
	  $('span.pullquote').each(function() { 
		var $parentParagraph = $(this).parent('p'); 
		$(this).clone() 
		  .addClass('pulledquote')
		  .appendTo($parentParagraph); 
	  }); 
    $(".article-details-wrapper").fitText(10, { minFontSize: '7px' });
    $("span.pulledquote").fitText(4.2, { minFontSize: '13px' });
    $(".article-sidebar").fitText(2, { minFontSize: '9.5px' });
    $('h1.article-title').lettering('words')  
    $( "#article-cover" ).css( "height", function () {
      return (this.bottom = $('.hero-photo').outerHeight(true)+$('#article-details').outerHeight(true))
    }
);
});

var sticky = new Waypoint.Sticky({
  element: $('#article-details')[0]
})

var sticky = new Waypoint.Sticky({
  element: $('#read-more')[0]
})

$('#article-images').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true
});

$('#read-more').localScroll();

$( "#btn-menu" ).click(function() {
  $( "#menu" ).toggleClass( "close" );
});