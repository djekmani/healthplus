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
  
  this.privacy = {
    score: 0,
    ignoreQuestions: true,
    groups: ["Fundamentalist" , "The pragmatic" ,  "The unconcerned" , "The Should-be-Protected"],
    userGroup: false
  };
  this.group = false;
  this.questions = [];

  this.checked1 = true; 
  this.checked2 = false; 
  this.checked3 = false;
  this.result   = false;

  this.ignoreQuestions = function()
  {
    this.privacy.ignoreQuestions = false;
    this.checked1 = false;
    this.checked2 = false;
    this.checked3 = false;
    this.result   = true;
  }
  this.setGroup = function()
  {
    if(this.privacy.ignoreQuestions)
    {
      if(this.privacy.score >= 9) this.privacy.userGroup = 0; 
      
      else if(this.privacy.score >= 6)  this.privacy.userGroup = 1;
      
      else
      {
        this.privacy.userGroup = 2;
      } 
    }
    
    else  this.privacy.userGroup = 3; 
  }

  this.getGroup = function()
  {
   this.setGroup();

    return this.privacy.groups[this.privacy.userGroup];
  }

  this.score = function(val1 , val2 , val3)
  {
    this.privacy.score =  parseInt(val1) + parseInt(val2) + parseInt(val3);
  }


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
      this.score(this.questions[0] , this.questions[1] , this.questions[2]);
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
