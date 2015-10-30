function GroupRatingQuestion(label, required, cid, field_type, next){
  Question.call(this, label, required, cid, field_type, next);
  this.subparts = [];
}

function GroupRatingSubpart(label){
  this.label = label;
  this.rating = "";
}

GroupRatingQuestion.prototype = Object.create(Question.prototype);
GroupRatingQuestion.prototype.constructor = GroupRatingQuestion;

GroupRatingQuestion.prototype.insertSubpart = function(label){
  this.subparts.push(new GroupRatingSubpart(label, ''));
};

GroupRatingQuestion.prototype.change = function(index, rating){
  console.log(this);
  var isCompleted = this.checkIfCompleted();
  if (isCompleted) {
    this.completed();
    console.log("The question is completed");
  }
  else{
    this.inComplete();
  }
};

GroupRatingQuestion.prototype.resetResponse = function(){

  for (var i = 0; i < this.subparts.length; i++) {
    this.subparts[i].rating = "";
  }

}

GroupRatingQuestion.prototype.checkIfCompleted = function(){

  for (var i = 0; i < this.subparts.length; i++) {
    if( this.subparts[i].rating.length === 0 ){
      this.incomplete();
      return false;
    }
  }

  this.completed();
  return true;

}


GroupRatingQuestion.prototype.generateResponse = function(){
  var response = {
    id: this.id,
    type: this.type,
    subparts: []
  }

  this.subparts.forEach(function(subpart,index){
    response.subparts.push(subpart.rating);
  });

  return response;
}
