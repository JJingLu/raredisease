/*!
Waypoints Sticky Element Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/


// JS

      
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



function isInViewport(devide,el) {
  if (!devide) {
      devide = 1.3;
  }
  var elementTop = el.offset().top;
  var elementBottom = elementTop + el.outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height() / devide;

  return elementBottom > viewportTop && elementTop < viewportBottom;
}

$(window).on('load resize scroll', function() {
  $('[data-tspeed]').each(function() {
      if (isInViewport(1.3,$(this)) && !$(this).data('type')) {
          typeIt($(this));
          $(this).attr('data-type','NO_TYPE');
      }
  })
});

function typeIt(idNode) {
  var way = $(idNode),
      currDiv = way.find('[data-typeit]'),
      times = currDiv.length,
      speed = Number(way.data('tspeed')),
      wait = Number(way.data('tawait')),
      count = 0,
      countIndex = 0,
      contentOut = '',
      skip = false,
      cursor = '<span class="slash-typeit">|<span>';

  ! function doMagic(idDiv) {
      var currentData = currDiv.eq(idDiv).data('typeit');
      currDiv.eq(idDiv).addClass('activated-typeit');
    
      ! function letterByLetter() {
          contentOut += currentData[countIndex];

          if (countIndex == currentData.length - 1) cursor = '';

          var pause = contentOut.substr(contentOut.length - 1);

          if (pause === '|') {
              var delay = 500;
              for (var i = countIndex + 1; i < currentData.length; i++) {
                  if (currentData[i] === '|') {
                      i = i - countIndex;
                      delay = currentData.substr(countIndex, i + 1);
                      currentData = currentData.replace(delay, '');
                      delay = delay.replace(/\|/g, '');
                      setTimeout(function() {
                          typing();
                      }, skip ? 0 : delay);
                      return false;
                  }
              }
          } else {
              typing();
          }

          function typing() {
              contentOut = contentOut.replace('|', '').replace(/\€/g, '<i class="break-typeit"></i>');
         
              $(currDiv.eq(idDiv)).html('<p>'+contentOut + cursor+'</p>');
              countIndex++; 

              if (countIndex != currentData.length) {
                  setTimeout(function() {
                      letterByLetter();
                  }, speed);
              } else if (countIndex == currentData.length && count != times - 1) {
                  countIndex = 0;
                  contentOut = '';
                  count++;
                  setTimeout(function() {
                      doMagic(count);
                  }, wait);
              }
          }

      }()

  }(0)

  way.on('click', function() {
      skip = true;
      speed = 0;
      wait = 0;
  })

}




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


var Icebergtl = new TimelineMax({});
Icebergtl.from("#Scenery", 1.5, {autoAlpha: 0, x: 40});
Icebergtl.staggerFromTo("#Iceberg", 1.5, {y:15},{y:-5, ease: Sine.easeInOut, repeat: -1, yoyo: true})

var LoadingJokestl = new TimelineMax({delay: 2});
LoadingJokestl.to("#IKnow", 1, {x: 400, autoAlpha: 1})
.to("#close", 0.5, {scaleY:1, autoAlpha: 1})
.to("#ISay", 1, {x: 500, autoAlpha: 1})
.to("#closer", 0.5, {scaleY:1, autoAlpha: 1})
.to("#YouKnow", 1, {x: 400, autoAlpha: 1})
.to("#closest", 0.5, {scaleY:1, autoAlpha: 1})
.to("#Sdras", 1, {x: 480, autoAlpha: 1})





