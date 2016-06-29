'use strict';

angular
.module('freshApp')
.controller('loginCtrl', ['$scope', '$resource', 'basicAuthFactory',

  function($scope, $resource, myAuthFactory) {

    $scope.login = () => {
      myAuthFactory.login($scope.username, $scope.password)
        .then(() => console.log('good'))
        .catch((err) => console.log(err));
    }

  }
]);
