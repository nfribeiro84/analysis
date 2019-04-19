myApp
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'modules/home/partials/home.html',
                controller: 'homeController',
                controllerAs: '_home'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });