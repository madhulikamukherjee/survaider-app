function SingleChoiceQuestion(label, required, cid, field_type, next){
  Question.call(this, label, required, cid, field_type, next);
  this.response = "";
}

SingleChoiceQuestion.prototype = Object.create(Question.prototype);
SingleChoiceQuestion.prototype.constructor = SingleChoiceQuestion;

SingleChoiceQuestion.prototype.change = function(){
  console.log(this);
  this.completed();
};

SingleChoiceQuestion.prototype.setPointers = function(){



};


SingleChoiceQuestion.prototype.checkIfCompleted = function(){

  if (this.response.length >= 1) {
    this.completed();
    return true;
  }
  else{
    this.incomplete();
    return false;
  }

}

SingleChoiceQuestion.prototype.resetResponse = function(){

  this.response = "";

}


SingleChoiceQuestion.prototype.generateResponse = function(){
  return {
    id: this.id,
    type: this.type,
    response: this.response
  }
}
