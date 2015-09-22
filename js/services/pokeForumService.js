angular.module("pokeApp").service("pokeForumService", function(fb, $firebaseObject, $q, $firebaseArray, $firebase) {
  var forumRef = new Firebase(fb.url);
  var baseUrl = fb.url;

  this.getUsername = function(uid) {
    var defered = $q.defer();
    var usersRef = new Firebase(baseUrl + '/users');
    usersRef.once('value', function(wholeSnapshot) {
      wholeSnapshot.forEach(function(snap) {
        // console.log(snap.val().id);
        // console.log(uid);
        if (uid == snap.val().id) {
          var username = snap.val().username;
          defered.resolve(username);
        }
      });
      defered.resolve('Anon');
    });
    return defered.promise;
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
    var username = '';

    ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData) {
      if (error) {
        alert("Incorrect Email or Password. Please try again.");
      } else {
        defered.resolve(authData);
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
