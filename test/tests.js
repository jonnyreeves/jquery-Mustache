/*global QUnit, $, sinon, window*/

// Unit testing jQuery plugins is a pain in the arse because everything is so static.  If you can see what I'm 
// missing here (eg: how to get a fresh instance of $.Mustache on each run) then please enlighten me!
var defaultOptions = $.extend({}, $.Mustache.options);

module("jQuery-Mustache", { 
	setup: function () {
		
	},
	teardown: function () {
		// Clear all templates.
		$.Mustache.clear();
		
		// Restore the default options.
		$.each(defaultOptions, function (key, val) {
			$.Mustache.options[key] = val;
		});
	}
});

QUnit.test("Mustache plugin exposed on jQuery", function () { 
	QUnit.equal(typeof $.Mustache, "object", "$.Mustache Plugin exposed");
});

QUnit.test("allow overwrites when adding templates by default", function () { 
	$.Mustache.add('name', 'a');
	$.Mustache.add('name', 'b');
	
	QUnit.equal($.Mustache.render('name'), 'b', "Template was overwritten");
});

QUnit.test("Disallowing overwriting templates triggers an error if an overwrite occurs", function () { 
	this.stub($, 'error');
	
	$.Mustache.options.allowOverwrite = false;
	
	$.Mustache.add('name', 'a');
	$.Mustache.add('name', 'b');
	
	QUnit.ok($.error.calledOnce);
});

QUnit.test("clear() removes all templates and flushes the Mustache cache.", function () { 
	this.spy(window.Mustache, 'clearCache');
	this.stub($, 'error');
	
	$.Mustache.add('name', 'a');
	$.Mustache.clear();
	
	$.Mustache.options.warnOnMissingTemplates = true;
	$.Mustache.render('name');
	
	QUnit.ok($.error.calledOnce, "Template was removed");
	QUnit.ok(window.Mustache.clearCache.calledOnce, "Mustache cache was cleared");
});