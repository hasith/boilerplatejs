define(function(require) {

	var Boiler = require('Boiler');

	var ViewModel = function(moduleContext) {
		this.loadApplication = function(applicationId) {
			console.log("loading: " + applicationId);
			$.getJSON(moduleContext.getSettings().urls.apps + applicationId + ".txt", function(result) {

				//
				for (var i = 0; i < result.length; i++) {
					var pluginName = result[i]['comp-name'];
					var vmPath = '../../../../src/plugins/' + pluginName + '/viewmodel.js';
					var viewPath = 'text!../../../../src/plugins/' + pluginName + '/view.html';

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

