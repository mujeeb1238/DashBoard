'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',  
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.services',
  'myApp.restCalls',
  'ngCookies',
  'myApp.otherControllers',
  'myApp.fileUploadDirective'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login',{
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
  }).when('/signup',{
      templateUrl: 'partials/signup.html',
      controller: 'SignupController'
  }).when('/land',{
      templateUrl: 'partials/templates/createTemplate.html'
  }).when('/dashboard',{
      templateUrl: 'partials/dashboards/dashboard.html'
  }).when('/createTemplate',{
      templateUrl: 'partials/templates/createTemplate.html'
  }).otherwise({redirectTo: '/login'});
}]);
    
myApp.factory('authInterceptor', ['$rootScope', '$q', '$window', '$location', 'AuthService','$cookies', function ($rootScope, $q, $window, $location, AuthService, $cookies) {
  return {
    request: function (config) {
        if($location.path() !== '/login' && $location.path() !== '/signup'){
            if(typeof(AuthService.getToken()) === 'undefined'){
                if($location.path() === '/signup'){
                    $location.path('/signup');
                }else{
                    $location.path('/login');    
                }
                
            }
            config.headers['Auth-Token'] = AuthService.getToken();
            config.data = config.data || {};
            config.data.id = AuthService.getUID();
        }
               
      return config;
    },
    response: function (response) {
      return response || $q.when(response);
    },
    requestError: function(rejection) {
      //console.log("requestError: "+JSON.stringify(rejection));
      return $q.reject(rejection);
    },
    responseError: function(rejection) {
      //console.log("responseError: "+JSON.stringify(rejection));
      if(rejection.status === 401)
          $location.path('/login');
      return $q.reject(rejection);
    }
  };
}]);

myApp.config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
}]);



 
