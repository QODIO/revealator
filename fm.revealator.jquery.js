/*
 Revealator jQuery Plugin
 Revealator is a jQuery-based plugin for adding effects to elements that enter the window. It's simple, and easy to use.
 version 1.4, Jan 11th, 2016
 by Ingi P. Jacobsen

 The MIT License (MIT)

 Copyright (c) 2016 Faroe Media

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */


var Revealator = typeof Revealator !== 'undefined' ? Revealator : {};

$(function () {
	Revealator = $.extend({}, {
		timer:           null,
		busy:            false,
		scroll_padding:  0,
		effects_padding: 0,
		refresh:         function () {}
	}, typeof Revealator !== 'undefined' ? Revealator : {});

	Revealator.refresh = function () {
		var $window = $(window);
		var $document = $(document);
		var $body = $(document.body);
		var i = 0;
		var window_top = Revealator.effects_padding;
		var window_bottom = $window.height() - Revealator.effects_padding;
		var document_top = Revealator.scroll_padding;
		var document_bottom = $document.height() - Revealator.scroll_padding;
		
		if ($window.scrollTop() === 0) {
			if (!$body.hasClass('at-top')) {
				$body.addClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
			}
		} else if ($window.scrollTop() + $window.height() === $document.height()) {
			if (!$body.hasClass('at-bottom')) {
				$body.addClass('at-bottom').removeClass('at-top').removeClass('near-top').removeClass('near-bottom');
			}
		} else if ($window.scrollTop() <= document_top) {
			if (!$body.hasClass('near-top')) {
				$body.addClass('near-top').removeClass('near-bottom').removeClass('at-top').removeClass('at-bottom');
			}
		} else if ($window.scrollTop() + $window.height() >= document_bottom) {
			if (!$body.hasClass('near-bottom')) {
				$body.addClass('near-bottom').removeClass('near-top').removeClass('at-top').removeClass('at-bottom');
			}
		} else {
			if ($body.hasClass('at-top') || $body.hasClass('at-bottom') || $body.hasClass('near-top') || $body.hasClass('near-bottom')) {
				$body.removeClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
			}
		}
		
		$('*[class*="revealator"]').each(function () {
			i++;
			var element = this;
			var $element = $(element);
			var element_bounding = element.getBoundingClientRect();

			var position_class = undefined;
			if (element_bounding.top > window_bottom && element_bounding.bottom > window_bottom) {
				position_class = 'revealator-below';
			} else if (element_bounding.top < window_bottom && element_bounding.bottom > window_bottom) {
				position_class = 'revealator-partially-below'
			} else if (element_bounding.top < window_top && element_bounding.bottom > window_top) {
				position_class = 'revealator-partially-above'
			} else if (element_bounding.top < window_top && element_bounding.bottom < window_top) {
				position_class = 'revealator-above';
			} else {
				position_class = 'revealator-within';
			}

			if ($element.hasClass('revealator-load') && !$element.hasClass('revealator-within')) {
				$element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
				$element.addClass('revealator-within');
			}

			if (!$element.hasClass(position_class) && !$element.hasClass('revealator-load')) {
				if ($element.hasClass('revealator-once')) {
					if (!$element.hasClass('revealator-within')) {
						$element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
						$element.addClass(position_class);
					}
					if ($element.hasClass('revealator-partially-above') || $element.hasClass('revealator-above')) {
						$element.addClass('revealator-within');
					}
				} else {
					$element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
					$element.addClass(position_class);
				}
			}
		});
	};

	$(window).bind('scroll resize load ready', function () {
		if (!Revealator.busy) {
			Revealator.busy = true;
			setTimeout(function () {
				Revealator.busy = false;
				Revealator.refresh();
			}, 150);
		}
	});
});