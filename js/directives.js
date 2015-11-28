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
      $scope.showList = true;

      //make show/hide list of planets

      let getPlanets = dataSvc.getPlanets();
      getPlanets.then(
        planets => {
          let list = planets.data.results.filter(element =>
            element.residents.length >= $scope.minResidents);
          $scope.planets = list;
          dataSvc.planets = list;
        },
        err => console.error(err)
      );

      $scope.toggleShowList = function() {
        $scope.showList = !$scope.showList;
      }
    }
  }
});
