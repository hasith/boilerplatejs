define(function(require) {

	var Boiler = require('Boiler');
	

	var ViewModel = function(moduleContext) {
		this.loadApplication = function(applicationId) {
			//remove any existing components
			$('#appShell').empty();
			
			//now call the API to get the metadata of this application
			$.getJSON(moduleContext.getSettings().urls.apps + applicationId + ".txt", function(result) {

				//iterate over kthe components and add them
				for (var i = 0; i < result.components.length; i++) {
					
					//find the paths of View and ViewModel
					var pluginName = result.components[i]['comp-name'];
					var vmPath = '../../../../src/plugins/' + pluginName + '/viewmodel.js';
					var viewPath = 'text!../../../../src/plugins/' + pluginName + '/view.html';

					//use requirejs to load the plugin files dynamicaly
					(function(vmPath, viewPath) {
						require([vmPath], function(vm) {
							//crappy sequentianl code just to get it running
							console.log('loading : ' + viewPath);
							require([viewPath], function(view) {
								var panel = new Boiler.ViewTemplate($('#appShell'), view);
								ko.applyBindings(new vm(), panel.getDomElement());
								panel.show();
							});
						});
					})(vmPath, viewPath);

				};
			});
		}
	};

	return ViewModel;
});

