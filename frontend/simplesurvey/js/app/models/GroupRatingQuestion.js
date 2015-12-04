function GroupRatingQuestion(label, required, cid, field_type, next, description){
  Question.call(this, label, required, cid, field_type, next, description);
  this.subparts = [];
}

function GroupRatingSubpart(label){
  this.label = label;
  this.rating = "";
}

GroupRatingQuestion.prototype = Object.create(Question.prototype);
GroupRatingQuestion.prototype.constructor = GroupRatingQuestion;

GroupRatingQuestion.prototype.insertSubpart = function(subpart){
  this.subparts.push(new GroupRatingSubpart(subpart.label, ''));
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
    q_id: this.id,
    q_res: []
  }


  var temp = [],
      delimeter1 = '##';
      delimeter2 = '###';

  for (var i = 0; i < this.subparts.length; i++) {
    temp.push('a_' + (i + 1) + delimeter1 + (this.subparts[i].rating));
  }


  response.q_res = temp.join(delimeter2).toLocaleString();

  return response;
}
