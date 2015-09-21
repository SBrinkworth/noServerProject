angular.module("pokeApp").controller("forumThreadCtrl", function($scope, threadRef, $firebaseObject, commentsRef, $firebaseArray, pokeForumService) {
  var thread = $firebaseObject(threadRef);
  $scope.user = pokeForumService.checkForLogin();

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
