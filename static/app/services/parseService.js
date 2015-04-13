angular.module('app.parseService', [])

.factory('parseFactory', ['$http', '$q', function ($http, $q) {
  var parser = {};

  parser.getTree = function (sentence) {
    var deferred = $q.defer();

    $http({method: "GET", url: '/parsetree', params: {sentence: sentence}})
      .success(function (data, status) {
        deferred.resolve(data);
      })
      .error(function (error, status) {
        console.log("error", status);
        deferred.reject();
      });

    return deferred.promise;
  };

  return parser;
}]);
