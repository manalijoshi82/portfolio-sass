$(document).ready(function(){
  
  var allQuotes = ["Either you run the day or the day runs you. --- Jim Rohn", "Life is 10% what happens to you and 90% how you react to it. --- Charles R. Swindoll", "The secret of getting ahead is getting started. --- Mark Twain", "If you can dream it, you can do it. --- Walt Disney", "Problems are not stop signs, they are guidelines. ---  Robert H. Schuller", "Knowing is not enough; we must apply. Willing is not enough; we must do. --- Johann Wolfgang von Goethe" ];

  function getRandomQuote(){
    return Math.floor(Math.random() * allQuotes.length);
  }

  $(".newQuoteButton").click(function(){
    $("#box").text(allQuotes[getRandomQuote()]);
    $("body").css('background-color', colors[Math.floor(Math.random() * colors.length)]);
  })

  $(".tweet").click(function() {
    var text = $("#box").text();
    var toTweet = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
    window.open(toTweet);
  });
 

 var colors = ['#ffefdb', '#909eb4', '#2dd4ca', '#ccccff', '#e6e6ff', '#e7bda2'];
  
  
})// end of doc ready