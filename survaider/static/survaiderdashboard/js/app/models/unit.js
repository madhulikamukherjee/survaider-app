(function(window){

  function unit(id, name, overallScore){
    this.id = id;
    this.name = name;
    this.city = 0;
    this.overallScore = overallScore;
    this.features = [];
    // this.questions = [];
    // this.ratingData = [];
  }

  unit.prototype.setTheOverallScore = function(){
    var total = 0;
    if (this.features.length > 0) {
      for (var i = 0; i < this.features.length; i++) {
        total += this.features[i].score;
      }

      maxScore = 10 * this.features.length;


      total = total / maxScore;
      total *= 1;
    }

    this.overallScore = total;
  }

  unit.prototype.setFeaturesData = function(featuresData){
    var self = this;
    var index = 0;

    for (var prop in featuresData) {
      if( featuresData.hasOwnProperty( prop ) ) {
        self.features.push({ id: (index+1), score: featuresData[prop] });
      }
    }

  }

  unit.prototype.setCityName = function(unitname){
    var self = this;
    self.city = 0;

    var t = unitname;
    var words = t.split(' ');
    var num_of_words = t.split(' ').length
    var num_of_chars = t.split('').length
    var words_fit = [];
    var words_dont_fit = [];

    if (num_of_chars > 18) {
      if (num_of_words > 2) {
        var num_of_chars_fit = 0;

        for (var i = 0; i < num_of_words; i++){
          num_of_chars_fit += words[i].split('').length;
          if (num_of_chars_fit < 18){
            words_fit.push(words[i]);
          }
          else {
            words_dont_fit.push(words[i]);
          }
        }

        self.name = words_fit.join(' ');
        self.city = words_dont_fit.join(' ');
      }
    }
  }

  window.unit = unit;

})(window);
