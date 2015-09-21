angular.module('pokeApp').service('pokeService', function($http, pa, $q) {
  var baseUrl = pa.url;
  var pokedexUrl = '/api/v1/pokedex/1/';
  var pokemonUrl = '/api/v1/pokemon/';
  var typeUrl = '/api/v1/type/';
  var moveUrl = '/api/v1/move/';
  var abilityUrl = '/api/v1/ability/';
  var eggUrl = '/api/v1/egg/';
  var descUrl = '/api/v1/description/';
  var spriteUrl = '/api/v1/sprite/';

  this.getPokedexData = function() {
    var defered = $q.defer();
    $http({
      method: 'GET',
      url: baseUrl + pokedexUrl
    }).then(function(response) {
      var pokedex = response.data.pokemon;
      for (var i = 0; i < pokedex.length; i++) {
        var splitUri = pokedex[i].resource_uri.split('/');
        pokedex[i].id = parseInt(splitUri[3]);
      }
      defered.resolve(pokedex);
    });
    return defered.promise;
  };

  this.getPokemonData = function(id) {
    return $http({
      method: 'GET',
      url: baseUrl + pokemonUrl + id
    }).then(function(response) {
        return response.data;
    });
  };

  this.getDescriptionData = function(id) {
    return $http({
      method: 'GET',
      url: baseUrl + descUrl + id
    }).then(function(response) {
        return response.data;
    });
  };

  this.getSpriteData = function(id) {
    return $http({
      method: 'GET',
      url: baseUrl + spriteUrl + id
    }).then(function(response) {
        return response.data;
    });
  };
});
