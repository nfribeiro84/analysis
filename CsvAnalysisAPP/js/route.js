myApp
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'modules/home/partials/home.html',
                controller: 'homeController',
                controllerAs: '_home'
            })
            .when('/knowledge', {
                templateUrl: 'modules/knowledge/partials/knowledge.html',
                controller: 'knowledgeController',
                controllerAs: '_k'
            })
            .when('/test', {
                templateUrl: 'modules/test/test.html',
                controller: 'testController',
                controllerAs: '_t'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });