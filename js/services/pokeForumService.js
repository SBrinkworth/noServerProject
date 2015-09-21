angular.module("pokeApp").service("pokeForumService", function(fb, $firebaseObject, $q, $firebaseArray) {
  var forumRef = new Firebase(fb.url);
  var baseUrl = fb.url;
  var isLogedIn = false;
  var userInfo = {
    isLogedIn: isLogedIn,
    username: ''
  };

  this.checkForLogin = function() {
    return userInfo;
  };

  this.getThread = function(threadId) {
    return new Firebase(baseUrl + '/threads/' + threadId);
  };

  this.getThreads = function() {
    return new Firebase(baseUrl + '/threads');
  };

  this.getComments = function(threadId) {
    return new Firebase(baseUrl + '/threads/' + threadId + '/comments');
  };

  this.login = function(email, password) {
    var defered = $q.defer();
    var ref = new Firebase(baseUrl);
    var users = new Firebase(baseUrl + "/users");
    users = $firebaseArray(users);
    var username = '';

    ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData) {
      if (error) {
        alert("Incorrect Email or Password. Please try again.");
      } else {
        for (var i = 0; i < users.length; i++) {
          if (users[i].id == authData.uid) {
            username = users[i].username;
          }
        }
        userInfo = {
          isLogedIn: true,
          userData: authData,
          username: username
        };
        defered.resolve(userInfo);
      }
    });
    return defered.promise;
  };

  this.signUp = function(email, username, password) {
    var ref = new Firebase(baseUrl);
    var users = new Firebase(baseUrl + "/users");
    users = $firebaseArray(users);
    ref.createUser({
      email: email,
      password: password
    }, function(error, userData) {
      if (error) {
        alert("Name or Password already in use. Please try again.");
      } else {
        users.$add({
          username: username,
          id: userData.uid,
        });
        alert("Successfull Signup! Please login to continue");
      }
    });
  };
});
