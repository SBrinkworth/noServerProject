angular.module("pokeApp").directive("pokedexDir", function() {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/pokedex/pokedexDirTmpl.html',
    scope: {
      pokemon: '=',
      selected: '&'
    },
    controller: function($scope) {
      $scope.clicked = function() {
        $scope.selected({id: $scope.pokemon.id});
      };
    }
  };
});
