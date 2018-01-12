function wikiResults(results) {
  for (var i in results.query.pages){  
        $(".searchLog").append('<a href="https://en.wikipedia.org/wiki/' + encodeURIComponent(results.query.pages[i].title) + '" target="_blank"><div class="searchResult"><h3>'+ results.query.pages[i].title + '</h3><p>' + results.query.pages[i].extract + '</p></div></a>');      
  }
  $(".searchLog").fadeIn('slow');
}

$(document).ready(function(){
  $(".searchLog").hide();
  $("input[type='search']").keypress(function(e) {
    
    if(e.which === 13) {
      
      var searchTerm = $('input[type="search"]').val();
      
      var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchTerm;
      
       $.ajax({
          dataType : "jsonp",
          url: url,
          jsonpCallback: "wikiResults"
       });
      e.preventDefault();
      $("form")[0].reset();
      $(".searchLog").empty();
      $(".searchLog").hide();
    }
  });
});