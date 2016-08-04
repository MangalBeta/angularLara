var app =angular.module('myApp', ['ngRoute','ngStorage','ui.bootstrap','ngResource', 'oi.select']);
// .constant("CSRF_TOKEN", '<% csrf_token() %>');

app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        // if (!Auth.isUserLoggedIn()) {
        //     console.log('DENY');
        //    // event.preventDefault();
        //     $location.path('/login');
        // }
        //  else{
        //     console.log('Allow');
        //    // event.preventDefault();
        //     $location.path('/home');
        //  }
        
    });
}]);

app.config(['$routeProvider' ,function($routeProvider) {
    $routeProvider.
       when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'questionController'
    }).
       when('/home', {
     templateUrl: 'views/home.html',
     controller: 'questionController',
     resolve:{
         auth: function ($q, Auth,$location) {
             var userLoged = Auth.isUserLoggedIn();
              console.log(userLoged);
               if (userLoged) {
                 $location.path('/home');
             }
                 else {
                      $location.path('/login');
                 }
        }
    }
    }). when('/ask', {
     templateUrl: 'views/authuser/askQuestion.html',
     controller: 'questionController',
     resolve:{
         auth: function ($q, Auth,$location) {
             var userLoged = Auth.isUserLoggedIn();
              console.log(userLoged);
               if (userLoged) {
                 $location.path('/ask');
             }
                 else {
                      $location.path('/login');
                 }
        }
    }
    }).
	 when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
        auth: function ($q, Auth,$location) {
             var userLoged = Auth.isUserLoggedIn();
              console.log(userLoged);
               if (userLoged) {
                 $location.path('/home');
             }else {
                      $location.path('/login');
                 }
        }
    }).
    when('/signup',{
        templateUrl: 'views/signUp.html',
        controller: 'loginController'
    }).
    when('/singleQuestion/:id', {
             templateUrl:'views/singleQuestion.html',
            controller: 'questionController'
          }).
        when('/editAnswer/:id', {
             templateUrl:'views/authuser/editAnswer.html',
            controller: 'questionController'
          }).
  when('/searchmeta', {
             templateUrl:'views/serachmeta.html',
            controller: 'questionController'
          }).
       when('/userProfile', {
              templateUrl:'views/authuser/userProfile.html',
            controller: 'questionController'
          }).
  
      otherwise( {
        redirectTo: '/welcome' 
      });
// $locationProvider.html5Mode({
//   enabled: true,
//   requireBase: false
// });
}]);




