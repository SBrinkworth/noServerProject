angular.module('pokeApp').controller('pokeforumCtrl', function($scope, threadsRef, $firebaseArray, pokeForumService, fb, $route) {
  $scope.logedIn = false;
  $scope.threads = $firebaseArray(threadsRef);
  $scope.ref = new Firebase(fb.url);
  $scope.authData = {};
  $scope.user = '';

  $scope.createThread = function(username, title) {
    console.log(username);
    var date = new Date();
    $scope.threads.$add({
      username: username,
      title: title,
      created_on: "" + date.getHours() + ":" + date.getMinutes() + " " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    });
    $scope.newThreadTitle = '';
  };

  $scope.createUser = function(email, username, password) {
    pokeForumService.signUp(email, username, password);
    $scope.password = '';
  };

  $scope.loginUser = function(email, password) {
    pokeForumService.login(email, password).then(function(response) {
      $scope.loginPassword = '';
      $scope.logedIn = response.isLogedIn;
      $scope.user = response.username;
    });
  };

  $scope.logOut = function() {
    var ref = new Firebase(fb.url);
    ref.unauth();
  };

  function authDataCallback(authData) {
    $scope.authData = authData;

    if (authData) {
      pokeForumService.getUsername(authData.uid).then(function(response) {
        $scope.user = response;
      });
    }
  }

  $scope.ref.onAuth(authDataCallback);
});
