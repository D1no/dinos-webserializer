var showIncompleteTest = true;

/*
* Integration Testing
* */
Tinytest.add('webSerializer - integration: unstructured tests - UoC, WiSo Exam Registration Page - Fetch some elements such as the table title by CSS Selector and do some transformations.', function (test) {

	// retrieve a whole bunch of elements from a website
	var elements = webSerializer({url: fixture.url.valid}).fetchValues([
		{
			key: "subTitle",
			cssSelector: "#box > h2",
			 // optional (key will be the array index)
			label: "Page Sub-Title of the List" // optional
		},
		{
			cssSelector: "#box > h1",
			key: "pageTitle", // optional (key will be the array index)
			label: "Page Title of the List", // optional
			// if not specified, selected value is returned as text
			transform: function (value) { // optional
				// manipulate value
				value = "Trottel " + value.text;
				return value;
			}
		},
		{
			cssSelector: "#siegel td.head_xl"
		},
		{
			key: "subTitle",
			cssSelector: "body > p"
		}

	]);
	console.log(elements);

	test.isFalse(showIncompleteTest, "TODO: This test needs to be written!");
});