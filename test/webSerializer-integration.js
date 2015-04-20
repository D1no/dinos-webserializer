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

Tinytest.add('webSerializer - integration: unstructured tests - UoC, WiSo Exam Registration Page - Scraping and Serializing the UoC Table', function (test) {

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
//	console.dir(result.frame[3]);


	/*
	* Assurance Test
	* */
	test.equal(result.url, fixture.url.valid, "Url is included in retun object");
	test.equal(result.source.numberColumns, 9, "The amount of columns of the target Table is correctly identified and returned.");
	test.equal(result.source.numberRows, 522, "The amount of rows of the target Table is correctly identified and returned.");

	test.equal(result.frame[0]._url, fixture.url.valid, "The URL is included in the Frame element.");

	test.equal(result.frame[3].moduleNumber.value, "01002", "ModuleNumber is 01002 of fourth row.");
	test.equal(result.frame[3].numberRegistered.count, 8, "Number Registered is 8 of fourth row.");
	test.equal(result.frame[3].numberRegistered._nextRow.count, result.frame[4].numberRegistered.count, "Number Registered of nextRow is 1, equal to fifth row.");
	test.equal(result.frame[3].numberRegistered._prevRow.count, result.frame[2].numberRegistered.count, "Number Registered of prevRow is 2, equal to third row.");

	test.equal(result.frame[3].numberRegistered._row, 3, "_row is 3 (4) on table with start index 1");
	test.equal(result.frame[3].numberRegistered._col, 8, "_col is 8 (9) on table with start index 1");

	test.equal(result.frame[3].moduleNumber._label, "Module Number of the Exam", "Column label from schema is included in return object.");

});


Tinytest.add('webSerializer - integration: unstructured tests - UoC, WiSo Exam Registration Page - Creating new Columns, omitting Columns', function (test) {

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
				{key: "moduleDescriptionNote", label: "label of the Column", exclude: true},
				{key: "examiner", label: "label of the Column"},
				// exclude rest of the columns
				{key: "examDate", exclude: true},
				{key: "examTime", exclude: true},
				{key: "registrationDeadline", exclude: true},
				{key: "cancellationDeadline", exclude: true},
				{key: "registrationMode", exclude: true},
				{key: "numberRegistered", exclude: true}
			],
			newColumn: {
				moduleDescription: {
					fromColumnKey: "moduleDescriptionNote",
					label: "Only Module Description Column",
					header: function (value, row) {
						// cropping header
						return ("createColumn Header " + value.text);
					},
					field: function (value, row) {
						// manipulating field
						return ("createColumn Field " + value.text);
					}
				}
			}
		}
	};

	var result = webSerializer(schema).get();
	console.dir(result.frame[3]);


	/*
	 * Assurance Test
	 * */
	test.equal(result.frame[3].moduleDescription.text, "createColumn Field Technik des betrieblichen Rechnungswesens", "New Column Module Description has create Column Field prefixed by transform function");
	test.equal(result.frame[3].moduleDescription._nextRow.text, "createColumn Field Technik des betrieblichen Rechnungswesens", "New Column Module Description has in the _nextRow create Column Field prefixed by transform function");
	test.equal(result.frame[3].moduleDescription._prevRow.text, "createColumn Field Operations Management", "New Column Module Description has in the _prevRow create Column Field prefixed by transform function");

});