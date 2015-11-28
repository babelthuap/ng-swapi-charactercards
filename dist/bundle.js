'use strict';

var app = angular.module('swapiCardsApp', []);

app.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.$on('displayPlanet', function (_, index) {
    $scope.planetIndex = index;
    $scope.$broadcast('planetIndex', index);
  });
}]);

'use strict';

var app = angular.module('swapiCardsApp');

app.directive('swapiPlanetsSelector', function () {
  return {
    restrict: "AE",
    templateUrl: "templates/planets.html",
    scope: {
      minResidents: "@minResidents"
    },
    controller: ['$scope', 'dataSvc', function ($scope, dataSvc) {
      $scope.planets = dataSvc.planets;
      $scope.showList = false;

      var getPlanets = dataSvc.getPlanets();
      getPlanets.then(function (planets) {
        var list = planets.data.results.filter(function (element) {
          return element.residents.length >= $scope.minResidents;
        });
        $scope.planets = list;
        dataSvc.planets = list;
      }, function (err) {
        return console.error(err);
      });

      $scope.toggleShowList = function () {
        $scope.showList = !$scope.showList;
      };

      $scope.displayPlanet = function (i) {
        // console.log('index:', i);
        // $scope.showList = false;
        $scope.$emit('displayPlanet', i);
      };
    }]
  };
});

app.directive('swapiPlanet', function () {
  return {
    restrict: "AE",
    templateUrl: "templates/planet.html",
    scope: {
      index: "@"
    },
    controller: ['$scope', 'dataSvc', function ($scope, dataSvc) {
      $scope.planet;
      $scope.residentIds;

      function getPlanetInfo() {
        try {
          $scope.planet = dataSvc.planets[$scope.index];
          $scope.residentIds = dataSvc.planets[$scope.index].residents.map(function (url) {
            return url.match(/\d+/)[0];
          });
        } catch (e) {
          console.error(e);
        }
        // console.log('planet ' + $scope.index + ':', dataSvc.planets[$scope.index]);
        // console.log('resident ids:', $scope.residentIds);
      }

      $scope.$on('planetIndex', getPlanetInfo);
    }]
  };
});

app.directive('swapiResident', function () {
  return {
    restrict: "AE",
    templateUrl: "templates/resident.html",
    scope: {
      id: "@"
    },
    controller: ['$scope', 'dataSvc', function ($scope, dataSvc) {
      $scope.id;
      $scope.residents = dataSvc.residents;

      if ($scope.residents[$scope.id]) {
        $scope.character = $scope.residents[$scope.id];
      } else {
        var getCharacter = dataSvc.getCharacter($scope.id);
        getCharacter.then(function (res) {
          $scope.character = res.data;
          $scope.residents[$scope.id] = res.data;
        }, function (err) {
          return console.error(err);
        });
      }
    }]
  };
});

'use strict';

var app = angular.module('swapiCardsApp');

app.service('dataSvc', ['$http', function ($http) {
  this.planets = [];
  this.residents = {};
  this.displayPlanet = false;

  this.getPlanets = function () {
    return $http.get('http://swapi.co/api/planets/?format=json');
  };

  this.getCharacter = function (id) {
    return $http.get('http://swapi.co/api/people/' + id + '/?format=json');
  };
}]);