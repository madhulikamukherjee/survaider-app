function YesNoQuestion(label, required, cid, field_type, next){
  Question.call(this, label, required, cid, field_type, next);
  this.response = "";
}

YesNoQuestion.prototype = Object.create(Question.prototype);
YesNoQuestion.prototype.constructor = YesNoQuestion;

YesNoQuestion.prototype.change = function(){
  console.log(this);
  this.completed();
}


YesNoQuestion.prototype.checkIfCompleted = function(){

  if (this.response.length >= 1) {
    this.completed();
    return true;
  }
  else{
    this.incomplete();
    return false;
  }

}

YesNoQuestion.prototype.resetResponse = function(){

  this.response = "";

}


YesNoQuestion.prototype.generateResponse = function(){
  var temp = this.response;
  var response = {
    id: this.id,
    type: this.type,
    response: ""
  };
  response.response = "a_" + temp;
  return response;
}
