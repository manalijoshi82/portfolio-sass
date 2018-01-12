//searchbar handler

$(function() {
  var searchField = $("#query");
  var icon = $('#search-btn');

  //focus handler

  $(searchField).on('focus', function() {
    $(this).animate({
      width: '100%'
    }, 400);

    $(icon).animate({
      right: '10px'
    }, 400);
  })

  //Blur Event Handler

  $(searchField).on('blur', function() {
    if (searchField.val() == '') {
      $(searchField.animate({
        width: '45%'
      }, 400, function() {}));

      $(icon).animate({
        right: '360px'
      }, 400, function() {});
    }
  });

  $('#search-form').submit(function(e) {
    e.preventDefault();
  });
})


function search() {
  //clear results

  $('#results').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();

  //run GET request on API

  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyD-kPQyJEtooW6dAjCoZ457cNIMWLSgUmg'
    },
    function(data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      //log data
      console.log(data);


      getResults(data);
      var buttons = getButtons(prevPageToken, nextPageToken);

      //display buttons

      $('#buttons').append(buttons);
    }
  );
}


//next page function

function nextPage() {

  var token = $("#next-button").data('token');
  var q = $("#next-button").data('query');
  //clear results

  $('#results').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();

  //run GET request on API

  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyD-kPQyJEtooW6dAjCoZ457cNIMWLSgUmg'
    },
    function(data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      //log data
      console.log(data);

      getResults(data);
      var buttons = getButtons(prevPageToken, nextPageToken);

      //display buttons

      $('#buttons').append(buttons);
    }
  );
}




//prev page function

function prevPage() {

  var token = $("#prev-button").data('token');
  var q = $("#prev-button").data('query');
  //clear results

  $('#results').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();

  //run GET request on API

  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyD-kPQyJEtooW6dAjCoZ457cNIMWLSgUmg'
    },
    function(data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      //log data
      console.log(data);

      getResults(data);

      var buttons = getButtons(prevPageToken, nextPageToken);

      //display buttons

      $('#buttons').append(buttons);
    });
}

function getResults(data) {

  for (var i in data.items) {

    //display results

    $("#results").append('<li>' +
      '<div class="list-left">' +
      '<img src="' + data.items[i].snippet.thumbnails.high.url + '">' +
      '</div>' +
      '<div class="list-right">' +
      '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/' + data.items[i].id.videoId + '">' + data.items[i].snippet.title + '</a></h3>' +
      '<small>By <span class="title">' + data.items[i].snippet.channelTitle + ' </span> on ' + data.items[i].snippet.publishedAt + ' </small>' +
      '<p>' + data.items[i].snippet.description + '</p>' +
      '</div>' +
      '</li>' +
      '<div class="clearfix"></div>' +
      '');
  }
}



//build the buttons
function getButtons(prevPageToken, nextPageToken) {
  if (!prevPageToken) {
    var btnOutput = '<div class="button-container">' +
      '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
      'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnOutput = '<div class="button-container">' +
      '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
      'onclick="prevPage();">Previous Page</button>' +
      '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
      'onclick="nextPage();">Next Page</button></div>';
  }

  return btnOutput;
}
