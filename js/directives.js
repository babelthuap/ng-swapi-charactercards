'use strict';

var app = angular.module('swapiCardsApp');

app.directive('swapiPlanetsSelector', function() {
  return {
    restrict: "AE",
    templateUrl: "templates/planets.html",
    scope: {
      minResidents: "@minResidents"
    },
    controller: ['$scope', 'dataSvc', function($scope, dataSvc) {
      $scope.planets = dataSvc.planets;
      $scope.showList = true;

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

      $scope.displayPlanet = function(i) {
        console.log('index:', i);
        // $emit 
      }
    }]
  }
});

app.directive('swapiPlanet', function() {
  return {
    restrict: "AE",
    templateUrl: "templates/planet.html",
    scope: {
      id: "@"
    },
    controller: ['$scope', 'dataSvc', function($scope, dataSvc) {
      $scope.residents = [{id: 5}, {id: 68}, {id: 81}];
    }]
  }
});

app.directive('swapiResident', function() {
  return {
    restrict: "AE",
    templateUrl: "templates/resident.html",
    scope: {
      id: "@"
    },
    controller: ['$scope', 'dataSvc', function($scope, dataSvc) {
      $scope.id;
    }]
  }
});








































