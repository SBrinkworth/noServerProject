angular.module("pokeApp").directive("pokemonDir", function() {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/pokemon/pokemonDirTmpl.html',
    scope: {
      pokemon: '=',
      description: '=',
      picture: '='
    },
    controller: function($scope) {
      $scope.$watch('pokemon', function() {
        $scope.height = ($scope.pokemon.height / 10).toFixed(1) + 'm';
        $scope.weight = ($scope.pokemon.weight / 10).toFixed(1) + 'kg';
      });
    }
  };
});
