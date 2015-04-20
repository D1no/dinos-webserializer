var showIncompleteTest = false;
var runSuite = true;

if(runSuite) {

/*
* Testing Initialisation
* */
Tinytest.add('webSerializer - webSerializer.js clean initialization - Worker receives a new Job through webSerializer(schemaObject) initialisation', function (test) {
	var testSite = webSerializer({url: fixture.url.valid});
	test.instanceOf(testSite, Object);
	test.isTrue(_.has(testSite, "config"), "config property on initialized worker");

	// when there is no base url or htmlDocument, should return false
	testSite = webSerializer({stupid: "mistake"});
	test.isFalse(testSite, "Error in initialisation returns false set worker");

});

Tinytest.add('webSerializer - webSerializer.js clean initialization - Complain if setup routine returns with an .error = true and set the worker to false', function (test) {
	// when there is no base url or htmlDocument, should return false
	var testSite = webSerializer({stupid: "mistake"});
	test.isFalse(testSite, "Error in initialisation returns empty worker");
});

/*
* Testing Schema Setup
* */
Tinytest.add('webSerializer - setup.js routine - Set default config: .created, .url, .encoding, .userAgent, .fetchInFrame', function (test) {
	var config = setup({url: fixture.url.valid});

	test.equal(config.url, fixture.url.valid);
	test.equal(config.encoding, "binary");
	test.equal(config.userAgent, "request");
	test.isTrue(config.fetchInFrame);
	test.isNotNull(config.created);
});

Tinytest.add('webSerializer - setup.js routine - Schema validation ensures .url OR .htmlDoucment is provided, otherwise set .error and complain', function (test) {
	var config = setup({});

	test.isTrue(config.error, "Setup sets .error when there is no url and no htmlDocument.");

	config = setup({url: "test"});
	test.isFalse(config.error, "No error property because url is defined.");
});

// validate fetch schema
Tinytest.add('webSerializer - setup.js routine - .fetch is set, validate - that its array elements have .key properties', function (test) {
	var config = setup(fixture.schema.invalidFetch_MissingKeys);

	test.isTrue(config.error, "Set .error to true on missing keys.");
});

Tinytest.add('webSerializer - setup.js routine - .fetch is set, validate - that its array elements have .cssSelector properties', function (test) {
	var config = setup(fixture.schema.invalidFetch_MissingCssSelector);

	test.isTrue(config.error, "Set .error to true on missing cssSelector.");
});

// validate frame schema
Tinytest.add('webSerializer - setup.js routine - .frame is set, validate - that .cssSelector is set and completed with default values', function (test) {
	var schema = fixture.schema.validSimple;
	var config = setup(schema);
	test.isFalse(config.error, "Set no .error on valid simple schema.");

	config = setup(_.omit(schema.frame, "cssSelector"));
	test.isTrue(config.error, "Set .error because cssSelector is missing.");
});

Tinytest.add('webSerializer - setup.js routine - .frame is set, validate - that .column is an array', function (test) {
	var config = setup(fixture.schema.validSimple);
	test.isFalse(config.error, "Set no .error on valid simple schema.");

	config = setup(fixture.schema.invalidColumnObject);
	test.isTrue(config.error, "Set .error because column is not an array.");
});

Tinytest.add('webSerializer - setup.js routine - .frame is set, validate - that .newColumn, if set, is an Object with at least one sub-document with a .fromColumn property', function (test) {
	var config = setup(fixture.schema.validSimple);
	test.isFalse(config.error, "Set no .error on valid simple schema.");

	config = setup(fixture.schema.invalidNewColumnMissingKeys);
	test.isTrue(config.error, "Set .error for missing from column keys");
});

/*
* Testing Job Constructor
* */
Tinytest.add('webSerializer - job.js constructor - New job correct initialized.', function (test) {
	var config = setup(fixture.schema.validSimple);
	var worker = new Job(config);

	test.isTrue(_.isObject(worker), "New Job worker is an Object.");
	test.isTrue(_.has(worker, "flushCache"), "New Job worker has flushCache method.");
});

Tinytest.add('webSerializer - job.js constructor - .grab() returns - HTML Document as String', function (test) {
	var config = setup(fixture.schema.validSimple);
	var worker = new Job(config);

	var html = worker.grab();
	test.isFalse(_.isString(html), "Scraping based on config returns string of html.");
	html = worker.grab({url: fixture.url});
	test.isFalse(_.isString(html), "Scraping based on parameter returns string of html.");
});

// toDo complete unit tests
	/*
Tinytest.add('webSerializer - job.js constructor - .value() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .fetchValues() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .fetchRow() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .fetchTable() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .applyTableHead() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .transpose() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .createColumn() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .createCollection() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .get() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});
*/
// Closure for runTest if condition
}