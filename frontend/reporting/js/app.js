var myApp= angular.module("ReportApp",["chart.js"]);
myApp.controller("ReportController",["$http","$scope","$location","ChartJs","$timeout",function($http,$scope,$location,ChartJs,$timeout){

    //ToDO
    //Change Panel for Non Graphical Report
    //

   $scope.toggle=function toggle(){

   
   if ($scope.type=="Bar") {
    $scope.toggleText="Bar";
    $scope.type="Pie";
    $scope.data= $scope.data[0];

   }
   else if ($scope.type=="Pie") {
    $scope.toggleText="Pie";
    $scope.type="Bar"
    $scope.data=[$scope.data];

   };
   ;
}
  // Helper function 2
    function cot (arr) {
       var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
   
    return [a, b];

    }//func2

    //SID
    var s_id = $location.absUrl().split("/")[4].split(":")[1];
    //URLS
    var survey_str= "/api/survey/"+s_id+"/deepjson";
    var json_resp= "/api/survey/"+s_id+"/response/aggregate";
    //Get Survey Json //Bad Way
    $http.get(survey_str).success(function(struct){
            $http.get(json_resp).success(function(resp){
                //Now I have access to Survey Structure (struct) and Survey Response
                $scope.stitle= struct.game_title; //Set Survey Title
                $scope.question_list= resp.columns.slice(2);//Get question List
                $scope.total_question= $scope.question_list.length;
                
                
                $scope.typed="Text";
                $scope.counter= 0;
                // Destroy Chat
                 $scope.$on('create', function (event, chart) {
                            
                           $scope.chartid= chart.id;
                          
                                })
                
             
                $scope.total_r= resp.len;
                        $scope.survey_id= resp.survey_id;
                        $scope.q_total= resp.columns.length-2;
                //We need to put up an init code here :(
                    //So that the user doesn't sees an empty page.
                    //
                    $scope.cid =$scope.question_list[0];
                        //Get Question Label !!c <3 Lol is Life.
                        for (var i = 0; i < resp.questions.length; i++) {
                            if (resp.questions[i][0]==$scope.cid) {
                                $scope.question_label= resp.questions[i][1];
                            };
                        };
                        // Get Question Type and Options List.
                        for (var i = 0; i < struct.fields.length; i++) {
                            if (struct.fields[i].cid==$scope.cid) {
                                $scope.question_type = struct.fields[i].field_type;
                                $scope.question_options= struct.fields[i].field_options[1];
                            };
                        };
                
                        //Get total responses for that question
                        var responses_for_a_cid= [];
                        var index= resp.columns.indexOf($scope.cid);
                        for (var i = 0; i < resp.rows.length; i++) {
                            var response= resp.rows[i][index];
                            responses_for_a_cid.push(response);
                        };
                        // console.log(cot(["a","a","b","b"])); //Why wrong values? No idea. ==Solved --> missed sorting
                        //If an option has no values. then add 0 as its default value otherwise Graph will not initialize. Bleh!
                        var count = cot(responses_for_a_cid); //an array of two array [[options],[count]] // Remove null from here,
                
                        var count_options = count[0];//Should have used the same variable .. ??? SHould learn DRY
                        var count_options_total= count[1];
                        function option_map(){
                            var a={};
                            for (var i = 1; i < $scope.question_options.length+1; i++) {
                                // a.push("a_"+i.toString());
                                a["a_"+i.toString()]=$scope.question_options[i-1];
                                //{"a_1":"option"}
                            };
                            return a;

                        };
                        try{
                        var options_map= option_map(); //Useful for getting labels
                    }
                    catch(err){ console.log ("Error_option_map");}
                        //Some graph variables

                        var type , series;
                        $scope.option_extra= "";
                        //Now Set the Graph
                         if ($scope.question_type=="short_text" || $scope.question_type=="long_text") {
                            // clean();
                          
                            $scope.cond=false;
                            $scope.option= "Response";
                            //write a function to get responses.
                         
                            $scope.text= "Coming Soon ......";
                            $scope.toggleText="Load More";

                         }
                        
                         else if ($scope.question_type=="multiple_choice"){
                            $scope.text= "";
                            $scope.cond=true;
                            $scope.type="Pie";
                            $scope.toggleText="Bar";

                            var label=[];
                            for (var i = 0; i < count_options.length; i++) {

                                var single_option= count_options[i].split("###");
                            
                                var to_push= "";
                                for (var j = 0; j < single_option.length; j++) {
                                    to_push += " "+ options_map[single_option[j]];
                                 };
                                
                                 label.push(to_push);

                            };
                            
                            
                            $timeout(function() {
                                            $scope.data=count_options_total;
                                            $scope.labels=label;
                                        },100);

                         }
                         else if ($scope.question_type=="ranking"){
                            $scope.text="";
                            $scope.cond=true;
                            $scope.type="Line";
                            $scope.toggleText="Toggle Not Allowed";
                            //Logic ... 1st Rank 3 Points . 2nd 2 points
                            //get option_list
                            //get raw_responses, then split , and se
                            var ranked={};
                            for (var i = 0; i < raw_responses.length; i++) {
                                var split= raw_responses[i].split("##")
                                for (var j = split.length; j =0; j--) {
                                    //check if key exists
                                    if (split[i] in ranked) {
                                        var oldVal= ranked.split[i];
                                      }
                                      else{
                                        var oldVal=0;
                                      };

                                        //Add new value []
                                        var newVal= oldVal +j;
                                        ranked[split[i]]= newVal;


                                  

                                };
                                

                            };
                            //We now have a value array where key is the option and value is the weight
                            var data= [];
                            var label=[];
                            for (var key in ranked){
                                data.push(ranked[key]);
                                label.push(option_map.ranked[key]);
                            };
                            $scope.data = data;
                            $scope.labels= label;

                         }
                         else if ($scope.question_type=="rating"){
                            $scope.text="";
                            $scope.type="Pie";
                             $scope.cond=true;
                             $scope.toggleText="Bar";
                             $scope.option= "Rated";
                             $scope.option_extra= "star";
                            

                            //Create a range of data for this type 1-4,5-7,8-10
                            //get raw_data
                            var a =0,b=0,c=0;
                            for (var i = 0; i < responses_for_a_cid.length; i++) {
                                var value = parseInt(responses_for_a_cid[i]);
                                if (value<5) {a+=1;} else if (value>4 && value <8) {b+=1;} else if(value>7){c+=1;};
                            };


                                
                                

                            
                            
                             $timeout(function() {
                                            $scope.labels =["Below 5", "Between 5 and 7", "Above 7"];
                                            $scope.data= [a,b,c];
                                        },100);
                         }
                         else if ($scope.question_type=="yes_no" || $scope.question_type=="single_choice"){
                         $scope.text=""; //Remove the text thing.
                          $scope.cond=true;
                         $scope.type="Bar";
                         $scope.toggleText="Pie";
                         
                         var labels=[];
                        
                                for (var i = 0; i < count_options.length; i++) {
                                    labels.push(options_map[count_options[i]]);

                            
                                };
                                
                                $timeout(function() {
                                            $scope.data=[count_options_total];
                                            $scope.labels=labels;
                                        },100);
                                
                         };

                        
                    // Get the  options along with there option  here 
                    var response_map= {};
                    for (var i = 0; i < count_options.length; i++) {
                        if ($scope.question_type=="short_text" || $scope.question_type=="long_text" || $scope.question_type=="rating") {
                            response_map[count_options[i]]= count_options_total[i];
                        }
                            
                        else if ($scope.question_type=="yes_no" || $scope.question_type=="single_choice") {
                            response_map[options_map[count_options[i]]]=count_options_total[i];
                        }
                        else if ($scope.question_type=="multiple_choice"){
                            var splitr= count_options[i].split("###");
                            console.log(count_options[i]);
                            var readable_option= "";
                            for (var j = 0; j < splitr.length; j++) {
                              readable_option+= " "+ options_map[splitr[j]];  

                            };
                            response_map[readable_option]= count_options_total[i];
                            // console.log(response_map);
                        
                        } ;
                        // 
                    };

                    $scope.rep= response_map;
                  

                    $scope.cid= $scope.question_list[0];
                //Navigation Button Control
                $scope.navigate= function(type){
                                                
                  
                        if (type=="next") {$scope.counter+=1;}
                        else if (type=="prev") {$scope.counter-=1;};
                        //get cid
                        $scope.cid =$scope.question_list[$scope.counter];
                        // $scope.question_label_raw= resp.questions;
                        //Get Question Label !!c <3 Lol is Life.
                        for (var i = 0; i < resp.questions.length; i++) {
                            if (resp.questions[i][0]==$scope.cid) {
                                $scope.question_label= resp.questions[i][1];
                            };
                        };
                        // Get Question Type and Options List.
                        for (var i = 0; i < struct.fields.length; i++) {
                            if (struct.fields[i].cid==$scope.cid) {
                                $scope.question_type = struct.fields[i].field_type;
                                $scope.question_options= struct.fields[i].field_options[1];

                            };
                        };
                
                        //Get total responses for that question
                        var responses_for_a_cid= [];
                        var index= resp.columns.indexOf($scope.cid);
                        for (var i = 0; i < resp.rows.length; i++) {
                            var response= resp.rows[i][index];
                            responses_for_a_cid.push(response);
                        };
                        // console.log(cot(["a","a","b","b"])); //Why wrong values? No idea. ==Solved --> missed sorting
                        //If an option has no values. then add 0 as its default value otherwise Graph will not initialize. Bleh!
                        var count = cot(responses_for_a_cid); //an array of two array [[options],[count]] // Remove null from here,
                
                        var count_options = count[0];//Should have used the same variable .. ??? SHould learn DRY
                        var count_options_total= count[1];
                        function option_map(){
                            var a={};
                            for (var i = 1; i < $scope.question_options.length+1; i++) {
                                // a.push("a_"+i.toString());
                                a["a_"+i.toString()]=$scope.question_options[i-1];
                                //{"a_1":"option"}
                            };
                            return a;

                        };
                        try{
                        var options_map= option_map(); //Useful for getting labels
                    }
                    catch(err){ console.log ("Error_option_map");}
                    
                        
                        //check if all options are counted
                        //Big mistake count[0]==[a_1, a_2] but question_options = [text ,] ==Solved!
                    
                        // if (count[0].length!= $scope.question_options.length) {
                        //  //This means some options have not been counted,
                        //  //Find out which options have not been counted.

                        //  console.log(count[0],count[0].length, $scope.question_options.length);
                        //  var notcounted = $scope.question_options.filter(function(val) {
                                    //            return count[0].indexOf(val) == -1;
                                    //          });

                        //  //Not count is an array of options not been responded by any user.
                        //  for (var i = 0; i < notcounted.length; i++) {
                        //      count_options.push(notcounted[i]);
                        //      count_options_total.push(0);
                        //  };
                        //  console.log("No Error");
                            
                        // }

                        //Some graph variables

                        var type , series;
                        $scope.option_extra= "";
                        //Now Set the Graph
                         if ($scope.question_type=="short_text" || $scope.question_type=="long_text") {
                            // clean();
                          
                            $scope.cond=false;
                            $scope.option= "Response";
                            //write a function to get responses.
                         
                            $scope.text= "Coming Soon ......";
                            $scope.toggleText="Load More";

                         }
                        
                         else if ($scope.question_type=="multiple_choice"){
                            $scope.text= "";
                            $scope.cond=true;
                            $scope.type="Pie";
                            $scope.toggleText="Bar";

                            var label=[];
                            for (var i = 0; i < count_options.length; i++) {

                                var single_option= count_options[i].split("###");
                            
                                var to_push= "";
                                for (var j = 0; j < single_option.length; j++) {
                                    to_push += " "+ options_map[single_option[j]];
                                 };
                                
                                 label.push(to_push);

                            };
                            
                            
                            $timeout(function() {
                                            $scope.data=count_options_total;
                                            $scope.labels=label;
                                        },100);

                         }
                         else if ($scope.question_type=="ranking"){
<<<<<<< HEAD
                            // alert("jj");
=======
>>>>>>> parent of 9a7f10a... Fixed labels in reporting page
                            $scope.text="";
                            $scope.cond=true;
                            $scope.type="Line";
                            $scope.toggleText="Toggle Not Allowed";
                            //Logic ... 1st Rank 3 Points . 2nd 2 points
                            //get option_list
                            //get raw_responses, then split , and se
                            var ranked={};
                            for (var i = 0; i < raw_responses.length; i++) {
                                var split= raw_responses[i].split("##")
                                for (var j = split.length; j =0; j--) {
                                    //check if key exists
                                    if (split[i] in ranked) {
                                        var oldVal= ranked.split[i];
                                      }
                                      else{
                                        var oldVal=0;
                                      };

                                        //Add new value []
                                        var newVal= oldVal +j;
                                        ranked[split[i]]= newVal;


                                  

                                };
                                

                            };
                            //We now have a value array where key is the option and value is the weight
                            var data= [];
                            var label=[];
                            for (var key in ranked){
                                data.push(ranked[key]);
                                label.push(option_map.ranked[key]);
                            };
                            $scope.data = data;
                            $scope.labels= label;

                         }
                         else if ($scope.question_type=="rating"){
                            $scope.text="";
                            $scope.type="Pie";
                             $scope.cond=true;
                             $scope.toggleText="Bar";
                             $scope.option= "Rated";
                             $scope.option_extra= "star";
                            

                            //Create a range of data for this type 1-4,5-7,8-10
                            //get raw_data
                            var a =0,b=0,c=0;
                            for (var i = 0; i < responses_for_a_cid.length; i++) {
                                var value = parseInt(responses_for_a_cid[i]);
                                if (value<5) {a+=1;} else if (value>4 && value <8) {b+=1;} else if(value>7){c+=1;};
                            };


                                
                                

                            
                            
                             $timeout(function() {
                                            $scope.labels =["Below 5", "Between 5 and 7", "Above 7"];
                                            $scope.data= [a,b,c];
                                        },100);
                         }
                         else if ($scope.question_type=="yes_no" ){
                         $scope.text=""; //Remove the text thing.
                          $scope.cond=true;
                         $scope.type="Bar";
                         $scope.toggleText="Pie";
                         
                         var labels=[];
                        
                                for (var i = 0; i < count_options.length; i++) {
                                    labels.push(options_map["a_"+count_options[i]]);

                            
                                };
                                
                                $timeout(function() {
                                            $scope.data=[count_options_total];
                                            $scope.labels=labels;
                                        },100);
                                
                         }
                           else if ($scope.question_type=="single_choice"){
                         $scope.text=""; //Remove the text thing.
                          $scope.cond=true;
                         $scope.type="Bar";
                         $scope.toggleText="Pie";
                         
                         var labels=[];
                        
                                for (var i = 0; i < count_options.length; i++) {
                                    labels.push(options_map[count_options[i]]);

                            
                                };
                                
                                $timeout(function() {
                                            $scope.data=[count_options_total];
                                            $scope.labels=labels;
                                        },100);
                                
                         }
                         ;


                        
                    // Get the  options along with there option  here 
                    var response_map= {};
                   
                    for (var i = 0; i < count_options.length; i++) {
                        if ($scope.question_type=="short_text" || $scope.question_type=="long_text" || $scope.question_type=="rating") {
                           
                            response_map[count_options[i]]= count_options_total[i];
                        }
                            
                        else if ($scope.question_type=="yes_no" || $scope.question_type=="single_choice") {
                           
                            response_map[options_map["a_"+count_options[i]]]=count_options_total[i];//Workaround for option without a_* format
                        }
                        else if ($scope.question_type=="multiple_choice"){
                            var splitr= count_options[i].split("###");
                        
                            var readable_option= "";
                            for (var j = 0; j < splitr.length; j++) {
                             readable_option+= "| "+ options_map[splitr[j]];  

                            };
                            response_map[readable_option]= count_options_total[i];
                            // console.log(response_map);
                        
                        } ;
                        // 
                    };

                    $scope.rep= response_map;
                  
                    };//navigate ends here!


            });
            
    });

}]);
