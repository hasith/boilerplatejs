define(function(require) {

	var Plugin = function() {
		
		//simple dependencies, but we may use nls, settings, css too
		var Boiler = require('Boiler'), 
			ViewModel = require('./viewmodel'), 
			view = require('text!./view.html');

		this.load = function(parent) {
			//for now lets create panels for each invocation. Should be cached in production code
			var panel = new Boiler.ViewTemplate(parent, view);
			//if you do not want knockout for yourplugin, use anything else for bindings
			ko.applyBindings(new ViewModel(), panel.getDomElement());
			//show the panel
			panel.show();
		};
	};

	return Plugin;

});
