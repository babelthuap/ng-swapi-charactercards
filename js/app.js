'use strict';

var app = angular.module('swapiCardsApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('home', {
      url: "/",
    })
}]);

app.controller('MainCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {
  $scope.$on('displayPlanet', (_, index) => {
    $scope.planetIndex = index;
    $scope.$broadcast('planetIndex', index);
  });
}]);
