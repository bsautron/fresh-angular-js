'use strict';

angular
.module('freshApp')
.factory('basicAuthFactory', ['$http', '$rootScope', '$cookies', '$location', 'base64Factory',
  function($http, $rootScope, $cookies, $location, base64Factory) {
    return {
      login: function(username, password) {
        return new Promise(function(resolve, reject) {
          if(username && password) {
            let token = base64Factory.encode(username + ":" + password);
            $http({
              method: 'GET',
              url: 'http://localhost:3000/api/ping',
              headers: {'Authorization': 'Basic ' + token}
            }).then(() => {
              $rootScope.loggedUser = username;
              $cookies.put('basicAuth', token);
              $http.defaults.headers.common.Authorization = "Basic " + token;
              $location.path('/home');
              resolve();
            }).catch((err) => reject(err));
          }
        });
      },

      logout: function() {
        $rootScope.loggedUser = null;
        delete $http.defaults.headers.common['Authorization'];
      },

      isLogged: function() {
        if ($cookies.get('basicAuth'))
          return (true);
        return (false);
      },

      setDefaultAuth: function() {
        let token = $cookies.get('basicAuth');
        $http.defaults.headers.common.Authorization = "Basic " + token;
      }
    };
  }
]);
