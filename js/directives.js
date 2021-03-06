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
      $scope.showList = false;

      const NUM_PAGES = 7;

      let getPlanetPages = [];
      for (let i = 1; i <= NUM_PAGES; i++) {
        getPlanetPages.push( dataSvc.getPlanets(i) );
      }

      Promise.all(getPlanetPages).then(
        pages => {
          let list = pages.reduce((a, b) => a.concat( b.data.results ), [])
                          .filter(p => p.residents.length >= $scope.minResidents);
          $scope.planets = list;
          dataSvc.planets = list;
          window.location.replace('#');
        },
        err => console.error(err)
      );

      $scope.toggleShowList = function() {
        $scope.showList = !$scope.showList;
      }

      $scope.displayPlanet = function(i) {
        $scope.$emit('displayPlanet', i);
      }
    }]
  }
});

app.directive('swapiPlanet', function() {
  return {
    restrict: "AE",
    templateUrl: "templates/planet.html",
    scope: {
      index: "@"
    },
    controller: ['$scope', 'dataSvc', function($scope, dataSvc) {
      $scope.planet;
      $scope.residentIds;

      function getPlanetInfo() {
        try {
          $scope.planet = dataSvc.planets[$scope.index];
          $scope.residentIds = dataSvc.planets[$scope.index].residents
                                      .map(url => url.match(/\d+/)[0]);
        } catch (e) {
          console.error(e);
        }
      }

      $scope.$on('planetIndex', getPlanetInfo)
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
      $scope.residents = dataSvc.residents;

      if ($scope.residents[$scope.id]) {
        $scope.character = $scope.residents[$scope.id];
      } else {
        let getCharacter = dataSvc.getCharacter($scope.id);
        getCharacter.then(res => {
          $scope.character = res.data;
          $scope.residents[$scope.id] = res.data;
        },
        err => console.error(err));
      }
    }]
  }
});
