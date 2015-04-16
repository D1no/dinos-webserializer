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

Tinytest.add('webSerializer - integration: unstructured tests - UoC, WiSo Exam Registration Page - Scraping and Serializing Table', function (test) {

	/*
	needs moment package for testing sophisticated schema
	 */
	var schema = {
		url: fixture.url.valid,
		frame: {
			cssSelector: {
				scope: "#box table", // opt
				row: "tr", // opt
				header: "th", // opt
				cell: "td", // opt
				headerRow: 1, // opt
				rowStart: 2 // opt
			},
			column: [
				{key: "moduleNumber", label: "Module Number of the Exam", transform: function(field, row) {
					return {value: field.text};
				}},
				// skip following column for export, can still be used for column creation if key is set
				{key: "moduleDescriptionNote", label: "label of the Column"},
				{key: "examiner", label: "label of the Column"},
				{key: "examDate", label: "label of the Column", transform: function(field, row) {
					var parseDate = moment.tz(field.text, "DD.MM.YY", "Europe/Berlin").toDate();
					return {date: parseDate};
				}},
				{key: "examTime", label: "label of the Column"},
				{key: "registrationDeadline", label: "label of the Column", transform: function(field, row) {
					var parseDate = moment.tz(field.text + " 23:59", "DD.MM.YY HH:mm", "Europe/Berlin").toDate();
					return {date: parseDate};
				}},
				{key: "cancellationDeadline", label: "label of the Column", transform: function(field, row) {
					var parseDate = moment.tz(field.text + " 23:59", "DD.MM.YY HH:mm", "Europe/Berlin").toDate();
					return {date: parseDate};
				}},
				{key: "registrationMode", label: "label of the Column"},
				{key: "numberRegistered", label: "label of the Column", transform: function(field, row) {
					var count = parseInt(field.text, 10);
					return {count: count};
				}}
			]
		}
	};

	var result = webSerializer(schema).get();
	console.dir(result);

});