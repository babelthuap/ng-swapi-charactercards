'use strict';

var app = angular.module('swapiCardsApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/planets.html"
    })
}]);

app.controller('MainCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {

}]);
