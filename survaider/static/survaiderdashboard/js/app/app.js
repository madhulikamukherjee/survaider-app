(function(window){

  //Constructor
  function app(data){
    this.features = [];
    this.units = [];
    this.ratingPoints = [];
    this.surveyQuestions = [];
    this.meta = {};
    this.colors = ['#B8E986', '#92C4FF', '#B86DF9', '#F4596C', '#F7CC85'];
    this.init(data);
  }

  //Initializer
  app.prototype.init = function(data){

    var self = this;

    /* Uses Class :: feature
    * Constructor(Number id, String label)
    */
    data.features.forEach(function(f){
      self.features.push(new feature(f.id, f.label));
    });

    /* Uses Class :: unit
    * Constructor(Number id, String name, Number overallScore)
    */
    data.units.forEach(function(u){
      var tempUnit = new unit(u.id, u.name);

      for (var i = 0; i < 5; i++) {
        tempUnit.features.push( { id: i+1, score: 10*Math.random() } );
      }

      //MAIN::Removed Only for Testing Purposes
      // u.features.forEach(function(f){
      //   tempUnit.features.push( { id: f.id, score: f.score } );
      // });


      u.questions.forEach(function(q){

        tempUnit.questions.push( new Question(q.id, q.title, q.type, q.response) );

      });

      tempUnit.ratingData = u.rating_data;

      //Testing:: ONLY FOR TESTING
      app.RandomizeTheData(tempUnit.ratingData, 'y');
      app.RandomizeTheData(tempUnit.features, 'score');

      tempUnit.setTheOverallScore();

      self.units.push(tempUnit);
    });

    this.ratingPoints = data.rating_data;

    //Testing:: ONLY FOR TESTING
    app.RandomizeTheData(this.ratingPoints, 'y');

    this.meta = {
      'totalRespondents' : data.total_respondents
    };

    this.surveyQuestions = data.questions;
  }

  app.prototype.getTheMonthName = function(index){

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    return months[index % months.length];
  }


  //Testing Functions
  app.RandomizeTheData = function(array, keyName){
    array.forEach(function(point){

      point[keyName] = parseInt(point[keyName] * Math.random());

    });
  }







  window.myapp = app;


})(window);
