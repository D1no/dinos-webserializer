
webSerializer = function (config, loadDocument) {

	// Possibility to overload schema before initialisation
	if(loadDocument) {
		config.url = false;
		config.htmlDocument = loadDocument;
	}

	/*
	* Checking and preparing for correct configuration
	* */
	config = setup(config);
	if(config.error) {
		log.warn("Aborted. Check config errors.");
		return false;
	}

	/*
	* Initialising Job
	* */
	var job = new Job(config);
	log.info("Job created.");

	return job;
};