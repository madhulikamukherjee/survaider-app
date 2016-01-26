$( document ).ready(function() {
	$("#img_createsurvey").css("display","block");

    $("#createsurvey").mouseenter( function() {
    	$("#img_createsurvey").fadeIn("slow");
    	$("#img_addunits").css("display", "none");
    	$("#img_dashboards").css("display", "none");
    	$("#img_watchfeedback").css("display", "none");
    	$("#img_analytic").css("display", "none");
    });
    $("#addunits").mouseenter( function() {
    	$("#img_createsurvey").css("display", "none");
    	$("#img_addunits").fadeIn("slow");
    	$("#img_dashboards").css("display", "none");
    	$("#img_watchfeedback").css("display", "none");
    	$("#img_analytic").css("display", "none");
    });
    $("#dashboards").mouseenter( function() {
    	$("#img_createsurvey").css("display", "none");
    	$("#img_addunits").css("display", "none");
    	$("#img_dashboards").fadeIn("slow");
    	$("#img_watchfeedback").css("display", "none");
    	$("#img_analytic").css("display", "none");
    });
    $("#watchfeedback").mouseenter( function() {
    	$("#img_createsurvey").css("display", "none");
    	$("#img_addunits").css("display", "none");
    	$("#img_dashboards").css("display", "none");
    	$("#img_watchfeedback").fadeIn("slow");
    	$("#img_analytic").css("display", "none");
    });
    $("#analytic").mouseenter( function() {
    	$("#img_createsurvey").css("display", "none");
    	$("#img_addunits").css("display", "none");
    	$("#img_dashboards").css("display", "none");
    	$("#img_watchfeedback").css("display", "none");
    	$("#img_analytic").fadeIn("slow");
    });

    // $(".demobutton").mouseenter( function(){
    // 	$(this).css({"background-color":"#c2c2c2","border":"white","color":"white"});
    // });
    // $(".demobutton").mouseleave( function(){
    // 	$(this).css({"background-color":"transparent","border":"solid 2px","color":"white"});
    // });
});