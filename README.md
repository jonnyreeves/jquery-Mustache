# jQuery-Mustache - A jQuery Plugin for working with Mustache.js

[jQuery-Mustache.js](https://github.com/jonnyreeves/jquery-Mustache/blob/master/jquery.mustache.js) is a jQuery Plugin which makes working light work of using the Mustache templating engine via a bit of jQuery magic.

## Installation
jQuery-Mustache has two dependencies:

 * [jQuery](http://jquery.com/) 1.5 or later.
 * [Mustache.js](https://github.com/janl/mustache.js/) 0.4 or later.

As with all jQuery plugins, just ensure that you load jQuery before you load jQuery-mustache.js, for example:

    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js"></script>
    <script src="https://raw.github.com/jonnyreeves/jquery-Mustache/master/jquery.mustache.js"></script>
    <script src="https://raw.github.com/janl/mustache.js/master/mustache.js"></script>

## Usage
Lets get down to it and load an external template and then render it.

	var viewData = { name: 'Jonny' };
    $.Mustache.load('./templates/greetings.htm')
    	.done(function () {
        	$('body').mustache('simple-hello', viewData);
        });
    });

In the above example we are loading an external template HTML file (`greetings.htm`) and, once it's finished loading we render it out replacing the contents of the `body` element.  Your templates should be defined in a script block in the external HTML file where the script block's id will define the template's name, eg:

    <script id="simple-hello" type="text/html">
        <p>Hello, {{name}}, how are you?</p>
    </script>

You can also add templates directly either as String literals or by referencing other DOM elements, eg:

    $.Mustache.add('string-template', '<p>Hi, {{name}}, this is an inline template<p>');
    
    // These two are identical, the latter just provides a terser syntax.
    $.Mustache.add('dom-template', $('#dom-template').html());
    $.Mustache.addFromDom('dom-template');

If you prefer to have all your templates stored in the DOM (as opposed to loading them from external files) then you can just call `$.Mustache.addFromDom()` without any arguments, this will read in all templates from any `<script type="text/html" />` blocks in your markup.

There are two ways to render a Mustache template, either via the global `$.Mustache.render()` method or via the jQuery `mustache` selector:

    $.Mustache.render('my-template', viewData);		// Returns a String (the rendered template content)
    $('#someElement').mustache('my-template', viewData);	// Returns a jQuery selector for chaining.

The jQuery `mustache` selector defaults to appending the rendered template to the selected element; however you can change this behaviour by passing a `method` in the options argument:

    // Replace the contents of #someElement with the rendered template.
    $('#someElement').mustache('my-template', viewData, { method: 'html' });

    // Prepend the rendered Mustache template to #someElement.
    $('#someElement').mustache('my-template', viewData, { method: 'prepend' });

The `mustache` selector also allows you to pass an Array of View Models to render which makes populating lists a breeze:

    // Clear #someList and then render all the viewModels using the list-template.
    $('#someList).empty().mustache('list-template', viewModels);

To help you debug you can fetch a list of all registered templates via `$.Mustache.templates()` and when you're done, you can call `$.Mustache.clear()` to remove all templates.

jQuery-Mustache plays nicely with [partials](http://scalate.fusesource.org/documentation/mustache.html#Partials) as well, no muss, no fuss, just drop the partial into your template, ensure that it's been loaded and jQuery-Mustache will take care of the rest:

	<!-- Templates.htm -->
	<script id="footer-fragment" type="text/html">
		<p>&copy; Jonny {{year}}</p>
	</script>
	<script id="webcontent" type="text/html">
		<h1><blink>My {{adjective}} WebSite!</blink></h1>
		
		{{! Insert the `footer-fragment` template below }}
		{{>footer-fragment}}
	</script>

	$.Mustache.load('templates.htm')
		.done(function () {
			// Renders the `webcontent` template and the `footer-fragment` template to the page.
			$('body').mustache('webcontent', { year: 2012, adjective: 'EPIC' }); 
		});

Check out the included [example file](https://github.com/jonnyreeves/jquery-Mustache/blob/master/examples/usage-example.htm) for other usage scenarios.
