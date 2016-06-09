(function(window){

  //Constructor
  function app(){
    this.features = [];
    this.units = [];
    this.ratingPoints = [];
    this.surveyQuestions = [];
    this.meta = {};
    this.colors = ['#B8E986', '#92C4FF', '#B86DF9', '#F4596C', '#F7CC85'];
    this.sentiments = [];
    this.totalRespondents = [];
    this.companyName = [];
    this.unitName = [];
    this.unitId = '';

    this.unifiedRating = [];
    this.sentimentsObject = [];
  }

  //Initializer
  app.prototype.init = function(data){

    var self = this;
    // console.log("init called ....");

    /* Uses Class :: feature
    * Constructor(Number id, String label)
    */

    self.features = [];
    self.setFeaturesData(data['parent_survey']['responses'][1]['options_code']);
    self.setFeaturesScore(data['parent_survey']['responses'][1]['avg_rating']);
    self.setRatingData(data['parent_survey']['responses'][0]['timed_agg']);
    self.setSentimentsObjectData(data['parent_survey']['sentiment']);
    self.setTotalRespondents(data['parent_survey']['meta']['total_resp']);
    self.setCompanyName(data['parent_survey']['meta']['company']);
    self.setUnitName(data['parent_survey']['meta']['unit_name']);
    // self.setUnitCity(data['parent_survey']['meta']['unit_name']);
    self.setUnitId(data['parent_survey']['meta']['id']);
    self.setUnifiedRating(data['parent_survey']['responses'][0]['avg_rating']);
    // self.unitName = data['parent_survey']['meta'].unit_name;
    // alert(self.unitName);

    self.TIMEDAGGR = data['parent_survey']['responses'][0]['timed_agg'];
    self.TIMEDAGGR = Object.keys(self.TIMEDAGGR);

    var l = self.TIMEDAGGR[0],
        h = self.TIMEDAGGR[self.TIMEDAGGR.length - 1];


    var secondsL = new Date(l).getTime(),
        secondsH = new Date(h).getTime();

    self.dates = [];
    self.dates.push(new Date(l).getTime());
    while (secondsL < secondsH) {
      secondsL += 60*60*24*1000;
      self.dates.push( new Date(secondsL).getTime() );
    }

    /* Uses Class :: unit
    * Constructor(Number id, String name, Number overallScore)
    */
    self.units = [];

    if (data['parent_survey']['meta']['unit_name'] == "Parent Survey"){
      data.units.forEach(function(u, idx){
        // var tempUnit = new unit(idx+1, u['meta'].unit_name, u['responses'][1].avg_rating);
        var tempUnit = new unit(u['meta'].id, u['meta'].unit_name,u['responses'][0].avg_rating);
        tempUnit.setFeaturesData(u['responses'][1].avg_rating);
        tempUnit.setCityName(u['meta'].unit_name);

        self.units.push(tempUnit);
      });
    }
  }

  app.prototype.getTheMonthName = function(index){

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    return months[index % months.length];
  }

  app.prototype.setSentimentsObjectData = function(sentiments){
    var self = this;
    self.sentiments=[];
    function ucfirst(name) {
    //return field.value.substr(0, 1).toUpperCase() + field.value.substr(1);
    name = name.toUpperCase().charAt(0) + name.substring(1)
    return name;
    }
    //this.sentiments = sentiments;
    var countData = [],
        questionOptions = [],
        barColorsForAllBars = {
          'negative': '#FB6577',
          'positive': '#A2EB52',
          'neutral': '#DDDDDD'
        },
        graphData={};
    // var positiveKeyWords = [],
    //     negativeKeywords = [],
    //     neutralKeywords = [];
  var sent_array = ["Negative", "Neutral", "Positive"];

        for (var vendor in sentiments) {
          countData = [];
          questionOptions = [];
          reviews = [];
          // positiveKeyWords = [];
          // negativeKeywords = [];
          // neutralKeywords = [];
          KeyWords = [];
          sumOfData = 0;
          var index_sent = 0;
          for(var prop in sentiments[vendor]){

              if (sentiments[vendor].hasOwnProperty(prop)) {
                  // if (prop == 'Negative') {
                  //   questionOptions.push("Negative :" + sentiments[vendor][prop]);
                  //   countData.push([sentiments[vendor][prop]]);
                  //   sumOfData += parseInt([sentiments[vendor][prop]]);
                  // }
                  // else if (prop == 'Positive') {
                  //   questionOptions.push("Positive :" + sentiments[vendor][prop]);
                  //   countData.push([sentiments[vendor][prop]]);
                  //   sumOfData += parseInt([sentiments[vendor][prop]]);
                  // }
                  // else if (prop == 'Neutral') {
                  //   questionOptions.push("Neutral :" + sentiments[vendor][prop]);
                  //   countData.push([sentiments[vendor][prop]]);
                  //   sumOfData += parseInt([sentiments[vendor][prop]]);
                  // }
                  if (prop == 'options_count'){
                    for (var key in sentiments[vendor]['options_count']) {
                      if (sentiments[vendor]['options_count'].hasOwnProperty(key)) {
                        reviews.push([key,sentiments[vendor]['options_count'][key]]);
                      }
                    }
                  }
                  else if (prop == 'sentiment_segg'){
                      for (var key in sentiments[vendor]['sentiment_segg']) {
                        KeyWords.push(key);
                        // if (sentiments[vendor]['sentiment_segg'].hasOwnProperty(key)) {

                        //     if (sentiments[vendor]['sentiment_segg'][key] == 'negative') {
                        //       negativeKeywords.push(key);
                        //     }

                        //     else if (sentiments[vendor]['sentiment_segg'][key] == 'positive') {
                        //       positiveKeyWords.push(key);
                        //     }

                        //     else if (sentiments[vendor]['sentiment_segg'][key] == 'neutral') {
                        //       neutralKeywords.push(key);
                        //     }
                        // }
                      }
                  }


              }
          }

          for (index_sent = 0; index_sent < sent_array.length; index_sent++ ){
              questionOptions.push(sent_array[index_sent] +" :" + sentiments[vendor][sent_array[index_sent]]);
              countData.push([sentiments[vendor][sent_array[index_sent]]]);
              sumOfData += parseInt([sentiments[vendor][sent_array[index_sent]]]);
          }


          graphData={
              label: vendor,
              data: countData,
              sumOfData : sumOfData,
              reviews : reviews,
              KeyWords: KeyWords,
              options: questionOptions,
              series: ['Negative', 'Neutral', 'Positive'],
              graphOptions: {
                  barShowStroke : false,
                  showScale: false,
                  barDatasetSpacing : 10
              },
              colors: [
                       {'fillColor': barColorsForAllBars['negative']},
                       {'fillColor': barColorsForAllBars['neutral']},
                       {'fillColor': barColorsForAllBars['positive']}
                      ]
          };
          console.log(countData);
          this.sentimentsObject.push(graphData);
        }
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

  app.prototype.setTotalRespondents = function(totalresp){
    var self = this;
    self.totalRespondents = totalresp;
  }

  app.prototype.setUnitName = function(unit_Name){
    var self = this;
    self.unitName = unit_Name;
  }

  app.prototype.setUnitId = function(unit_id){
    var self = this;
    self.unitId = unit_id;
  }

  // app.prototype.setUnitCity = function(unitname){
  //   var self = this;
  //   self.unitCity = '';

  //   t = unitname;
  //   words = t.split(' ');
  //   num_of_words = t.split(' ').length
  //   num_of_chars = t.split('').length
  //   words_fit = [];
  //   words_dont_fit = [];

  //   if (num_of_chars > 18) {
  //     if (num_of_words > 2) {
  //       var num_of_chars_fit = 0;

  //       for (var i = 0; i < num_of_words; i++){
  //         num_of_chars_fit += words[i].split('').length;
  //         if (num_of_chars_fit < 18){
  //           words_fit.append(words[i]);
  //         }
  //         else {
  //           words_dont_fit.append(words[i]);
  //         }
  //       }

  //       self.unitName = words_fit.join(' ');
  //       self.unitCity = words_dont_fit.join(' ');
  //     }
  //   }


  //   // self.unitId = unit_id;
  // }

  app.prototype.setCompanyName = function(company_Name){
    var self = this;
    self.companyName = company_Name;
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

  app.prototype.setUnifiedRating = function(uni_score){
    var self = this;
    self.unifiedRating = uni_score;
  }  

  //Testing Functions
  app.RandomizeTheData = function(array, keyName){
    array.forEach(function(point){

      point[keyName] = parseInt(point[keyName] * Math.random());

    });
  }

  window.myapp = app;


})(window);
