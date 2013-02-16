define(function(require) {

	var Boiler = require('Boiler');
	

	var ViewModel = function(moduleContext) {
		this.loadApplication = function(applicationId) {
			//remove any existing components
			$('#appShell').empty();
			
			//now call the API to get the metadata of this application
			$.getJSON(moduleContext.getSettings().urls.apps + applicationId + ".txt", function(result) {

				//iterate over the components and add them to shell
				for (var i = 0; i < result.components.length; i++) {
					
					var pluginName = result.components[i]['comp-name'];
					var pluginDefPath = '../../../../src/plugins/' + pluginName + '/plugin.js';
					
					//use a closure to keep 'pluginDefPath' locked
					(function(pluginDefPath) {
						require([pluginDefPath], function(Plugin) {
							var plugin = new Plugin(); // may be we might not create a new instance all the time???
							plugin.load($('#appShell'));
						});
					})(pluginDefPath);
				};
			});
		}
	};

	return ViewModel;
});

