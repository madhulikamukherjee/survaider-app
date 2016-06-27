(function(window){
  function feature(id, label, score){
    this.id = id;
    this.label = label;
    this.score = score;
    this.colors = [];
    // Defaults for graph options
    this.graphOptions = {
        barShowStroke : false,
        showScale: true,
        barDatasetSpacing : 10
    },
    this.series = ['A', 'B', 'C', 'D', 'E'];
    this.data = [[1.2],[4.4],[1.1], [2.22], [1.23]];
  }

  window.feature = feature;

})(window);