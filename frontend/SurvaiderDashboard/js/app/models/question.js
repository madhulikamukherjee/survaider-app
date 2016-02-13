(function(window){

  function Question(id, title, type, response){

    this.id = id;
    this.title = title;
    this.type = type;
    this.response = response;

  }

  window.Question = Question;

})(window);
