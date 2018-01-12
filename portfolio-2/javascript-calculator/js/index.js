
$(document).ready(function(){
  $("#buttons .digit, #buttons .operator").click(function(){
    
    //get the value of the button when the button is clicked
    var btnVal = $(this).text();
   // append it to the outputbox
    $("#outputBox").append(btnVal);
  });
  
  $("#equal").click(function(){
    //get value from outputBox
    var calc = $('#outputBox').text();
    //evaluate it using JS built-in function eval
    var ans = eval(calc);
    //set the text to ans
    console.log(ans);
    $('#outputBox').text(ans);
  });
 
  $("#sign").click(function(){
    $("#outputBox").prepend("-");
      $('#sign').click(function(){
        $("#outputBox").find('-').remove();
      });
  });
  
  $("#backspace").click(function(){
    var calc = $("#outputBox").text();
    //remove the element from last index
    var shorten = calc.substr(0, calc.length-1);
    $('#outputBox').text(shorten);
  });
  // clear the outputBox
  $('#clear').click(function(){
    $('#outputBox').text("");
  });
});