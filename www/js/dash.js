jQuery.noConflict();
$(document).ready(function() {	

			alert(1);		
			$(".dj").hide();
			$("#q1").show();
			$("#q2").hide();
			$("#q3").hide();
			$("#result").hide();

	$("#q1>input").change(function(){
		alert(1)
		$("#q1").hide();
		$("#q2").show();
	});
	$("#q2>input").change(function(){
		$("#q2").hide();
		$("#q3").show();
	});
	$("#q3>input").change(function(){
		$("#q3").hide();
		$("#result").show();
	});
});