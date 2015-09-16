var app = angular.module('pokeApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/pokedex', {
    templateUrl: '',
    controller: '',
    resolve: {
      
    }
  }).when('/pokedex/:pokemonId', {
    templateUrl: '',
    controller: '',
    resolve: {

    }
  }).otherwise({
    redirectTo: '/pokedex'
  });
});
