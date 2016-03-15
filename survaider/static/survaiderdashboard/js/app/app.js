(function(window){

  //Constructor
  function app(){
    this.features = [];
    this.units = [];
    this.ratingPoints = [];
    this.surveyQuestions = [];
    this.meta = {};
    this.colors = ['#B8E986', '#92C4FF', '#B86DF9', '#F4596C', '#F7CC85'];
  }

  //Initializer
  app.prototype.init = function(data){

    var self = this;

    /* Uses Class :: feature
    * Constructor(Number id, String label)
    */

    self.features = [];
    self.setFeaturesData(data['parent_survey'][0]['options_code']);
    self.setFeaturesScore(data['parent_survey'][0]['avg_rating']);
    self.setRatingData(data['parent_survey'][1]['timed_agg']);

    self.TIMEDAGGR = data['parent_survey'][1]['timed_agg'];
    self.TIMEDAGGR = Object.keys(self.TIMEDAGGR);

    var l = self.TIMEDAGGR[0],
        h = self.TIMEDAGGR[self.TIMEDAGGR.length - 1];

    // var dateL = l.split('-');
    //
    // var dateH = h.split('-');
    //
    // var temp = dateL[0];
    // dateL[0] = dateL[2];
    // dateL[2] = temp;
    //
    // temp = dateH[0];
    // dateH[0] = dateH[2];
    // dateH[2] = temp;
    //
    // temp = dateL[0];
    // dateL[0] = dateL[1];
    // dateL[1] = temp;
    //
    // temp = dateH[0];
    // dateH[0] = dateH[1];
    // dateH[1] = temp;
    //
    // l = dateL.join('-');
    // h = dateH.join('-');
    //
    // function treatAsUTC(date) {
    //     var result = new Date(date);
    //     result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    //     return result;
    // }
    //
    // function daysBetween(startDate, endDate) {
    //     var millisecondsPerDay = 24 * 60 * 60 * 1000;
    //     return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
    // }
    //
    // var numberOfDays = daysBetween(l,h);
    //
    // self.dates = [];
    // console.log(l);
    // for (var i = 0; i < numberOfDays; i++) {
    //   var nextDate = new Date(l).getTime() + (1000*24*60*60*(i+1));
    //   nextDate = new Date(nextDate);
    //
    //   var date = [];
    //
    //   date.push(nextDate.getMonth());
    //   date.push(nextDate.getDate());
    //   date.push(nextDate.getFullYear());
    //
    //   self.dates.push(date.join('-'));
    //   console.log(date.join('-'));
    // }

    var secondsL = new Date(l).getTime(),
        secondsH = new Date(h).getTime();

    self.dates = [];
    self.dates.push(new Date(l).getTime());
    while (secondsL < secondsH) {
      secondsL += 60*60*24*1000;
      self.dates.push( new Date(secondsL).getTime() );
    }

    // console.log(self.dates);

    /* Uses Class :: unit
    * Constructor(Number id, String name, Number overallScore)
    */
    self.units = [];
    data.units.forEach(function(u, idx){
      var tempUnit = new unit(idx, u[0].unit_name, u[1].avg_rating);

      // for (var i = 0; i < 5; i++) {
      //   tempUnit.features.push( { id: i+1, score: 10*Math.random() } );
      // }

      //MAIN::Removed Only for Testing Purposes
      // u.features.forEach(function(f){
      //   tempUnit.features.push( { id: f.id, score: f.score } );
      // });


      // u.questions.forEach(function(q){
      //
      //   tempUnit.questions.push( new Question(q.id, q.title, q.type, q.response) );
      //
      // });

      tempUnit.setFeaturesData(u[0].avg_rating);

      //Testing:: ONLY FOR TESTING
      // app.RandomizeTheData(tempUnit.ratingData, 'y');
      // app.RandomizeTheData(tempUnit.features, 'score');

      // tempUnit.setTheOverallScore();

      self.units.push(tempUnit);
    });

    // this.ratingPoints = data.rating_data;
    //
    // //Testing:: ONLY FOR TESTING
    // app.RandomizeTheData(this.ratingPoints, 'y');
    //
    // this.meta = {
    //   'totalRespondents' : data.total_respondents
    // };
    //
    // this.surveyQuestions = data.questions;
  }

  app.prototype.getTheMonthName = function(index){

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    return months[index % months.length];
  }


  app.prototype.setFeaturesData = function(featuresData){
    var self = this;
    var index = 0;

    for (var prop in featuresData) {
      if( featuresData.hasOwnProperty( prop ) ) {
        self.features.push({ id: (index+1), label: featuresData[prop] });
      }
      index++;
    }

  }

  app.prototype.setFeaturesScore = function(featuresData){
    var self = this;
    var index = 0;

    for (var prop in featuresData) {
      if( featuresData.hasOwnProperty( prop ) ) {
        self.features[index]['score'] = featuresData[prop];
      }
      index++;
    }

  }

  app.prototype.setRatingData = function(featuresData){
    var self = this;
    var index = 0;

    self.ratingPoints = [];

    for (var prop in featuresData) {
      if( featuresData.hasOwnProperty( prop ) ) {
        self.ratingPoints.push({ label: prop, x: index, y: featuresData[prop]});
      }
      index++;
    }

  }


  //Testing Functions
  app.RandomizeTheData = function(array, keyName){
    array.forEach(function(point){

      point[keyName] = parseInt(point[keyName] * Math.random());

    });
  }







  window.myapp = app;


})(window);
