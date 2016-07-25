function RatingQuestion(label, required, cid, field_type, next, description){
  Question.call(this, label, required, cid, field_type, next, description);
  this.response = 0;
}

RatingQuestion.prototype = Object.create(Question.prototype);
RatingQuestion.prototype.constructor = RatingQuestion;

RatingQuestion.prototype.change = function(){
  console.log(this);
  this.completed();
}


RatingQuestion.prototype.checkIfCompleted = function(){

  if (this.response > 0) {
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
    q_id: this.id,
    q_res: 'a_'+this.response,
    q_unit_id : null,
    q_res_plain : this.response
  }
}
