angular.module('app')

.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'static/app/home/homeView.html',
      controller: 'HomeCtrl'
    });
});
