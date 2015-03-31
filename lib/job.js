/**
 * Created by AProDino on 25.03.15.
 */

Job = function Job(config) {
	var self = this;
	self.config = config;

	/*
	* Gather htmlDocument
	* Flush Cache in case page changes a lot. Warning: Each select leads to a new remote page request
	* */
	var htmlCache = "";

	self.flushCache = function() {
		htmlCache = "";
		return true;
	};

  	self.htmlDocument = function () {
		// check if html in cache, if not, populate cache
		if (htmlCache == "") {
			if (config.htmlDocument){
				htmlCache = config.htmlDocument;
			} else {
				htmlCache = self.grab(config.url, config.encoding, config.userAgent);
			}
		}
		return htmlCache;
	};

};

/**
 * //todo JSDocs needs to be completed.
 * @param elementConfigsArray
 * @returns {Array}
 */
Job.prototype.fetchValues = function(elementConfigsArray){
	var self = this;

	// Iteration function to collect data
	var i = 1;
	var element = {};
	var collectItem = function(doc){
		var label = doc.label;

		// getting the value from the html
		var value = self.value(doc.cssSelector);
		// check if callback function for transformation is set, if not, return text
		if (_.isFunction(doc.transform)) {
			value = doc.transform(value);
		} else {
			value = value.text;
		}

		// check if property key is set, if not, its the index. If key already exists, merge key and index.
		var key = "";
		if (!doc.key) {
			key = i;
		} else {
			key = doc.key;
		}
		if(_.has(element, key)) {
			key = key + "_" + i;
		}

		// Add to element collection
		element[key] = {
			value: value,
			url: self.config.url,
			cssSelector: doc.cssSelector,
			date: self.config.created
		};
		if (self.config.jobId) {
			element[key].jobId = self.config.jobId;
		}
		if (label) {
			element[key].label = label;
		}

		//increment counter
		i = i + 1;
	};

	_.each(elementConfigsArray, collectItem);
	i = null;

	return element;
};

/**
 * Use NPM Request to get HTML Site
 * @param {String} url
 * @param {String} [encoding]
 * @param {String} [userAgent]
 * @returns {String} HTML Document
 */
Job.prototype.grab = function(url, encoding, userAgent) {
	var self = this;
	var response = {};

	// Overwrite default
	if (!url) {
		url = self.config.url;
	}
	if (!encoding) {
		encoding = self.config.encoding;
	}
	if (!userAgent) {
		userAgent = self.config.userAgent;
	}

	// NPM module for remote connection
	var Request = Npm.require("request");

	var requestParameter = {
		uri: url,
		encoding: encoding,
		headers: {
			"User-Agent": userAgent
		}
	};

	// Wrapping remote request in synchronous wrapper to pick up result
	response = Async.runSync(function(done) {
		Request(requestParameter, function(err, resp, body) {

			if (!err && resp.statusCode == 200) {
				done(null, body);
			} else {
				done(log.error(new Meteor.Error(500 ,"Scraper requires http:// - Protocol as URL", err)));
			}

		});
	});

	return response.result;
};

/**
 * Use NPM Cheerio to parse HTML Document according to cssSelector
 * @param {String} cssSelector CSSPath or identifier to the element inside the provided doc
 * @param {String} [htmlDocument] If not provided, parser will try to use the jobs HTML Document
 * @returns {Object} value.html Value of the CSS area with HTML.
 * @returns {Object} value.text Value of the CSS area in plain text.
 */
Job.prototype.value = function(cssSelector, htmlDocument) {
	var self = this;
	var value = {};

	// default settings
	if (!cssSelector) {
		cssSelector = self.config.cssSelector;
	}
	if (!htmlDocument) {
		htmlDocument = self.htmlDocument();
	}

	// Parse the website with Cheerio
	var Cheerio = Npm.require("cheerio");
	var $ = Cheerio.load(htmlDocument);

	// According to cssSelector in html & text
	value.html = $(cssSelector).html();
	value.text = $(cssSelector).text();

	return value;
};

