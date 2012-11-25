requirejs.config({
	
	// Define the paths to the vendor libraries.
	paths: {
		'jQuery': 'http://code.jquery.com/jquery-1.8.3',
		'jQuery-Mustache': '../src/jQuery-Mustache'
	},
	
	// Shim libraries which do not define AMD modules.
	shim: {
		'jQuery': {
			exports: "jQuery"
		},
		'jQuery-Mustache': {
			deps: [ 'jQuery' ]
		}
	}
});

// Application entry point.
define(function (require) {
	"use strict";

	require('jQuery-Mustache');

	console.log("Hello, jQuery.Mustache!", $.Mustache);
});
