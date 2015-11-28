'use strict';

var app = angular.module('swapiCardsApp', []);

app.controller('MainCtrl', ['$scope', function($scope) {
  $scope.$on('displayPlanet', function(_, index) {
    $scope.planetIndex = index;
    $scope.$broadcast('planetIndex', index);
  })
}]);
