function Question(label, required, cid, field_type, next, description){
  this.label = label;
  this.type = field_type;
  this.isRequired = required;
  this.id = cid;
  this.isCompleted = false;
  this.isDiscovered = false;
  this.next = next;
  this.isDisabled = false;
  this.description = description;
}

Question.prototype.completed = function(){
  this.isCompleted = true;
  this.isDisabled = false;
}

Question.prototype.incomplete = function(){
  this.isCompleted = false;
}
