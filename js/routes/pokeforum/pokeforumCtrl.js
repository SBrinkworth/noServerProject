angular.module('pokeApp').controller('pokeforumCtrl', function($scope, threadsRef, $firebaseArray, pokeForumService, isLogedIn) {
  $scope.logedIn = isLogedIn.isLogedIn;
  $scope.threads = $firebaseArray(threadsRef);
  $scope.newThreadToggle = true;

  $scope.createThread = function(username, title) {
    var date = new Date();
    $scope.threads.$add({
      username: username,
      title: title,
      created_on: "" + date.getHours() + ":" + date.getMinutes() + " " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    });
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
});
