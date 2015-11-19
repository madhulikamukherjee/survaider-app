function LongTextQuestion(label, required, cid, field_type, next){
  Question.call(this, label, required, cid, field_type, next);
  this.response = "";
  this.minimumResponseLength = 1;
}

LongTextQuestion.prototype = Object.create(Question.prototype);
LongTextQuestion.prototype.constructor = LongTextQuestion;

LongTextQuestion.prototype.change = function(){
  console.log(this);
  this.checkIfCompleted();
}


LongTextQuestion.prototype.checkIfCompleted = function(){

  if (this.response.length >= this.minimumResponseLength) {
    this.completed();
    return true;
  }
  else{
    this.incomplete();
    return false;
  }

}

LongTextQuestion.prototype.resetResponse = function(){

  this.response = "";

}


LongTextQuestion.prototype.generateResponse = function(){
  return {
    q_id: this.id,
    q_res: this.response
  }
}
