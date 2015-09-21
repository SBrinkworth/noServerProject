var app = angular.module('pokeApp', ['ngRoute', 'firebase']);

app.constant('pa', {
  url: 'http://pokeapi.co'
});

app.constant('fb', {
  url: 'https://pokeappchat.firebaseio.com/'
});

app.config(function($routeProvider, $httpProvider) {

  $routeProvider.when('/', {
    templateUrl: 'js/routes/home/homeTmpl.html',
    controller: 'homeCtrl'
  }).when('/pokedex', {
    templateUrl: 'js/routes/pokedex/pokedexTmpl.html',
    controller: 'pokedexCtrl',
    resolve: {
      pokedex: function(pokeService) {
        return pokeService.getPokedexData();
      }
    }
  }).when('/pokeforum', {
    templateUrl: 'js/routes/pokeforum/pokeforumTmpl.html',
    controller: 'pokeforumCtrl',
    resolve: {
      threadsRef: function(pokeForumService) {
        return pokeForumService.getThreads();
      },
      isLogedIn: function(pokeForumService) {
        return pokeForumService.checkForLogin();
      }
    }
  }).when('/pokeforum/:threadId', {
    templateUrl: 'js/routes/forumThread/forumThreadTmpl.html',
    controller: 'forumThreadCtrl',
    resolve: {
      threadRef: function(pokeForumService, $route) {
        return pokeForumService.getThread($route.current.params.threadId);
      },
      commentsRef: function(pokeForumService, $route) {
        return pokeForumService.getComments($route.current.params.threadId);
      }
    }
  }).otherwise({
    redirectTo: '/'
  });
});
