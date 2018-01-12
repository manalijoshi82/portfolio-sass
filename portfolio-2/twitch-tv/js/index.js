  var twitchStreamers = ["ESL_SC2", "OgamingSC2", "cretetion", "FreeCodeCamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  

  function twitchResults(streamType){
     
        $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamType , function(data){
          
          if(data.stream === null){
            
              $("#fccStatus").html("Free Code Camp is offline");
            
              $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + streamType , function(data2){
                $(".streamers").append('<div class="streamer"> <img src="'+ data2.logo +'"/> <a target="_blank" href="' + data2.url + '"><div class="name">'+ data2.display_name + '</div></a>' + '<span>' + "offline" + '</span></div>');
               });
            
          } else { 
            $("#fccStatus").html("Free Code Camp is online");
            console.log(data);
           
            $(".streamers").append( '<div class="streamer"> <img src="'+ data.stream.channel.logo +'"/> <a target="_blank" href="' + data.stream.channel.url + '"><div class="name">'+ data.stream.channel.display_name + '</div></a>' + '<p class="game">' + data.stream.channel.game + ' </p> <p class="status">' + data.stream.channel.status + '</p></div>' );
            
          }          
        });
    };

/*
const streamers = twitchStreamers.map(function(streamer){
  twitchResults(streamer);
}); */

twitchStreamers.map(streamer => twitchResults(streamer));




   
   








/*var twitchStreamers = ["ESL_SC2", "OgamingSC2", "cretetion", "FreeCodeCamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function twitchResults(streamType){
  $.ajax({
    url: "https://wind-bow.gomix.me/twitch-api/streams/" + streamType,
    data: {
         format: "json"
     },
     success: function (data) {
       //if(data.stream == null){
        
       //}
         //$(".streamers").append(data._links);
         
     }
  }); 
}

 
 

/*
for(var i = 0; i < twitchStreamers.length; i++){
    console.log(twitchResults(i));
    //if(twitchResults(i).stream == null){
      //console.log(twitchResults(i).stream);
    }
}*/