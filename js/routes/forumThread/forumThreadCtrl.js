angular.module("pokeApp").controller("forumThreadCtrl", function($scope, threadRef, $firebaseObject, commentsRef, $firebaseArray, pokeForumService, fb, $location) {
  var ref = new Firebase(fb.url);
  var authData = ref.getAuth();

  if (authData) {
    $scope.logedIn = true;
    console.log(authData.uid);
    pokeForumService.getUsername(authData.uid).then(function(response) {
      $scope.username = response;
    });
  } else {
    console.log('not loged in');
    $scope.username = '';
  }

  $scope.logOut = function() {
    var ref = new Firebase(fb.url);
    ref.unauth();
    $location.path('/pokeforum');
  };

  var thread = $firebaseObject(threadRef);

  thread.$bindTo($scope, 'thread');

  $scope.comments = $firebaseArray(commentsRef);

  $scope.createComment = function(username, text) {
    $scope.comments.$add({
      username: username,
      text: text
    });
    $scope.newCommentText = '';
  };
});
