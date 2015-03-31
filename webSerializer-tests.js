// Write your tests here!
// Here is an example.
Tinytest.add('webSerializer - Simple Unit Test', function (test) {

	//stups
	var field = "file name";
	var oldValue = "old Value";
	var newValue = "new Value";

	test.equal("Server logged: " + newValue + " - for field: " + field, webSerializer(field, oldValue, newValue));
	test.notEqual("Server loged: " + newValue + " - for field: " + field, webSerializer(field, oldValue, newValue));

});


