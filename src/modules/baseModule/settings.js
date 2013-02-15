define(['path!../../../server/'], function(serverPath) {
	return {
		urls : {
			apps : serverPath + "application/",
			departments : serverPath + "departments.txt"
		}
	};
});
