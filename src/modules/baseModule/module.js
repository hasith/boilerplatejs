define(['Boiler', './settings', './mainMenu/component', './language/component', './theme/component', './landingPage/component',  './appShell/component',  './footer/component'], function(Boiler, settings, MainMenuComponent, LanguageComponent, ThemeComponent, LandingPageComponent, AppShellComponent, FooterComponent) {


    var Module = function(globalContext) {
        var context = new Boiler.Context(globalContext);
		context.addSettings(settings);


        //scoped DomController that will be effective only on $('#page-content')
        var controller = new Boiler.DomController($('#page-content'));
        //add routes with DOM node selector queries and relevant components
        controller.addRoutes({
            ".main-menu" : new MainMenuComponent(context),
            ".language" : new LanguageComponent(context),
            ".theme" : new ThemeComponent(context),
            ".footer" : new FooterComponent(context)
        });
        controller.start();

        //the landing page should respond to the root URL, so let's use an URLController too
        var controller = new Boiler.UrlController($(".appcontent"));
        controller.addRoutes({
            "#/{applicationid}/:params:" : new AppShellComponent(context)
        });
        controller.start();
    };

    return Module;

});
