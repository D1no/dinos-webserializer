
webSerializer = function (config) {

	console.log(config);

	/*
	* Checking and preparing for correct configuration
	* */
	config = setup(config);
	if(config.error) {
		log.warn("Aborted. Check config errors.");
		return false;
	}

	console.log(config);

	/*
	* Initialising Job
	* */
	var job = new Job(config);
	log.info("Job created.");

	return job;
};