$(document).ready(function(){
  $("#chargeMe").click(function(){
   
    for(var w = 1; w <= 192; w++){
     
      $(".innerRectangle").animate({
          backgroundColor: "#a5682a",
          width: w
       }, 10)
    }
    
  });
  
  $("#drainMe").click(function(){
    
    for(var d = 192; d >= 0; d--){
     
      $(".innerRectangle").animate({
          backgroundColor: "#a5682a",
          width: d
       }, 10)
    }
   
  });
});