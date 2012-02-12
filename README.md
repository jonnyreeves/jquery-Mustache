# jQuery-Mustache - A jQuery Plugin for working with Mustache.js

[jQuery-Mustache.js](https://github.com/jonnyreeves/jquery-Mustache/blob/master/src/jquery-Mustache.js) is a jQuery Plugin which makes working light work of using the Mustache templating engine via a bit of jQuery magic!

## Installation
jQuery-Mustache has two dependencies:
* [jQuery](http://jquery.com/) 1.4 or later.
* [Mustache.js](https://github.com/janl/mustache.js/) 0.4 or later.

As with all jQuery plugins, just ensure that you load jQuery before you load jQuery-mustache.js, for example:

    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js"></script>
    <script src="https://raw.github.com/jonnyreeves/jquery-Mustache/master/src/jquery-Mustache.js"></script>
    <script src="https://raw.github.com/janl/mustache.js/master/mustache.js"></script>

## Usage
Lets get down to it and load an external template and then render it.

    var viewData = { name: 'Jonny' };
    $.Mustache.load("./templates/greetings.htm, function() {
        $('body').mustache('simple-hello', viewData);
    });

In the above example we are loading an external template HTML file (`greetings.htm`) and, once it's finished loading we render it out replacing the contents of the `body` element.  Your templates should be defined in a script block in the external HTML file where the script block's id will define the template's name, eg:

    <script id="simple-hello" type="text/html">
        <p>Hello, {{name}}, how are you?</p>
    </script>

You can also add templates directly either as String literals or by referencing other DOM elements, eg:

    $.Mustache.add('string-template', '<p>Hi, {{name}}, this is an inline template<p>');
    $.Mustache.add('dom-template', $('#some-element').html());

There are two ways to render a Mustache template, either via the global `$.Mustache.render()` method or via the jQuery `mustache` selector:

    $.Mustache.render('my-template', viewData);
    $('#someElement').mustache('my-template', viewData);

The jQuery `mustache` selector defaults to replacing the contents of the selected element; however you can change this behaviour by passing a `method` in the options argument:

    // Append the rendered Mustache template to #someElement.
    $('#someElement').mustache('my-template', viewData, null, { method: 'append' });

    // Prepend the rendered Mustache template to #someElement.
    $('#someElement').mustache('my-template', viewData, null, { method: 'prepend' });

To help you debug you can fetch a list of all registered templates via `$.Mustache.templates()` and when you're done, you can call `$.Mustache.clear()` to remove all templates.