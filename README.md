Revealator
=======
Revealator is a jQuery-based plugin for adding effects to elements that enter the window. It's simple, and easy to use.
[You can see a demo here](http://opensource.faroemedia.com/revealator).


Usage
-----
###### include in head:
```html
<link rel="stylesheet" href="fm.revealator.jquery.css">
<script src="jquery-1.11.3.min.js"></script>
<script src="fm.revealator.jquery.js"></script>
```

###### example on usage:
```html
<div class="revealator-zoomin">
	Some text or elements
</div>

<div class="revealator-fadein revealator-slideup revealator-delay2 revealator-duration5">
	Some text or elements
</div>
```

#### Classes added:
The plugin adds classes to the elements depending on their position

Class | Description
--- | ---
revealator-position-below           | Both the top and the bottom of the element are below the window view
revealator-position-partially-below | The top of the element is inside window view, but the bottom of the element is outside window view
revealator-position-within          | The element is within the window view
revealator-position-partially-above | The top of the element is outside window view, but the bottom of the element is inside window view
revealator-position-above           | Both the top and the bottom the element are above the window view

#### Default styles:
The included stylesheet has some default css classes

##### Effects:
Class | Description
--- | ---
revealator-fade        | Fade element in
revealator-rotateleft  | Rotate slightly to the left and fade in element
revealator-rotateright | Rotate slightly to the right and fade in element
revealator-slideleft   | Slide in from right to left and fade in element
revealator-slideright  | Slide in from left to right and fade in element
revealator-slideup     | Slide in from bottom to top and fade in element
revealator-zoomin      | Zoom in and fade in element
revealator-zoomout     | Zoom out and fade in element

##### Delays:
Class | Description
--- | ---
revealator-delay1  | Set effect delay to 100ms
revealator-delay2  | Set effect delay to 200ms
revealator-delay3  | Set effect delay to 300ms
...                | ...
revealator-delay19 | Set effect delay to 1900ms
revealator-delay20 | Set effect delay to 2000ms

##### Durations:
Class | Description
--- | ---
revealator-duration1  | Set effect duration to 100ms
revealator-duration2  | Set effect duration to 200ms
revealator-duration3  | Set effect duration to 300ms
...                   | ...
revealator-duration19 | Set effect duration to 1900ms
revealator-duration20 | Set effect duration to 2000ms
You can also use revealator-speed##

##### Custom effects:
You can also easily make your own animations, e.g. (`revealator-` is optional):

Here we make a skew right effect

###### Stylus:
```stylus
.revealator-skewright
	transform skew(35deg, 0deg)
	opacity 0
	transition all 600ms
	&.revealator-within
	&.revealator-partially-above
	&.revealator-above
		transform skew(0deg, 0deg)
		opacity 1
```

###### CSS:
```css
.revealator-skewright {
	transform: skew(35deg, 0deg);
	opacity: 0;
	transition: all 600ms;
}
.revealator-skewright.revealator-within,
.revealator-skewright.revealator-partially-above,
.revealator-skewright.revealator-above {
	transform: skew(0deg, 0deg);
	opacity: 1;
}
```