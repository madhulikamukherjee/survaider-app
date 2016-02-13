(function(window){

  function unit(id, name, overallScore){
    this.id = id;
    this.name = name;
    this.overallScore = 0;
    this.features = [];
    this.questions = [];
    this.ratingData = [];
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

  window.unit = unit;

})(window);
