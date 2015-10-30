function RatingQuestion(label, required, cid, field_type, next){
  Question.call(this, label, required, cid, field_type, next);
  this.response = "";
}

RatingQuestion.prototype = Object.create(Question.prototype);
RatingQuestion.prototype.constructor = RatingQuestion;

RatingQuestion.prototype.change = function(){
  console.log(this);
  this.completed();
}


RatingQuestion.prototype.checkIfCompleted = function(){

  if (this.response.length >= 1) {
    this.completed();
    return true;
  }
  else{
    this.incomplete();
    return false;
  }

}

RatingQuestion.prototype.resetResponse = function(){
  this.response = "";
}


RatingQuestion.prototype.generateResponse = function(){
  return {
    id: this.id,
    type: this.type,
    response: this.response
  }
}
