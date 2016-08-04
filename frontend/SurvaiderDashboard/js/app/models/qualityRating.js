(function(window){
  function qualityRating(data, labels){
    // this.data = [
    //     [65, 59, 80, 81, 56, 55, 40]
    //   ];
    this.data = data;
    this.labels = labels;

   // No need to change below option as only 1 series is available
    this.series = ['Series A'];
    this.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    this.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
    };
  }

  window.qualityRating = qualityRating;
})(window); 