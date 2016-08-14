function YesNoQuestion(label, required, cid, field_type, next, description){
  Question.call(this, label, required, cid, field_type, next, description);
  this.response = "";
  this.options = [];
}

function Option(label, image, isChecked){
  this.label = label;
  this.image = image;
  this.checked = isChecked;
}

YesNoQuestion.prototype = Object.create(Question.prototype);
YesNoQuestion.prototype.constructor = YesNoQuestion;

YesNoQuestion.prototype.insertOption = function(option){
  if (option.img) {
    this.options.push(new Option(option.label, option.img, option.checked));
  }
  else{
    this.options.push(new Option(option.label, null, option.checked));
  }
};

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
  return {
    q_id: this.id,
    q_res: 'a_' + this.response,
    q_res_plain: this.options[this.response-1].label
  }
}
