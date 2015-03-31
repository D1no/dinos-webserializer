/**
 * Created by AProDino on 27.03.15.
 */

// Mock-Up
var APIinput = {

	// Either url or htmlDocument
	htmlDocument: Object, //optional, html Object skipping internal connector
	url: "https://wisoapp.uni-koeln.de/pruefungsfristen.php", //set to false when a html document is provided

	// Optional
	jobId: "wisoapp_fristen", //optional
// not implemented	noDuplicateRows: true, // opt. default true. Prevents duplicate documents from duplicate rows.
	elementsInCollectionDoc: true, // opt. default true. Set to false to not include fetched page elements from fetchElement
	encoding: "binary", // opt. default undefined for UTF-8. Set to different according to NPM Request Module.
	userAgent: "request", // opt. default undefined. Set to different according to NPM Request Module.

	// Optional
	fetchValues: [
		{
			cssSelector: "#mcont > div > div.ipanel.bl_cont",
			key: "pageTitle", // optional (key will be the array index)
			label: "Page Title of the Blog", // optional
			// if not specified, selected value is returned as text
			transform: function (value) { // optional
				// manipulate value
				return value.text;
			}
		}
	],

	// Optional
	fetchStructure: {
		cssSelector: {
			scope: "#box > table > tbody",
			row: "tr", // opt. default tr
			header: "th", // opt. default th
			cell: "td", // opt. default td
			headerRow: 1, // opt. default 1. First row of tableScope.
			rowStart: 1, // opt. defaults 1. No space between header row and content row.
		},
		columnKeys:
		// _id, created, element are reserved
		// label: opt.
			[
				{key: "moduleNumber", label: "Module Number of the Exam"},
				// skip following column for export, can still be used for column creation if key is set
				{key: "moduleDescriptionNote", label: "label of the Column", exclude: true},
				{key: "examiner", label: "label of the Column"},
				{key: "examDate", label: "label of the Column", transform: function(value, row) {}},
				{key: "examTime", label: "label of the Column"},
				{key: "registrationDeadline", label: "label of the Column"},
				{key: "cancellationDeadline", label: "label of the Column"},
				{key: "registrationMode", label: "label of the Column"},
				{key: "numberRegistered", label: "label of the Column"}
			],
		// create "column" based on a source columnKey
		createColumn: {
			moduleDescription: {
				fromColumnKey: "moduleDescriptionNote",
				label: "Desciption of the Module",
				header: function (text, html, row) {
					// cropping header
					return (value.text);
				},
				field: function (text, html, row) {
					// manipulating field
					return (value.text);
				}
			},
			moduleNote: {
				fromColumnKey: "moduleDescriptionNote",
				label: "Annotations of the Exam",
				header: function (text, html, row) {
					// cropping header
					return (value.text); // or object which extends
				},
				field: function (text, html, row) {
					// manipulating field
					return (value.text);
				}
			}
		}
	}
};


var rusBaseYearSchema = {
	url: "http://rusbase.com/deals/?&period=366",
	jobId: "rusbase",
	fetch:  [
		{
			key: "title",
			cssSelector: "h1",
			label: "Title of the Rusbase Page", //opt.
			transform: function (value) { return value.text} //opt.
		},
		{
			key: "numberInvestments",
			cssSelector: "#layout h5:nth-child(2)",
			label: "Total Number of Investments", //opt.
			transform: function (value) {


				return value
			} //opt.
		},
		{
			key: "totalInvestments",
			cssSelector: "#layout h5:nth-child(3)",
			label: "Total Dollar Value of Investments", //opt.
			transform: function (value) {


				return value
			} //opt.
		}

	],
	frame: {
		cssSelector: {
			scope: "table.list_inve", // opt
			row: "tr", // opt
			header: "td", // opt
			cell: "td", // opt
			headerRow: 1, // opt
			rowStart: 2 // opt
		},
		column: [
			{key: "date", label: "Month of the Deal", transform: function(field, row) { // field object has .text and .html
				return field.text.replace("/", "-"); // will append as .value. Optionally return object, properties are added sub-document
			}},
			{key: "company", label: "Receiving Company"},
			{key: "type", label: "Type of the Deal", transform: function(field, row) {
				return field.text;
			}},
			{key: "amount", label: "Dolar Value of the Deal", transform: function(field, row) {
				return field.text.replace("None", 0);
			}},
			{key: "investor", label: "Investor in the Deal"}

		],
		newColumn: {
			disclosed: {
				fromColumnKey: "amount",
				label: "Description of the Module",
				header: function (field, row) {
					// cropping header
					return ({text: "Disclosure", html: field.html});
				},
				field: function (field, row) {
					var status = true;

					if(field.text == "None") {
						status = false;
					}
					// manipulating field
					return ({status: status});
				}
			}
		}
	}
};