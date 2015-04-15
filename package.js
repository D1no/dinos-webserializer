var packageName = "dinos:webserializer";

// packages/spooky/package.js
Npm.depends({
	"cheerio": "0.19.0",
	"request": "2.54.0"
});

Package.describe({
	name: packageName,
	version: '0.0.1',
	summary: 'Web parser & scraper for meteor to collect and transform html into a document schema.',
	git: 'https://github.com/D1no/dinos-webserializer.git',
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
	api.use('meteorhacks:async');
	api.use(packageName);

	// test-assets
	// /packages/local-test_dinos_webserializer/test/assets/wiso_uoc_exams_03-04-15.html
	api.addFiles('test/assets/wiso_uoc_exams_03-04-15.html', ['client', 'server'], {isAsset: true});

	// direct application files
	api.addFiles('lib/setup.js', 'server');
	api.addFiles('lib/job.js', 'server');

	api.addFiles('test/stubs.js', 'server');
	api.addFiles('test/fixture.js', 'server');
	api.addFiles('test/webSerializer-integration.js', 'server');
	api.addFiles('test/webSerializer-unit.js', 'server');
});