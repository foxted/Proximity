![Proximity icon](http://foxted.github.io/Proximity/images/logo.jpg)

## What is Proximity.js ?

**Proximity.js** is a new *jQuery Plugin* that allows you to create a nice *grid* effect.

## How to

### Create a HTML list 

Create your web page, with a `<ul>` list in it, like this : 

	<ul id="proximity">
		<li>
			<p>1</p>
		</li>
		<li>
			<p>2</p>
		</li>
		<li>
			<p>...</p>
		</li>
	</ul>

Make sure you CSS transform it as a grid.

### Create CSS Stylesheet

Your CSS __must__ transform your list into a grid. Here is an example : 

	html, body{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	#proximity{
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	#proximity li{
		width: 9.85%;
		height: 25%;
		margin: 0;
		padding: 0;
		display: inline-block;
		float: left;
		background-color: #999999;
		border: 1px solid #333;
		position: relative;
	}
	#proximity li p{
		width: 100%;
		height: 100%;
		margin: 0;
		vertical-align: middle;
		text-align: center;
		font-size: 3em;
		display:block;
		position:absolute;
		top: 50%;
		height: 9px;
		margin-top: -0.6em;
	}

### Add some behavior

You must create different states for your boxes. Here is the list of states available : 

State          | Description
:------        |:----
_current_      | Current is the state for the _current_ box.
_topLeft_      | The box directly on the top left corner of the _current_ box
_topCenter_    | The box directly above the _current_ box
_topRight_     | The box directly on the top right corner of the _current_ box
_bottomLeft_   | The box directly on the bottom left corner of the _current_ box
_bottomCenter_ | The box directly below the _current_ box
_bottomRight_  | The box directly on the bottom right corner of the _current_ box
_left_         | Left box beside the _current_ box
_right_        | Right box beside the _current_ box

### Initialization

Include __jQuery__ & __Proximity.js__ into your webpage,

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.proximity.js"></script>
	
And initialize the grid,

	<script type="text/javascript">
		$(document).ready(function(){
			$('#proximity li').proximity(10);
		});
	</script>

You're done ;)
