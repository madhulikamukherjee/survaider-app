function SingleChoiceQuestion(label, required, cid, field_type, next, description){
  Question.call(this, label, required, cid, field_type, next, description);
  this.response = "";
  this.options = [];
}

function Option(label, image, isChecked){
  this.label = label;
  this.image = image;
  this.checked = isChecked;
}

SingleChoiceQuestion.prototype = Object.create(Question.prototype);
SingleChoiceQuestion.prototype.constructor = SingleChoiceQuestion;

SingleChoiceQuestion.prototype.insertOption = function(option){
  if (option.img) {
    this.options.push(new Option(option.label, option.img, option.checked));
  }
  else{
    this.options.push(new Option(option.label, null, option.checked));
  }
};

SingleChoiceQuestion.prototype.change = function(){
  console.log(this);
  this.completed();
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
  // console.log(this.options[this.response-1].label);
  return {
    q_id: this.id,
    q_res: 'a_' + this.response,
    q_res_plain: this.options[this.response-1].label
  }
}
