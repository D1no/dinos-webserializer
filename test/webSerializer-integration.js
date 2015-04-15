var showIncompleteTest = true;

/*
* Integration Testing UoC
* */
Tinytest.add('webSerializer - integration: unstructured tests - UoC, WiSo Exam Registration Page - Fetch some elements from the Page, such as the table title by CSS Selector, and do some transformations.', function (test) {

	// retrieve a whole bunch of elements from a website
	var result = webSerializer({url: fixture.url.valid}).fetchValues([
		{
			key: "subTitle",
			cssSelector: "#box > h2",
			label: "Page Sub-Title of the List"
		},
		{
			cssSelector: "#box > h1",
			key: "pageTitle",
			label: "Page Title of the List",
			transform: function (value) {
				// manipulate value
				value = "Test-Prefix: " + value.text;
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
	//console.log(result);

	test.equal(result.subTitle.value, "Übersicht aktueller Prüfungstermine", "Fetches h2");
	test.equal(result.pageTitle.value, "Test-Prefix: Prüfungsverwaltung des WiSo-Prüfungsamtes", "Transform Function adds Test-Prefix: ");
	test.equal(result.pageTitle.label, "Page Title of the List", "Specified label is included");
	test.equal(result.pageTitle.cssSelector, "#box > h1", "Specified cssSelector is included");
	test.matches(result[3].value, /Universität zu Köln/i, "If no key specified, provides value under kay as array position.");
	test.include(result, "subTitle_4", "Not possible to overwrite values with the same key. Instead names key keyname_arrayIndex");
});