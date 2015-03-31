## WebSerializer for Meteor

Web parser & scraper for meteor to collect and transform html into a document schema. Simple scraping with the ability to perform transformation of collected page elements and whole tables including batch row and column manipulation.

## Motivation: Refine unstructured -> time series data!

Once a WebSerializer schema is defined, consequent scraping leads to a data store with an inherent structure that makes it easy to find and match individual changes inside html documents and websites. Tables are stored on a document <-> row basis with contextual information that makes it possible to re-serialize the original form.
Perfect for context based natural language processing and artificial neural network.

## Installation

Add to meteor package system. (not yet published on atmostphere)

## API Reference

ToDo

##### WebSerializer Schema

```js
var schema = {
	htmlDocument: "",
	url: "",
	jobId: "", // opt
	encoding: "", // opt
	userAgent: "", // opt
	fetchInFrame: true, // opt default true
	fetch: [ // various page elements
		{
			key: "",
			cssSelector: "",
			label: "", //opt.
			transform: function (value) {} //opt.
		}
	],
	frame: { // row-column structure
		cssSelector: {
			scope: "", // opt
			row: "tr", // opt
			header: "th", // opt
			cell: "td", // opt
			headerRow: 1, // opt
			rowStart: 1 // opt
		},
		column: [
			{ // for each column of the structure, set exclude for ignoring the column during export. If a key is provided, the column can still be used for column creation
				key: "", // opt
				label: "", // opt
				exclude: false, // opt
				transform: function(value, row) {} // opt
			}
		],
		newColumn: {
			keyOfNewColumn: { // new property for each new column, based on the provided which needs to be defined above
				fromColumn: "columns.key",
				label: "",  // opt
				header: function(value, row) {}, // opt
				field: function(value, row) {} // opt
			}
		}
	}

};
```

## Code Example
WebSerializer uses [request](https://www.npmjs.com/package/request) for simple web scraping and [cheerio](https://www.npmjs.com/package/cheerio) to process html before applying content transformations.

Check out following simple example based on data from [rusbase.com](http://rusbase.com/deals/?&period=366), a tracker of venture activities in Russia. Imagine to track changes over time. Same could be done with product review pages.

#### 1. Set-Up a Schema
```js
var rusBaseYearSchema = {
	url: "http://rusbase.com/deals/?&period=366",
	jobId: "rusbase", // optional
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
        // Space for sophisticated transformations of the raw .text and .html output for refinment.
        // Returned objects are extended to the subdocument.
				return value
			} //opt.
		},
		{
			key: "totalInvestments",
			cssSelector: "#layout h5:nth-child(3)",
			label: "Total Dollar Value of Investments", //opt.
			transform: function (value) {
        // Space for sophisticated transformations of the raw .text and .html output for refinment.
        // Returned objects are extended to the subdocument.
				return value
			} //opt.
		}
	],
	// A frame is structured data from a column-row style format. Mostly html tables,
	// any table structure can be defined via the cssSelector. One schema can only hold one frame.
	frame: {
		cssSelector: {
			scope: "table.list_inve", // scope of the table.
			row: "tr", // opt. Default.
			// this page ignores best practice to define the header row of a table with th, so we set td
			header: "td", 
			cell: "td", // opt. Default.
			headerRow: 1, // opt. Default.
			rowStart: 2 // opt. Default.
		},
		// Each column of the source table equals one column object.
		// To exclude a column in the retrun collection, set {exclude: true}
		column: [
		  // provided field object has .text and .html
			{key: "date", label: "Month of the Deal", transform: function(field, row) {
			  // will append as .value. Optionally return object, properties are extended to sub-document.
				return field.text.replace("/", "-"); 
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
		// New columns can be added based on additional data of an existing column.
		newColumn: {
		  // creating a new status column based on the fact, if the investment amount was disclosed.
			disclosed: {
			  // a new column is based of an existing column
				fromColumnKey: "amount", 
				label: "Description of the Module", // opt.
				header: function (field, row) {
					// keeping original html
					return ({text: "Disclosure", html: field.html});
				},
				field: function (field, row) {
				  // when ever the dollar amount is "None" set this collumn to false;
					var status = true;
					if(field.text == "None") {
						status = false;
					}
					// returning a custom object with status which is appended to the Document.
					return ({status: status});
				}
			}
		}
	}
};
```

#### 2. Initialize & Run job.
```js
// initialise webSerializer with the provided Schema
var rusbase = webSerializer(rusBaseYearSchema);
// execute a get. Optional pass on a different schema object .get(schema)
var job = rusbase.get();
```
#### 3. Return Object
Insert `job.frame` into collection as snapshot. Rerun schema on different url with `rusbase.get({url: "http://newurl.com"})`.
```js
{
  "date": "2015-03-31T21:10:14.855Z",
  "jobId": "rusbase",
  "url": "http://rusbase.com/deals/?&period=366",
  "fetched": {
    "title": {
      "value": "Deals",
      "cssSelector": "h1",
      "date": "2015-03-31T21:10:14.856Z",
      "url": "http://rusbase.com/deals/?&period=366",
      "jobId": "rusbase",
      "label": "Title of the Rusbase Page"
    }
    // all propertie keys of fetched elemts { . }
  },
  "source": {
    "numberColumns": 5,
    "numberRows": 50
    "header": [
      {
        "html": "Date",
        "text": "Date",
        "key": "date",
        "label": "Month of the Deal"
      }
      // all column objects as object array { . }
    ],
  },
  "frame": [
    {
      "date": {
        "_row": 0,
        "_col": 0,
        "_date": "2015-03-31T21:10:14.856Z",
        "_label": "Month of the Deal",
        "_jobId": "rusbase",
        "_nextRow": {
          "html": "11/14",
          "text": "11/14",
          "value": "11-14"
        },
        "html": "11/14",
        "text": "11/14",
        "value": "11-14"
      },
      "company": {
        "_row": 0,
        "_col": 1,
        "_date": "2015-03-31T21:10:14.856Z",
        "_label": "Receiving Company",
        "_jobId": "rusbase",
        "_nextRow": {
          "html": "\n                            \n                                <a href=\"/company/pin-bonus/\">PIN Bonus</a>\n                            \n                        ",
          "text": "\n                            \n                                PIN Bonus\n                            \n                        "
        },
        "html": "\n                            \n                                <a href=\"/company/appintop/\">AppInTop</a>\n                            \n                        ",
        "text": "\n                            \n                                AppInTop\n                            \n                        "
      }
      // all fields as columnkey:object { . }
    }
    // all rows as objects { . }
  ]
}
```

## Tests

ToDo

## Contributors

-

## License

MIT
