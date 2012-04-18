/**
 * jQuery Mustache Plugin v0.2.0
 * 
 * @author Jonny Reeves (http://jonnyreeves.co.uk/)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to  
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the 
 * Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*global jQuery, window */
(function ($, window) {
	'use strict';

	var templateMap = {},
		instance = null,
		options = {
			// Should an error be thrown if an attempt is made to render a non-existent template.  If false, the  
			// operation will fail silently.
			warnOnMissingTemplates: false,

			// Should an error be thrown if an attempt is made to overwrite a template which has already been added.  
			// If true the original template will be overwritten with the new value.
			allowOverwrite: true
		};

	function getMustache() {
		// Lazily retrieve Mustache from the window global if it hasn't been defined by
		// the User.
		if (instance === null) {
			instance = window.Mustache;
			if (typeof (instance) === 'undefined') {
				$.error("Failed to locate Mustache instance, are you sure it has been loaded?");
			}
		}
		return instance;
	}

	/**
	 * Returns true if the supplied templateName has been added.
	 */
	function has(templateName) {
		return typeof (templateMap[templateName]) !== 'undefined';
	}

	/**
	 * Registers a template so that it can be used by Mustache.
	 * 
	 * @param templateName		A name which uniquely identifies this template.
	 * @param templateHtml		The HTML which makes us the template; this will be rendered by Mustache when render() 
	 *							is invoked.
	 * @throws					If options.allowOverwrite is false and the templateName has already been registered.
	 */
	function add(templateName, templateHtml) {
		if (!options.allowOverwrite && has(templateName)) {
			$.error('TemplateName: ' + templateName + ' is already mapped.');
			return;
		}
		templateMap[templateName] = templateHtml;
	}

	/**
	 * Removes a template, the contents of the removed Template will be returned.
	 * 
	 * @param templateName		The name of the previously registered Mustache template that you wish to remove.
	 * @returns					String which represents the raw content of the template.
	 */
	function remove(templateName) {
		var result = templateMap[templateName];
		delete templateMap[templateName];
		return result;
	}

	/**
	 * Removes all templates and tells Mustache to flush its cache.
	 */
	function clear() {
		templateMap = {};
		getMustache().clearCache();
	}

	/**
	 * Renders a previously added Mustache template using the supplied templateData object.  Note if the supplied 
	 * templateName doesn't exist an empty String will be returned.
	 */
	function render(templateName, templateData) {
		if (!has(templateName)) {
			if (options.warnOnMissingTemplates) {
				$.error('No template registered for: ' + templateName);
			}
			return '';
		}
		return getMustache().to_html(templateMap[templateName], templateData, templateMap);
	}

	/**
	 * Loads the external Mustache templates located at the supplied URL and registers them for later use.  This method
	 * returns a jQuery Promise and also support an `onComplete` callback.
	 * 
	 * @param url			URL of the external Mustache template file to load.
	 * @param onComplete	Optional callback function which will be invoked when the templates from the supplied URL
	 *						have been loaded and are ready for use.
	 * @returns				jQuery deferred promise which will complete when the templates have been loaded and are
	 *						ready for use.
	 */
	function load(url, onComplete) {
		return $.Deferred(function (dfd) {
			$.get(url)
				.done(function (templates) {
					$(templates).filter('script').each(function (i, el) {
						add(el.id, $(el).html().trim());
					});

					if ($.isFunction(onComplete)) {
						onComplete();
					}
					dfd.resolve();
				})
				.fail(dfd.reject);
		}).promise();
	}

	/**
	 * Returns an Array of templateNames which have been registered and can be retrieved via $.Mustache.render() or 
	 * $(element).mustache().
	 */
	function templates() {
		return $.map(templateMap, function (value, key) {
			return key;
		});
	}

	// Expose the public methods on jQuery.Mustache
	$.Mustache = {
		options: options,
		load: load,
		add: add,
		remove: remove,
		clear: clear,
		render: render,
		templates: templates,
		instance: instance
	};

	/**
	 * Render the template HTML mapped to the supplied templateName using the  supplied templateData object.   
	 * Note the default action will replace the contents of the selected jQuery element.
	 * 
	 * @param templateName		The name of the Mustache template you wish to render, Note that the Template must have 
	 *							been previously loaded and / or added.
	 * @param templateData		JavaScript object which will be used to render the Mustache template.
	 * @param options.method	jQuery method to use when rendering, defaults to 'html' which replaces the contents of 
	 *							the current selector.
	 */
	$.fn.mustache = function (templateName, templateData, options) {
		var settings = $.extend({
			method:	'html'
		}, options);

		return this.each(function () {
			// Attach the contents to the current selector using the supplied method.
			$(this)[settings.method](render(templateName, templateData));
		});
	};

}(jQuery, window));