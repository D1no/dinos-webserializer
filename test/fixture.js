/**
 * Created by AProDino on 06.04.15.
 */

/*
* Case Set-Up: WiSo UoC Exams
* */
var wiso = {
	url: {
		valid: Meteor.absoluteUrl("packages/local-test_dinos_webserializer/test/assets/wiso_uoc_exams_03-04-15.html"),
		invalid_NotExisting: "http://notexistend.com/",
		invalid_MalFormat: "this should have been a url"
	},
	elements:{
		validSimple: [
			{
				key: "title",
				cssSelector: "h1",
				label: "Title of the Page" //opt.
			},
			{
				key: "subTitle",
				cssSelector: "h2",
				label: "Sub-Title of the Page" //opt.
			}
		],
		invalidSimple_MissingKeys: [
			{
				cssSelector: "h1",
				label: "Title of the Page" //opt.
			},
			{
				cssSelector: "h2",
				label: "Sub-Title of the Page" //opt.
			}
		],
		invalidSimple_MissingCssSelector: [
			{
				key: "title",
				label: "Title of the Page" //opt.
			},
			{
				key: "subTitle",
				label: "Sub-Title of the Page" //opt.
			}
		],
		validWithTransforms: [
			{
				key: "title",
				cssSelector: "h1",
				label: "Title of the Page", //opt.
				transform: function (value) { return "Test" + value} //opt.
			},
			{
				key: "subTitle",
				cssSelector: "h2",
				label: "Sub-Title of the Page", //opt.
				transform: function (value) { return "Test" + value} //opt.
			}
		]
	},
	tableCss: {
		valid: {
			scope: "#box table", // opt
			row: "tr", // opt
			header: "th", // opt
			cell: "td", // opt
			headerRow: 1, // opt
			rowStart: 2 // opt
		},
		invalid_WrongScope: {
			scope: "#wrongclass table", // opt
			row: "tr", // opt
			header: "th", // opt
			cell: "td", // opt
			headerRow: 1, // opt
			rowStart: 2 // opt
		}
	},
	tableColumns: {
		validSimple: [
			{key: "moduleNumber", label: "Module Number of the Exam"},
			{key: "moduleDescriptionNote", label: "label of the Column"},
			{key: "examiner", label: "label of the Column"},
			{key: "examDate", label: "label of the Column"},
			{key: "examTime", label: "label of the Column"},
			{key: "registrationDeadline", label: "label of the Column"},
			{key: "cancellationDeadline", label: "label of the Column"},
			{key: "registrationMode", label: "label of the Column"},
			{key: "numberRegistered", label: "label of the Column"}
		],
		validWithExclude: [ // 2nd column is omitted
			{key: "moduleNumber", label: "Module Number of the Exam"},
			{key: "moduleDescriptionNote", label: "label of the Column", exclude: true},
			{key: "examiner", label: "label of the Column"},
			{key: "examDate", label: "label of the Column"},
			{key: "examTime", label: "label of the Column"},
			{key: "registrationDeadline", label: "label of the Column"},
			{key: "cancellationDeadline", label: "label of the Column"},
			{key: "registrationMode", label: "label of the Column"},
			{key: "numberRegistered", label: "label of the Column"}
		],
		validWithTransform: [ // 2nd column has Property "test" with "Test " suffixing field text
			{key: "moduleNumber", label: "Module Number of the Exam"},
			{key: "moduleDescriptionNote", label: "label of the Column", transform: function(field, row) {
				return {test: "Test " + field.text};
			}},
			{key: "examiner", label: "label of the Column"},
			{key: "examDate", label: "label of the Column"},
			{key: "examTime", label: "label of the Column"},
			{key: "registrationDeadline", label: "label of the Column"},
			{key: "cancellationDeadline", label: "label of the Column"},
			{key: "registrationMode", label: "label of the Column"},
			{key: "numberRegistered", label: "label of the Column"}
		]
	},
	newColumns: {
		validSimple: {
			testColumn: { // Duplicate Column of moduleDescriptionNote, prefixing "Test " to return object test property.
				fromColumnKey: "moduleDescriptionNote",
				label: "Test Description of the Module",
				header: function (field, row) {
					return ({test: "Test " + field.text});
				},
				field: function (field, row) {
					return ({test: "Test " + field.text});
				}
			}
		},
		invalidSimple_MissingFromColumnKey: {
			testColumn: {
				label: "Test Description of the Module",
				header: function (field, row) {
					return ({test: "Test " + field.text});
				},
				field: function (field, row) {
					return ({test: "Test " + field.text});
				}
			}
		},
		validComplex: {
			moduleDescription: {
				fromColumnKey: "moduleDescriptionNote",
				label: "Description of the Module",
				header: function (field, row) {
					// cropping header
					return ({text: field.text, html: field.html});
				},
				field: function (field, row) {
					var trans = field.html;

					if(field.html) {
						trans = trans.replace(/a*\(<i>.*\)$/g, "").trim();
					}
					// manipulating field
					return ({text: trans, html: field.html});
				}
			},
			moduleNote: {
				fromColumnKey: "moduleDescriptionNote",
				label: "Annotations of the Exam",
				header: function (field, row) {
					// cropping header
					return ({text: field.text, html: field.html}); // or object which extends
				},
				field: function (field, row) {
					var trans = field.html;

					if(field.html) {
						trans = trans.replace(/.+\(<i>/g, "");
						trans = trans.replace(/<\/i>.+/g, "").trim();
					}
					// manipulating field
					return ({text: trans, html: field.html});
				}
			}
		}
	}


};


/*
* Select Test Case
* */
var page = wiso;
page.jobId = "tinytest";

/*
 * Global Test Fixture
 * */
fixture = {};


fixture.url = {
	valid: page.url.valid,
	notExisting: page.url.invalid_NotExisting,
	malFormat: page.url.invalid_MalFormat
};

fixture.schema = {
	validFetch: {
		url: page.url,
		jobId: page.jobId,
		fetch: page.elements.validSimple
	},
	invalidFetch_MissingKeys: {
		url: page.url,
		jobId: page.jobId,
		fetch: page.elements.invalidSimple_MissingKeys
	},
	invalidFetch_MissingCssSelector: {
		url: page.url,
		jobId: page.jobId,
		fetch: page.elements.invalidSimple_MissingCssSelector
	},
	validSimple: {
		url: page.url,
		jobId: page.jobId,
		fetch: page.elements.validSimple,
		frame: {
			cssSelector: page.tableCss.valid,
			column: page.tableColumns.validSimple,
			newColumn: page.newColumns.validSimple
		}
	},
	invalidColumnObject: {
		url: page.url,
		jobId: page.jobId,
		fetch: page.elements.validSimple,
		frame: {
			cssSelector: page.tableCss.valid,
			column: {wrong: "type"},
			newColumn: page.newColumns.invalidSimple_MissingFromColumnKey
		}
	},
	invalidNewColumnMissingKeys: {
		url: page.url,
		jobId: page.jobId,
		fetch: page.elements.validSimple,
		frame: {
			cssSelector: page.tableCss.valid,
			column: page.tableColumns.validSimple,
			newColumn: page.newColumns.invalidSimple_MissingFromColumnKey
		}
	}
};
