(function(window){

  var appModule = angular.module('SurvaiderDashboard', ['ngRoute', 'ngAnimate']);

  var application = null;

  var uri_dat = UriTemplate.extract('/survey/s:{s_id}/analysis?parent={parent}',
    window.location.pathname + window.location.search);

  var uri = '/api/dashboard/' + uri_dat.s_id + '/response';

  if (uri_dat.parent) {
    uri += "/true";
  }

  var PATHNAME = window.location.pathname;


  appModule.controller('MainController', ['$scope','$http', function($scope, $http){

  }]);

  appModule.controller('HomeController', [ '$scope', '$http', function($scope, $http){

    $scope.isTicketModal = false;

    $http.get(uri).success(function(data){

      application = new myapp(data);
      $scope.features = application.features;
      $scope.colors = application.colors;
      $scope.units = application.units;
      // $scope.ratingPoints = application.ratingPoints;
      // $scope.appMeta = application.meta;

      var numberOfFeatures = $scope.features.length;

      $scope.theGraph = {
        totalMaxGraphHeight: 175,
        blockWidth: 225,
        barWidth: 25,
        barMargin: 5,
        barHeight: 150
      };

      $scope.theGraph['totalGraphWidth'] = ($scope.theGraph.barWidth)*(numberOfFeatures) + ($scope.theGraph.barMargin)*(numberOfFeatures-1);

      $scope.theGraph['groupToTranslate'] = (($scope.theGraph.blockWidth) - ($scope.theGraph.totalGraphWidth)) / 2;

    });

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

    // $http.get('generateTicket.json').success(function(data){
    //   $scope.ticketDetails = {};
    //
    //   if (data.x != -1) {
    //     $scope.ticketDetails = data;
    //   }
    //
    // });

  }]);


  appModule.controller('UnitController', [ '$scope', '$routeParams', function($scope, $routeParams){

    $scope.unit = application.units[$routeParams.id-1];
    console.log("Hello");

  }]);


  appModule.controller('OverallAnalyticsController', [ '$scope', function($scope){

    $scope.surveyQuestions = application.surveyQuestions;

  }]);

  var STATIC_URL = '/static/SurvaiderDashboard/'

  appModule.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/unit/:id', {
      controller: 'UnitController',
      templateUrl: STATIC_URL + 'unit.html'
    })
    .when('/overallAnalytics', {
      controller: 'OverallAnalyticsController',
      templateUrl: STATIC_URL + 'overallAnalytics.html'
    })
    .otherwise({
      controller: 'HomeController',
      templateUrl: STATIC_URL + 'home.html'
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
