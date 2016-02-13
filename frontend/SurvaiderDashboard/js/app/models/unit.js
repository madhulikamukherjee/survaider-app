(function(window){

  function unit(id, name, overallScore){
    this.id = id;
    this.name = name;
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

  window.unit = unit;

})(window);