//todo jsdoc
//returns array of horizontal cell values with text and html
Job.prototype.fetchRow = function(cssSelectorRow, cssSelectorCell, rowNumber, cssSelectorScope, htmlDocument){
	var self = this;
	var value = [];

	// default settings
	if (!cssSelectorRow) {
		log.error("cssSelectorRow is required");
		return false;
	}
	if (!cssSelectorCell) {
		log.error("cssSelectorCell is required");
		return false;
	}
	if (rowNumber < 1) {
		rowNumber = 1;
	}
	if (!cssSelectorScope) {
		cssSelectorScope = self.config.fetchStructure.cssSelector.scope;
	}
	if (!htmlDocument) {
		htmlDocument = self.htmlDocument();
	}

	// Parse the website with Cheerio
	var Cheerio = Npm.require("cheerio");
	var $ = Cheerio.load(htmlDocument);

	// limit selection to scope and enumerate elements by row css
	var scope = $(cssSelectorScope).find(cssSelectorRow);

	// pick row according to rowNumber and enumerate elements by cell css
	var row = $(scope[rowNumber-1]).find(cssSelectorCell);

	// go through each cell and push html & text onto return value
	$(row).each(function(j, cell){
		value[j] = {
			html: $(cell).html(),
			text: $(cell).text()
		}
	});

	return value;
};

//todo jsdoc
//returns array of horizontal cell values with text and html
Job.prototype.fetchTable = function(cssSelectorRow, cssSelectorCell, rowStart, cssSelectorScope, htmlDocument){
	var self = this;
	var value = [];

	// default settings
	if (!cssSelectorRow) {
		log.error("cssSelectorRow is required");
		return false;
	}
	if (!cssSelectorCell) {
		log.error("cssSelectorCell is required");
		return false;
	}
	if (rowStart < 1) {
		rowStart = 1;
	}
	if (!cssSelectorScope) {
		cssSelectorScope = self.config.fetchStructure.cssSelector.scope;
	}
	if (!htmlDocument) {
		htmlDocument = self.htmlDocument();
	}

	// Parse the website with Cheerio
	var Cheerio = Npm.require("cheerio");
	var $ = Cheerio.load(htmlDocument);

	// limit selection to scope and enumerate elements by row css
	var scope = $(cssSelectorScope).find(cssSelectorRow);

	// cut array from start row
	scope = scope.slice(rowStart-1);

	// pick row according to rowNumber and enumerate elements by cell css
	$(scope).each(function(i, row) {
		value[i] = [];
		row = $(row).find(cssSelectorCell);
		// go through each cell and push html & text onto return value
		$(row).each(function(j, cell){
			value[i][j] = {
				html: $(cell).html(),
				text: $(cell).text()
			}
		});
	});

	return value;
};

//todo jsdoc, that both need to be an array of objects of same length
Job.prototype.mergeRowAttributes = function(rowValues, rowKeys){
	var self = this;
	var value = [];

	if(rowValues.length != rowKeys.length) {
		log.error("Two row arrays need to be of the same length for attribute merging.");
		return false
	}

	//extend each cell object with the keys object (mostly to merge values with columnKey specifications)
	_.each(rowValues, function(cell, index){
		value.push(_.extend(cell, rowKeys[index]));
	});

	return value;

};

//todo jsdoc, add row to table
Job.prototype.extendTable = function(table, row, rowPosition) {
	var self = this;

	// default settings
	if(!table) {
		log.error("Extend Table requires a table 2d array");
		return false;
	}
	if(!row) {
		log.error("Extend Table requires a 1d row array");
		return false;
	}
	if (!rowPosition || rowPosition < 1) {
		rowPosition = 1;
	}

	console.log(table[0].length);
	console.log(row.length);

	// check if row aligns with table array
	if(table[0].length != row.length) {
		log.error("Extend table needs to be of same horizontal dimension. Check if the first row of your table array is empty.");
		return false;
	}

	// insert row at position in array
	table.splice(rowPosition - 1, 0, row);

	return table;
};

