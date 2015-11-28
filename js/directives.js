'use strict';

var app = angular.module('swapiCardsApp');

app.directive('swapiPlanetsSelector', function() {
  return {
    restrict: "AE",
    templateUrl: "templates/planets.html",
    scope: {
      minResidents: "@minResidents"
    },
    controller: function($scope, dataSvc) {
      $scope.planets = dataSvc.planets;

      //make show/hide list of planets

      var getPlanets = dataSvc.getPlanets();
      getPlanets.then(
        planets => {
          $scope.planets = planets.data.results;
          dataSvc.planets = planets.data.results;
        },
        err => console.error(err)
      );
    }
  }
});
