/**
 * Created by AProDino on 27.03.15.
 */

setup = function setup(c) {
	// set date version
	if (!c.created) {
		c.created = new Date();
	}

	// set default page encoding to binary (UTF-8)
	if (!c.encoding) {
		c.encoding = "binary";
	}

	// set default User-Agent for Page Request
	if (!c.userAgent) {
		c.userAgent = "request";
	}

	// set default User-Agent for Page Request
	if (!c.userAgent) {
		c.userAgent = "request";
	}

	// set default _pages elements in frame
	if (!_.isBoolean(c.fetchInFrame) || !c.fetchInFrame == false) {
		c.fetchInFrame = true;
	}

	// Error Checking
	if (!c.url && !c.htmlDocument) {
		log.error("WebSerializer requires either an initial .url or .htmlDocument {url: \"http://example.com\"}");
		c.error = true;
	}


	/*
	Schema Validation
	*/

	if(c.fetch) {
		_.each(c.fetch, function (element, i) {
			if(!element.key) {
				log.error(".fetch has for element " + i + 1 + " no .key specified.");
				c.error = true;
			}
			if(!element.cssSelector) {
				log.error(".fetch has for element " + i + 1 + " no .cssSelector specified.");
				c.error = true;
			}
		})
	}

	if(c.frame) {
		if(!c.frame.cssSelector) {
			log.info(".frame no cssSelector found. Setting to default.");
			c.frame.cssSelector = {};
		}
		if(!c.frame.cssSelector.scope) {c.frame.cssSelector.scope = "table"}
		if(!c.frame.cssSelector.row) {c.frame.cssSelector.row = "tr"}
		if(!c.frame.cssSelector.header) {c.frame.cssSelector.header = "th"}
		if(!c.frame.cssSelector.cell) {c.frame.cssSelector.cell = "td"}
		if(!c.frame.cssSelector.headerRow || c.frame.cssSelector.headerRow < 1) {c.frame.cssSelector.headerRow = 1}
		if(!c.frame.cssSelector.rowStart || c.frame.cssSelector.rowStart < 2) {c.frame.cssSelector.rowStart = 2}

		if(!c.frame.column || !_.isArray(c.frame.column)) {
			log.error(".frame columns must be specified in an array");
			c.error = true;
		}

		if(c.frame.newColumn) {
			if(!_.isArray(c.frame.newColumn)) {
				_.each(c.frame.newColumn, function (value, key) {
					if(!value.fromColumn || _.isEmpty(value.fromColumn)) {
						log.error(".newColumn requires for every specified column a target to copy from. .fromColumn should match a key specified under .column.");
						c.error = true;
					}
				})
			} else {
				log.error(".newColumn needs to be an object in which each property reflects the new column key");
				c.error = true;
			}
		}
	}

	return c;
};
