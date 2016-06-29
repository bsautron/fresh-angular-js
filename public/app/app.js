'use strict';

angular
.module('freshApp', [
  'ngRoute',
  'ngResource',
  'ngCookies',
])
.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: './app/components/home/homeView.html',
        controller: 'homeCtrl'
      })
      .when('/login', {
        templateUrl: './app/components/login/loginView.html',
        controller: 'loginCtrl'
      })
      .when('/fridges', {
        templateUrl: './app/components/fridges/fridgesView.html',
        controller: 'fridgesCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }
])
.run(['$rootScope', '$location', 'basicAuthFactory',
  function($rootScope, $location, basicAuthFactory) {
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( !basicAuthFactory.isLogged()) {
        // no logged user, we should be going to #login
        if ( next.templateUrl == "./app/components/login/loginView.html" ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( "/login" );
        }
      }
      else {
        basicAuthFactory.setDefaultAuth();
      }
    });
  }
]);
