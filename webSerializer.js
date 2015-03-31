
webSerializer = function (config) {

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

	/*
	* Error Checking
	* */
	// config.error = true;

	return job;
};