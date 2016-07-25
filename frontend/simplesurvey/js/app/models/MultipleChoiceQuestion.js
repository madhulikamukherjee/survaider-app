function MultipleChoiceQuestion(label, required, cid, field_type, next, description){
  Question.call(this, label, required, cid, field_type, next, description);
  this.choices = [];
  this.minimumNumberOfChoicesToBeChecked = 1;
}

function Choice(label, image, isChecked){
  this.label = label;
  this.image = image;
  this.checked = false;
}

MultipleChoiceQuestion.prototype = Object.create(Question.prototype);
MultipleChoiceQuestion.prototype.constructor = MultipleChoiceQuestion;

MultipleChoiceQuestion.prototype.insertChoice = function(choice){
  if (choice.img) {
    this.choices.push(new Choice(choice.label, choice.img, choice.checked));
  }
  else{
    this.choices.push(new Choice(choice.label, null, choice.checked));
  }
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
    q_id: this.id,
    q_res: "",
    q_unit_id : null,
    q_res_plain : ""
  }

  var temp = [],
      delimeter = '###';
  var temp2 = [];

  for (var i = 0; i < this.choices.length; i++) {
    if (this.choices[i].checked) {
      temp.push('a_' + (i + 1));
      temp2.push(this.choices[i].label);
    }
  }


  response.q_res = temp.join(delimeter).toLocaleString();
  response.q_res_plain = temp2.join(delimeter).toLocaleString();

  return response;
}
