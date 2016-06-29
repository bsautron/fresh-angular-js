'use strict';

angular
.module('freshApp')
.controller('fridgesCtrl', ['$scope', '$resource',
  function($scope, $resource) {
    let Fridges = $resource('http://localhost:3000/api/me/fridge');

    function loadFridges() {
      let fridges = Fridges.get({}, function() {
        $scope.fridges = fridges.response;
      });
    };

    $scope.addFridge = () => {
      let newFridge = Fridges.save({name: $scope.name}, function() {
        loadFridges();
      });
    }

    loadFridges();
  }
]);
