angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, auth, $state, store) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      $state.go('tab.dash');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();
  
  
})

.controller('DashCtrl', function($scope, $http) {
  


  this.questions = [];

  this.checked1 = true; 
  this.checked2 = false; 
  this.checked3 = false;
  this.result   = false;

  this.check = function(val)
  {
    if(val == 1)
    {
      this.checked1 = false;
      this.checked2 = true;
      this.checked1 = false;
    }
    else if(val == 2)
    {
      this.checked1 = false;
      this.checked2 = false;
      this.checked3 = true;
    }
    else if(val == 3)
    {
      this.checked1 = false;
      this.checked2 = false;
      this.checked3 = false;
      this.result   = true;
    }
  } 

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