Job.prototype.transpose = function (a) {
	//function two switch row and column for simpler manipulation
	return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
};


Job.prototype.createColumn = function(table, createColumn) {
	var self = this;
	var value = [];

	// transposing table
	table = self.transpose(table);

	var columnKeys = _.keys(createColumn);
	var newColumnArray = [];

	// iterate through new column properties
	_.each(columnKeys, function(key, n){
		newColumnArray[n] = [];

		// get from Column Key to identify the correct column from the table to replicate from
		var newColumn = createColumn[key];

		// iterate through table to identify matching collumn
		_.each(table, function(row, j){
			// if column header matches with desired column source
			if(row[0].key == newColumn.fromColumnKey) {
				// iterate over each field
				_.each(row, function (field, i){
					var newField = {};
					var callbackValue;

					// header callback and additional properties
					if(i < 1) {
						 newField = {
							key: key,
							label: newColumn.label
						};
						callbackValue = newColumn.header(field.text, field.html, j);

					} else { // fields callback
						callbackValue = newColumn.field(field.text, field.html, j);
					}

					if(_.isObject(callbackValue)) {
						_.extend(newField, callbackValue)
					} else {
						newField.text = callbackValue;
					}

					// assigning to new matrix
					newColumnArray[n][i] = newField;
				})
			}
		})
	});


	// add new columns to the bottom of the table matrix
	_.each(newColumnArray, function (row, i) {
		table.push(row);
	});

	// re-transpose table matrix
	value = self.transpose(table);

	return value;
};

/**
 * Turns a 2d table array into collection of documents (objects) where the
 * header rows .key property is set to the rows document key
 * @param {Object} eTable 2d table array that includes a row of objects
 * @param {Number} [headerRowNumber] Defaults to first row.
 * @returns {Array}
 */
Job.prototype.createCollection = function(eTable, headerRowNumber){
	var self = this;
	var date = self.config.created;
	var jobId = self.config.jobId;
	var collection = [];
	var headerRow = [];
	var header = [];
	var table = [];


	// default settings
	if(!headerRowNumber || headerRowNumber < 1) {
		headerRowNumber = 1;
	}

	headerRow = eTable[headerRowNumber - 1];
	eTable.splice(headerRowNumber - 1, 1);
	table = eTable;

	// transpose table to easily delete to be excluded columns
	var transTable = self.transpose(table);

	// track number of deleted columns to adjust splice
	var colDelCount = 0;
	// check if keys are available for export columns
	_.each(headerRow, function(element, index){

		if(!element.key && !element.exclude) {
			log.error("The table header for column " + (index + 1) + " object array requires a .key property.");
			return false;
		}
		if(element.exclude) {
			// delete the header column from the table (row, since table is transposed)
			// adjust to previous deleted columns
			transTable.splice(index + colDelCount, 1);
			// increase delete count
			colDelCount = colDelCount + 1;
		}

		// Complete header with only the values we want
		header.push(element);
	});

	// Bring table back to standard form.
	table = self.transpose(transTable);

	// iteration through table, turning array into collection of documents where headers are they keys
	_.each(table, function (row, i) {
		var rowObject = {};

		_.each(row, function (cell, j) {

			// adding identification and environment information for later probabilistic matching
			var subDoc = {
				_row: i,
				_col: j,
				_date: date
			};
			if(header[j].label) {
				subDoc._label = header[j].label;
			}
			if(jobId) {
				subDoc._jobId = jobId;
			}

			// Value of the row underneath, same cell
			if (!_.isUndefined(table[i+1])) {
				subDoc._nextRow = table[i + 1][j]
			}

			// Value of the row before, same cell
			if(i > 0) {
				subDoc._prevRow = table[i-1][j]
			}

			// extendOwn not available. Taking cell directly out of table array to avoid prototype inheritance which can break fibers.
			_.extend(subDoc, table[i][j]);

			rowObject[header[j].key] = subDoc;
		});

		collection.push(rowObject);
	});

	return collection;

};