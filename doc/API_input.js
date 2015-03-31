/**
 * Created by AProDino on 27.03.15.
 */

var APIinput = {

	// Either url or htmlDocument
	htmlDocument: Object, //optional, html Object skipping internal connector
	url: "https://wisoapp.uni-koeln.de/pruefungsfristen.php", //set to false when a html document is provided

	// Optional
	jobId: "wisoapp_fristen", //optional
	noDuplicateRows: true, // opt. default true. Prevents duplicate documents from duplicate rows.
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
			rowLimit: false // opt. defaults false. No processing limit.
		},
		columnKeys:
		// _id, created, element are reserved
		// label: opt.
			[
				{key: "moduleNumber", label: "Module Number of the Exam"},
				// skip following column for export, can still be used for column creation if key is set
				{key: "moduleDescriptionNote", label: "label of the Column", exclude: true},
				{key: "examiner", label: "label of the Column"},
				{key: "examDate", label: "label of the Column"},
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