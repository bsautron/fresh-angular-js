'use strict';

angular
  .module('freshApp')
  .controller('homeCtrl', ['$scope', '$resource',
    function($scope, $resource) {
      let Me = $resource('http://localhost:3000/api/me');
      let me = Me.get({}, function() {
        $scope.me = me.response;
      });
    }
  ]);
