'use strict';

var app = angular.module('swapiCardsApp');

app.service('dataSvc', ['$http', function($http) {
  this.planets = [];
  this.residents = {};
  this.displayPlanet = false;

  this.getPlanets = function(page) {
    return $http.get('http://swapi.co/api/planets/?format=json&page=' + page)
  }

  this.getCharacter = function(id) {
    return $http.get('http://swapi.co/api/people/' + id + '/?format=json');
  }
}]);



// let getPlanetPages = [];
// for (let i = 1; i <= NUM_PAGES; i++) {
//   getPlanetPages.push( dataSvc.getPlanets(i) );
// }

// Promise.all(getPlanetPages).then(
//   pages => {
//     let list = pages.reduce((a, b) => a.concat( b.data.results ), [])
//                     .filter(p => p.residents.length >= $scope.minResidents);
//     console.log('list:', list)
    
//     $scope.planets = list;
//     dataSvc.planets = list;
//     window.location.replace('#');