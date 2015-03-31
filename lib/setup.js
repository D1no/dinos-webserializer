/**
 * Created by AProDino on 27.03.15.
 */

setup = function setup(config) {
	config.created = new Date();

	// set default page encoding to binary (UTF-8)
	if (!config.encoding) {
		config.encoding = "binary";
	}

	// set default User-Agent for Page Request
	if (!config.userAgent) {
		config.userAgent = "request";
	}

	// Error Checking
	if (!config.url && !config.htmlDocument) {
		log.error("WebSerializer config requires either an initial .url or .htmlDocument");
		config.error = true;
		return false;
	}

	return config;
};