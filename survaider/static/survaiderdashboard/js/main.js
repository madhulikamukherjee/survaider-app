(function(window){

  Chart.defaults.global['responsive'] = true;
  Chart.defaults.global['maintainAspectRatio'] = false;

  var appModule = angular.module('SurvaiderDashboard', ['ngRoute', 'chart.js']);

  var application = null;

  var uri_dat = UriTemplate.extract('/survey/s:{s_id}/analysis?parent={parent}',
    window.location.pathname + window.location.search);

  var uri = '/api/dashboard/' + uri_dat.s_id + '/all/response';

  if (uri_dat.parent) {
    uri += "/true";
  }
  var SURVEY_ID = uri_dat.s_id;

  var PATHNAME = window.location.pathname;

  console.log(PATHNAME);


  appModule.controller('MainController', ['$scope','$http', function($scope, $http){

    application = new myapp();

    $scope.colors = application.colors;

    $scope.makeANumberArray = function(size){
      var temp = new Array(size);
      for (var i = 0; i < temp.length; i++) {
        temp[i] = i+1;
      }
      return temp;
    }

  }]);

  appModule.controller('HomeController', [ '$scope', '$http', function($scope, $http){

    $scope.isTicketModal = false;

    $scope.getTheMonthName = function(index){

      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

      return months[index % months.length];
    }

    $scope.formatNumber = function(number){
      if (number < 10 && number > 0) {
        return "0" + number;
      }
      else{
        return number;
      }
    }

    $scope.formatDate = function(date){
      return new Date(date);
    }

    $scope.prepareTicketModal = function(){


      //HTTP-MARK::- GET-THE-FORM-DETAILS
      //Like the proper unit's ids
      //URL:- /api/survey/<parent_survey_id>
      //previously:- ticketForm.json
      $http.get('/api/survey/' + SURVEY_ID)
           .success(function(data){


             $scope.isTicketModal = true;

             $scope.ticketForm = {
               units: [],
               isCheckSome: true,
               isCheckAll: false,
               ticketMessage: "",
               sendTheTicketDetail: function(){
                 var self = this;

                 if ($scope.isTicketModal) {
                   console.log($scope.ticketForm);

                   var unitIDS = [];

                   for (var i = 0; i < self.units.length; i++) {
                     unitIDS.push(self.units[i].id);
                   }

                   var objectToSend = {
                     srvy_id: SURVEY_ID,
                     unit_ids: unitIDS.join(","),
                     tkt_msg: self.ticketMessage
                   };

                   //HTTP-MARK::- SEND-THE-FORM-DETAILS
                   $http.post('/api/surveyticket', objectToSend)
                        .success(function(data){

                          console.log(data);
                          $scope.isTicketModal = true;


                        });

                 }
               },
               setCheckSome: function(bool){
                 isCheckSome = bool;
                 isCheckAll = !bool;
               },
               checkAll: function(){
                 this.setCheckSome(false);
                 for (var i = 0; i < this.units.length; i++) {
                   this.units[i].isSelected = true;
                 }
               },
               checkSome: function(){
                 this.setCheckSome(true);
                 for (var i = 0; i < this.units.length; i++) {
                   this.units[i].isSelected = false;
                 }
               }
             };

             for (var i = 0; i < data.units.length; i++) {
               $scope.ticketForm.units.push({ name:data.units[i].name, id: data.units[i].id, isSelected: false  });
             }

           });

    }

    //HTTP-MARK::- Dashboard API Call which returns top-most line graph data
    //and unit-graph data
    //previously:- data2.json
    $http.get(uri).success(function(data){

      application.init(data);
      $scope.features = application.features;
      $scope.units = application.units;
      $scope.ratingPoints = application.ratingPoints;
      $scope.dates = application.dates;

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

      $scope.theGraph['sumOfScore'] = $scope.features.reduce(function(a,b){ return a.score + b.score });


      $scope.ratingGraph = {
        graphHeight: 200,
        pointRadius: 7,
        borderWidth: 20
      }

      $scope.ratingGraph['maxOrdinate'] = $scope.maxOrdinateFrom2DPointArray($scope.ratingPoints);

      $scope.ratingGraph['abscissaSpacer'] = 60;

      $scope.ratingGraph['graphWidth'] = $scope.ratingPoints.length*65;


      $scope.ticketDetails = {
        x: 9,
        y: 2
      };

      var tempArray = new Array(10);


      $scope.unitsGraph = {
        width: 600,
        height: 600,
        pointRadius: 10,
        outerWidth: 800,
        outerHeight: 800
      }

      $scope.unitsGraph['addUnitX'] = $scope.units.length;

      //HTTP-MARK::- Get the notifications special lines
      //previously:- ticketJSON.json
      $http.get('/api/notifications')
           .success(function(response){

             $scope.tickets = response.data;

             $scope.tickets = $scope.tickets.filter(function(obj){
               if (obj.type == 'SurveyTicket') {
                 return true;
               }
             });


             $scope.tickets.forEach(function(obj){

               obj.acquired = obj.acquired.substr(0,10);

               obj['theDateTime'] = (new Date(obj.acquired)).getTime();

               obj['x'] = $scope.dates.indexOf(obj.theDateTime);


             });


           });


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

  }]);


  appModule.controller('UnitController', [ '$scope', '$routeParams', '$http', function($scope, $routeParams, $http){


    //HTTP-MARK::- GET-THE-GRAPH-DATA-FOR-ALL-QUESTION-TYPES
    //previously:- dataUnit.json
    $http.get('/api/irapi/' + SURVEY_ID + '/0/0/response/true').success(function(data){


      // Setting the features name(from the key 'option_code')
      // and the average rating(from the key 'avg_rating')
      // in an object { 'label', 'rating' } and pushing it in an array
      // $scope.features
      $scope.questions = [];
      
      for (var i = 0; i < data.length; i++) {
        switch (data[i].type) {
          case 'group_rating':
            var groupRating = data[i];
            setGroupRatingQuestion();
            break;
          case 'rating':
            var ratingQuestion = data[i];
            setRatingQuestion();
            break;
          case 'short_text':
            var shortText = data[i];
            setShortTextQuestion();
            break;
          case 'long_text':
            var longText = data[i];
            setLongTextQuestion();
            break;
          case 'yes_no':
            var yesNo = data[i];
            setYesOrNoQuestion();
            break;
          case 'single_choice':
            var singleChoice = data[i];
            setSingleQuestion();
            break;
          case 'multiple_choice':
            var multipleChoice = data[i];
            setMultipleChoiceQuestion();
            break;
          case 'ranking':
            var rankingQuestion = data[i];
            setRankingQuestionQuestion();
            break;

        }
      }


      // Setting the features name(from the key 'option_code')
      // and the average rating(from the key 'avg_rating')
      // in an object { 'label', 'rating' } and pushing it in an array
      // $scope.features
      $scope.features = [];
      var theOptionCodeObject = groupRating['option_code'],
          theAvgRatingObject = groupRating['avg_rating'];

      for (var key in theOptionCodeObject) {
        if (theOptionCodeObject.hasOwnProperty(key)) {
          $scope.features.push( { label: theOptionCodeObject[key], rating: theAvgRatingObject[key]  } )
        }
      }



      function setShortTextQuestion() {

        var countData = [];

        for (var key in shortText['options_count']) {
          if (shortText['options_count'].hasOwnProperty(key)) {
            countData.push( key )
          }
        }

        var question = {

          label: shortText.label,
          type: shortText.type,
          data: countData

        };

        $scope.questions.push(question);

      }

      function setYesOrNoQuestion() {

        var countData = [],
            questionOptions = [];

        for (var key in yesNo['options_count']) {
          if (yesNo['options_count'].hasOwnProperty(key)) {
            countData.push( yesNo['options_count'][key] )
          }
        }

        for (var key in yesNo['option_code']) {
          if (yesNo['option_code'].hasOwnProperty(key)) {
            questionOptions.push( yesNo['option_code'][key] )
          }
        }

        var question = {

          label: yesNo.label,
          type: yesNo.type,
          options: questionOptions,
          data: countData

        };

        $scope.questions.push(question);

      }

      function setSingleQuestion() {

        var countData = [],
            questionOptions = [];

        for (var key in singleChoice['options_count']) {
          if (singleChoice['options_count'].hasOwnProperty(key)) {
            countData.push( singleChoice['options_count'][key] )
          }
        }

        for (var key in singleChoice['option_code']) {
          if (singleChoice['option_code'].hasOwnProperty(key)) {
            questionOptions.push( singleChoice['option_code'][key] )
          }
        }

        var question = {

          label: singleChoice.label,
          type: singleChoice.type,
          options: questionOptions,
          data: countData

        };

        $scope.questions.push(question);
      }

      function setLongTextQuestion() {

        var countData = [],
            questionOptions = [];

        for (var key in longText['sentiment']) {
          if (longText['sentiment'].hasOwnProperty(key)) {
            countData.push( [ longText['sentiment'][key] ] );


            if (key == 'negative') {
              questionOptions.push("Negative :" + longText['sentiment'][key]);
            }

            else if (key == 'positive') {
              questionOptions.push("Positive :" + longText['sentiment'][key]);
            }

            else if (key == 'neutral') {
              questionOptions.push("Neutral :" + longText['sentiment'][key]);
            }

          }
        }

        var positiveKeyWords = [],
            negativeKeywords = [],
            neutralKeywords = [];

        for (var key in longText['sentiment_segg']) {
          if (longText['sentiment_segg'].hasOwnProperty(key)) {

            if (longText['sentiment_segg'][key] == 'negative') {
              negativeKeywords.push(key);
            }

            else if (longText['sentiment_segg'][key] == 'positive') {
              positiveKeyWords.push(key);
            }

            else if (longText['sentiment_segg'][key] == 'neutral') {
              neutralKeywords.push(key);
            }


          }
        }

        var barColorsForAllBars = {
          'negative': '#FB6577',
          'positive': '#A2EB52',
          'neutral': '#DDDDDD'
        };

        var question = {

          label: longText.label,
          type: longText.type,
          positiveKeyWords: positiveKeyWords,
          negativeKeywords: negativeKeywords,
          neutralKeywords: neutralKeywords,
          data: countData,
          options: [],
          series: ['Negative', 'Neutral', 'Positive'],
          graphOptions: {
            barShowStroke : false,
            showScale: false,
            barDatasetSpacing : 10
          },
          colors: [
            {
              'fillColor': barColorsForAllBars['negative']
            },
            {
              'fillColor': barColorsForAllBars['neutral']
            },
            {
              'fillColor': barColorsForAllBars['positive']
            }
          ]

        };

        $scope.questions.push(question);

      }

      function setMultipleChoiceQuestion() {

        var countData = [],
            questionOptions = [];

        for (var key in multipleChoice['options_count_segg']) {
          if (multipleChoice['options_count_segg'].hasOwnProperty(key)) {
            countData.push( multipleChoice['options_count_segg'][key] )
          }
        }

        for (var key in multipleChoice['option_code']) {
          if (multipleChoice['option_code'].hasOwnProperty(key)) {
            questionOptions.push( multipleChoice['option_code'][key] )
          }
        }

        var question = {

          label: multipleChoice.label,
          type: multipleChoice.type,
          data: [countData],
          options: questionOptions,
          series: [],
          graphOptions: {
            barShowStroke : false,
            barDatasetSpacing : 10
          },
          colors: [
            {
              'fillColor': '#50E3D3'
            }
          ]

        };


        var secondGraphCountData = [],
            secondGrapghQuestionOptions = [];

        for (var key in multipleChoice['options_count']) {
          if (multipleChoice['options_count'].hasOwnProperty(key)) {
            secondGraphCountData.push( multipleChoice['options_count'][key] )
          }
        }

        for (var key in multipleChoice['options_count']) {
          if (multipleChoice['options_count'].hasOwnProperty(key)) {

            var delimeter = '###',
              splitArray = key.split(delimeter);

            var codeArray = [];

            for (var i = 0; i < splitArray.length; i++) {
              codeArray.push( $scope.toCharCode( parseInt(splitArray[i].substr(2, splitArray[i].length)) ) );
            }

            secondGrapghQuestionOptions.push( codeArray.join() );
          }
        }

        var secondGraph = {

          data: [secondGraphCountData],
          options: secondGrapghQuestionOptions,
          series: [],
          graphOptions: {
            barShowStroke : false,
            barDatasetSpacing : 10
          },
          colors: [
            {
              'fillColor': '#50E3D3'
            }
          ]

        };

        question.secondGraph = secondGraph;

        $scope.questions.push(question);

      }

      function setRatingQuestion() {

        var countData = new Array(10),
            questionOptions = new Array(10);

        for (var i = 0; i < countData.length; i++) {
          countData[i] = 0;
          questionOptions[i] = i+1;
        }

        for (var key in ratingQuestion['options_count']) {
          if (ratingQuestion['options_count'].hasOwnProperty(key)) {

            var parsedKey = parseInt(key);

            countData[parsedKey - 1] = ratingQuestion['options_count'][key];
          }
        }

        var question = {

          label: ratingQuestion.label,
          type: ratingQuestion.type,
          data: [countData],
          options: questionOptions,
          series: [],
          graphOptions: {
            barShowStroke : false,
            barDatasetSpacing : 10
          },
          colors: [
            {
              'fillColor': '#B8E986'
            }
          ]

        };

        $scope.questions.push(question);

      }


      function setGroupRatingQuestion() {

        var colors = ['#ED7357', '#F3AB73', '#FFF5C6'];

        var questionOptions = new Array(5),
            questionSeries = [];

        for (var i = 0; i < questionOptions.length; i++) {
          if ((i+1) == 1) {
            questionOptions[i] = (i+1) + " star";
          }
          else{
            questionOptions[i] = (i+1) + " stars";
          }
        }

        for (var key in groupRating['option_code']) {
          if (groupRating['option_code'].hasOwnProperty(key)) {
            questionSeries.push( groupRating['option_code'][key] )
          }
        }

        var countData = [];

        for (var i = 0; i < questionSeries.length; i++) {
          countData.push(new Array(questionOptions.length));
        }

        for (var i = 0; i < questionSeries.length; i++) {
          for (var j = 0; j < 5; j++) {
            countData[i][j] = 0;
          }
        }

        for (var key in groupRating['options_count']) {
          if (groupRating['options_count'].hasOwnProperty(key)) {

            var theChoice = parseInt(key.substr(2, key.length));

            for (var otherKey in groupRating['options_count'][key]) {
              if (groupRating['options_count'][key].hasOwnProperty(otherKey)) {

                var theRating = parseInt(otherKey);

                countData[theChoice-1][theRating-1] = groupRating['options_count'][key][otherKey];
              }
            }

          }
        }

        //FOR STAR RATING GRAPH

        var starRating = [];

        for (var key in groupRating['avg_rating']) {
          if (groupRating['avg_rating'].hasOwnProperty(key)) {

            var theChoice = parseInt(key.substr(2, key.length)),
                theValue = groupRating['avg_rating'][key],
                floatingPart = theValue - Math.floor(theValue),
                integerPart = theValue - floatingPart;


            var ratingArray = new Array(5);


            for (var i = 0; i < 5; i++) {
              if ((i+1) <= integerPart) {
                ratingArray[i] = 1;
              }
              else if((i+1) == (integerPart+1)){
                ratingArray[i] = floatingPart;
              }
              else {
                ratingArray[i] = 0;
              }
            }

            starRating.push( { choice: theChoice, starRatingsArray: ratingArray, ratingValue: theValue } );

          }
        }



        var question = {

          label: groupRating.label,
          type: groupRating.type,
          data: countData,
          options: questionOptions,
          series: questionSeries,
          graphOptions: {
            barShowStroke : false,
            barDatasetSpacing : 0,
            barValueSpacing : 15,
            scaleShowVerticalLines: false
          },

          colors: [
            {
              'fillColor': colors[0]
            },
            {
              'fillColor': colors[1]
            },
            {
              'fillColor': colors[2]
            }
          ],

          starRating: starRating

        };


        $scope.questions.push(question);

      }


      function setRankingQuestionQuestion() {

        var colors = ['#ED7357', '#F3AB73', '#FFF5C6'];

        var questionChoices = [],
            countData = [];

        for (var key in rankingQuestion['option_code']) {
          if (rankingQuestion['option_code'].hasOwnProperty(key)) {
            questionChoices.push( rankingQuestion['option_code'][key] )
          }
        }

        var numberOfRanks = questionChoices.length;

        for (var key in rankingQuestion['ranking_count']) {
          if (rankingQuestion['ranking_count'].hasOwnProperty(key)) {

            var theChoice = parseInt(key.substr(2, key.length));

            var tempData = { rank: theChoice, values: [], sumOfValues: 0 };

            for (var otherKey in rankingQuestion['ranking_count'][key]) {
              if (rankingQuestion['ranking_count'][key].hasOwnProperty(otherKey)) {

                var theRating = rankingQuestion['ranking_count'][key][otherKey];

                tempData.values.push( { mainValue: rankingQuestion['ranking_count'][key][otherKey]  });

                tempData.sumOfValues += theRating;
              }
            }
            countData.push(tempData);
          }
        }

        var rectWidth = 300;

        for (var i = 0; i < countData.length; i++) {

          for (var j = 0; j < countData[i].values.length; j++) {

            countData[i].values[j]['normalizedValue'] = countData[i].values[j].mainValue / countData[i].sumOfValues;
            countData[i].values[j]['width'] = countData[i].values[j]['normalizedValue'] * rectWidth;

            if (j==0) {
              countData[i].values[j]['xOfRext'] = 0;
            }
            else{
              countData[i].values[j]['xOfRext'] = countData[i].values[j-1]['width'];
            }
          }

        }

        for (var i = 0; i < countData.length; i++) {
          var counter = 0;
          for (var j = 0; j < countData[i].values.length; j++) {

            counter += countData[i].values[j]['xOfRext'];

            if (j != 0) {
              countData[i].values[j]['xOfRext'] = counter;
            }


          }
        }

        var sortingOrder = [];

        for (var key in rankingQuestion['options_count']) {
          if (rankingQuestion['options_count'].hasOwnProperty(key)) {

            var theChoice = parseInt(key.substr(2, key.length));

            sortingOrder.push( theChoice );

          }
        }



        var question = {

          label: rankingQuestion.label,
          type: rankingQuestion.type,
          data: countData,
          options: questionChoices,
          colors: colors,
          board: sortingOrder
        };


        $scope.questions.push(question);

      }




    });



    // a => 0
    $scope.toCharCode = function(number){
      return String.fromCharCode(97 + number);
    }

  }]);


  appModule.controller('OverallAnalyticsController', [ '$scope', function($scope){

    $scope.surveyQuestions = application.surveyQuestions;

  }]);

  var STATIC_URL = '/static/SurvaiderDashboard/'

  appModule.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/unit/:id', {
      controller: 'UnitController',
      templateUrl: '/static/SurvaiderDashboard/unit.html'
    })
    .when('/overallAnalytics', {
      controller: 'OverallAnalyticsController',
      templateUrl: '/static/SurvaiderDashboard/overallAnalytics.html'
    })
    .otherwise({
      controller: 'HomeController',
      templateUrl: '/static/SurvaiderDashboard/home.html'
    })
  }]);

  appModule.filter('getTheMonthName', function(){
    return function(input){
      return application.getTheMonthName(input);
    }
  });



})(window);
