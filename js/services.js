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
