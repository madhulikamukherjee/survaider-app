(function(window){

  var appModule = angular.module('SurvaiderDashboard', ['ngRoute', 'ngAnimate']);

  var application = null;

  var uri_dat = UriTemplate.extract('/survey/s:{s_id}/analysis?parent={parent}',
    window.location.pathname + window.location.search);

  var uri = '/api/dashboard/' + uri_dat.s_id + '/response';

  if (uri_dat.parent) {
    uri += "/true";
  }

  appModule.controller('MainController', ['$scope','$http', function($scope, $http){

    $http.get('/static/survaiderdashboard/data.json').success(function(data){

      application = new myapp(data);
      $scope.features = application.features;
      $scope.colors = application.colors;
      $scope.ratingPoints = application.ratingPoints;
      $scope.appMeta = application.meta;


      $scope.maxElementFromArray = function(input){
        var max = -1;

        if (input.length > 0) {
          for (var i = 0; i < input.length; i++) {
            if (input[i].score > max) {
              max = input[i].score;
            }
          }
        }

        return max;
      }

      $scope.maxOrdinateFrom2DPointArray = function(input){
        var max = -1;

        if (input.length > 0) {
          for (var i = 0; i < input.length; i++) {
            if (input[i].y > max) {
              max = input[i].y;
            }
          }
        }

        return max;
      }

    });

  }]);

  appModule.controller('HomeController', [ '$scope', '$http', function($scope, $http){

    $scope.isTicketModal = false;

    $scope.units = application.units;

    $http.get('generateTicket.json').success(function(data){
      $scope.ticketDetails = {};

      if (data.x != -1) {
        $scope.ticketDetails = data;
      }

    });

  }]);


  appModule.controller('UnitController', [ '$scope', '$routeParams', function($scope, $routeParams){

    $scope.unit = application.units[$routeParams.id-1];

  }]);


  appModule.controller('OverallAnalyticsController', [ '$scope', function($scope){

    $scope.surveyQuestions = application.surveyQuestions;

  }]);


  appModule.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/unit/:id', {
      controller: 'UnitController',
      templateUrl: '/static/survaiderdashboard/unit.html'
    })
    .when('/overallAnalytics', {
      controller: 'OverallAnalyticsController',
      templateUrl: '/static/survaiderdashboard/overallAnalytics.html'
    })
    .otherwise({
      controller: 'HomeController',
      templateUrl: '/static/survaiderdashboard/home.html'
    })
  }]);

  appModule.filter('getTheMonthName', function(){
    return function(input){
      return application.getTheMonthName(input);
    }
  });
  //
  // appModule.directive('lineChart', function(){
  //
  //   return {
  //
  //     replace: true,
  //     scope:{
  //       graphHeight: '=',
  //       graphWidth: '=',
  //       pointRadius: '='
  //     },
  //     templateUrl: 'lineChart.html',
  //     link: function(scope, element, attr){
  //       console.log(scope);
  //       console.log(scope);
  //       console.log(scope);
  //
  //     }
  //
  //   }
  //
  // });



})(window);
