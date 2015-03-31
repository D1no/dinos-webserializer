var packageName = "dinos:webserializer";

// packages/spooky/package.js
Npm.depends({
	"cheerio": "0.19.0",
	"request": "2.54.0"
});

Package.describe({
	name: packageName,
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'Package to parse a html table from an URL and return it as an Object',
	// URL to the Git repository containing the source code for this package.
	//git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use('underscore');
	// NPM Module Handling
	api.use('meteorhacks:async');

	// Logging
	api.use('practicalmeteor:loglevel');
	api.addFiles('lib/log.js', 'server');


	api.addFiles('lib/setup.js', 'server');
	api.addFiles('lib/job.js', 'server');

	// Exported Variable
	api.addFiles('webSerializer.js', 'server');
	api.export('webSerializer', 'server');

});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('pruef:tableparser');
	api.addFiles('tableparser-tests.js', 'server');
});