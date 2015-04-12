angular.module('app.home', [])

.controller('HomeCtrl', ['$scope', function ($scope) {
  $scope.verb = 'Visualize';
  $scope.noun = 'this!';
}]);
