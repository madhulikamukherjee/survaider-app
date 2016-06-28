(function(window){
   function leaderboardEntry(name, score){
     this.name = name;
     this.score = score;
   }
 
   window.leaderboardEntry = leaderboardEntry;
 
 })(window);