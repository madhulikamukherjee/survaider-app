function ShortTextQuestion(label, required, cid, field_type, next){
  Question.call(this, label, required, cid, field_type, next);
  this.response = "";
  this.minimumResponseLength = 10;
}


ShortTextQuestion.prototype = Object.create(Question.prototype);
ShortTextQuestion.prototype.constructor = ShortTextQuestion;

ShortTextQuestion.prototype.change = function(){
  console.log(this);
  this.checkIfCompleted();
}


ShortTextQuestion.prototype.checkIfCompleted = function(){

  if (this.response.length >= this.minimumResponseLength) {
    this.completed();
    return true;
  }
  else{
    this.incomplete();
    return false;
  }

}

ShortTextQuestion.prototype.resetResponse = function(){

  this.response = "";

}



ShortTextQuestion.prototype.generateResponse = function(){
  return {
    id: this.id,
    type: this.type,
    response: this.response
  }
}
