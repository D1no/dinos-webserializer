var showIncompleteTest = false;

/*
* Test Set-Up
* */
// html with table
var validDummyUrl = "/packages/local-test_dinos_webserializer/test/assets/wiso_uoc_exams_03-04-15.html";

/*
* Testing Initialisation
* */
Tinytest.add('webSerializer - webSerializer.js clean initialization - Worker receives a new Job through webSerializer(schemaObject) initialisation', function (test) {
	var testSite = webSerializer({url: validDummyUrl});
	test.instanceOf(testSite, Object);
	test.isTrue(_.has(testSite, "config", "config property on initialized worker"));

	// when there is no base url or htmlDocument, should return false
	testSite = webSerializer({stupid: "mistake"});
	test.isFalse(testSite, "Error in initialisation returns empty worker");

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
	var config = setup({url: validDummyUrl});

	test.equal(config.url, validDummyUrl);
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

// todo testing schema.fetch validation
Tinytest.add('webSerializer - setup.js routine - .fetch is set, validate - that its array elements have .key properties', function (test) {
	var config = setup({});

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - setup.js routine - .fetch is set, validate - that its array elements have .cssSelector properties', function (test) {
	var config = setup({});

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

// todo testing schema.frame validation
Tinytest.add('webSerializer - setup.js routine - .frame is set, validate - that .cssSelector is set and completed with default values', function (test) {
	var config = setup({});

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - setup.js routine - .frame is set, validate - that .column is an array', function (test) {
	var config = setup({});

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - setup.js routine - .frame is set, validate - that .newColumn, if set, is an Object with at least one sub-document with a .fromColumn property', function (test) {
	var config = setup({});

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

/*
* ToDo Testing Job Constructor
* */
Tinytest.add('webSerializer - job.js constructor - New job correct initialized.', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .get() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .fetchValues() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .grab() returns - Test', function (test) {

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});

Tinytest.add('webSerializer - job.js constructor - .value() returns - Test', function (test) {

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