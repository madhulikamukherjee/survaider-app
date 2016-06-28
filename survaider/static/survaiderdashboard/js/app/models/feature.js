(function(window){

  function feature(id, label, score){
    this.id = id;
    this.label = label;
    this.score = score;
  }

  window.feature = feature;

})(window);
