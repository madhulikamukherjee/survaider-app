function MultipleChoiceQuestion(label, required, cid, field_type, next){
  Question.call(this, label, required, cid, field_type, next);
  this.choices = [];
  this.minimumNumberOfChoicesToBeChecked = 1;
}

function Choice(label, isChecked){
  this.label = label;
  this.checked = false;
}

MultipleChoiceQuestion.prototype = Object.create(Question.prototype);
MultipleChoiceQuestion.prototype.constructor = MultipleChoiceQuestion;

MultipleChoiceQuestion.prototype.insertChoice = function(label){
  this.choices.push(new Choice(label, false));
};

MultipleChoiceQuestion.prototype.change = function(){
  console.log(this);
  this.checkIfCompleted();
}


MultipleChoiceQuestion.prototype.checkIfCompleted = function(){

  var numberOfChoicesChecked = 0;

  for (var i = 0; i < this.choices.length; i++) {
    if (this.choices[i].checked) {
      numberOfChoicesChecked++;
    }
  }

  if (numberOfChoicesChecked >= this.minimumNumberOfChoicesToBeChecked) {
    this.completed();
    return true;
  }
  else{
    this.incomplete();
    return false;
  }

}

MultipleChoiceQuestion.prototype.resetResponse = function(){

  for (var i = 0; i < this.choices.length; i++) {
    this.choices[i].checked = false;
  }

}



MultipleChoiceQuestion.prototype.generateResponse = function(){
  var response = {
    id: this.id,
    type: this.type,
    response: ""
  }

  var temp = [],
      delimeter = '###';

  for (var i = 0; i < this.choices.length; i++) {
    if (this.choices[i].checked) {
      temp.push('a_' + (i + 1));
    }
  }


  response.response = temp.join(delimeter).toLocaleString();

  return response;
}
