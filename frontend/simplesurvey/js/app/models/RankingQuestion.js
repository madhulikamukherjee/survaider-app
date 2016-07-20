function RankingQuestion(label, required, cid, field_type, next, description){
  Question.call(this, label, required, cid, field_type, next, description);
  this.subparts = [];
}

function RankingSubpart(label, rank){
  this.label = label;
  this.rank = rank;
}

RankingQuestion.prototype = Object.create(Question.prototype);
RankingQuestion.prototype.constructor = RankingQuestion;

RankingQuestion.prototype.insertSubpart = function(subpart, rank){
  this.subparts.push(new RankingSubpart(subpart.label, rank));
};

RankingQuestion.prototype.change = function(index, rank){
  console.log(this);
  var isCompleted = this.checkIfCompleted();
  if (isCompleted) {
    this.completed();
    console.log("The question is completed");
  }
  else{
    this.inComplete();
  }
};

RankingQuestion.prototype.checkIfCompleted = function(){

  this.completed();
  return true;

}

RankingQuestion.prototype.resetResponse = function(){

  for (var i = 0; i < this.subparts.length; i++) {
    this.subparts[i].rank = -1;
  }

}


RankingQuestion.prototype.generateResponse = function(){
  var response = {
    q_id: this.id,
    q_res: [],
    q_unit_id : null,
    q_res_plain : []
  }


  var temp = [],
  delimeter1 = '##';
  delimeter2 = '###';
  var temp2 = [];

  for (var i = 0; i < this.subparts.length; i++) {
    // temp.push('a_' + (i + 1) + delimeter1 + (this.subparts[i].rank+1));
    temp.push('a_' + (i + 1) + delimeter1 + (this.subparts[i].rank+1));
    temp2.push(this.subparts[i].label + delimeter1 + (this.subparts[i].rank+1));
  }


  response.q_res = temp.join(delimeter2).toLocaleString();
  response.q_res_plain = temp2.join(delimeter2).toLocaleString();

  return response;
}
