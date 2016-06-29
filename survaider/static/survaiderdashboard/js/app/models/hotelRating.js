(function(window){
    var wndAnchorLinks;
    function hotelRating(id, name, data, labels, series, anchorLinks){
        this.id = id;
        this.name = name;
        this.data = data;
        this.labels = labels;
        this.series = series;
        wndAnchorLinks = anchorLinks;

        // Defaults for graph options
        this.graphOptions = {
            barShowStroke : true,
            showScale: true,
            barDatasetSpacing : 10,
        },
        this.colors = ['#B8E986', '#92C4FF', '#B86DF9', '#F4596C', '#F7CC85'];
        this.clickHandler = function (points, evt) {
            var selectedAnchorLink;
            for (var item in wndAnchorLinks) {
                if (wndAnchorLinks[item].key === points[0].label) {
                    selectedAnchorLink = wndAnchorLinks[item].value;
                }
            }
            console.log(selectedAnchorLink);
    
            if (selectedAnchorLink === '') {
                return;
            }
    
            var unitLink = '/survey/s:' + selectedAnchorLink + '/analysis';
            window.location.href = unitLink;
        };
  }

  window.hotelRating = hotelRating;

})(window);