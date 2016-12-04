(function (){
    var app = angular.module('hireclub', ['ui.codemirror', 'ui.router']);
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/views/home.html',
            controller: 'HomeCtrl'
        });
        $stateProvider.state('dashboard', {
            url: '/dashboard/:url',
            templateUrl: '/views/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }]);
})();
