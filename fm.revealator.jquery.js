/*
 Revealator jQuery Plugin
 Revealator is a jQuery-based plugin for adding effects to elements that enter the window. It's simple, and easy to use.
 version 1.0, Jan 11th, 2016
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

window.Revealator = {
	timer: null,
	busy: false
};

$(function () {
	var refreshRevealator = function () {
		var $window = $(window);
		var i = 0;
		var window_top = 0;
		var window_bottom = $window.height();
		$('*[class^="revealator"]').each(function () {
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

			if (!$element.hasClass(position_class)) {
				$element.removeClass('revealator-below revealator-partially-below revealator-partially-above revealator-above revealator-within');
				$element.addClass(position_class);
			}
		});
	};

	$(window).bind('scroll resize load ready', function () {
		if (!window.Revealator.busy) {
			window.Revealator.busy = true;
			setTimeout(function () {
				window.Revealator.busy = false;
				refreshRevealator();
			}, 150);
		}
	});
});