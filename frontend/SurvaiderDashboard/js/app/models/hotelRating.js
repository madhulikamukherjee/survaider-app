(function(window){
  function hotelRating(id, name, data, labels, series){
    this.id = id;
    this.name = name;
    this.data = data;
    this.labels = labels;
    this.series = series;

    // Defaults for graph options
    this.graphOptions = {
        barShowStroke : true,
        showScale: true,
        barDatasetSpacing : 10
    },
    this.colors = ['#B8E986', '#92C4FF', '#B86DF9', '#F4596C', '#F7CC85'];
  }

  window.hotelRating = hotelRating;

})(window);