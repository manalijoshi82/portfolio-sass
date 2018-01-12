$(document).ready(function(){
	var speed = 500;
	var autoswitch = true;
	var autoswitch_speed = 4000;

	//add initial active class

	$(".slide").first().addClass('active');

	//hide all slides

	$(".slide").hide();

	//show first slide
	$(".active").show();

	$("#next").click(function(){	
		nextSlide();
	})

	$("#prev").click(function(){	
		previousSlide();
	}) 

	if(autoswitch == true){
		setInterval(function(){
			nextSlide();
		}, autoswitch_speed);
	}

	//switch to next slide

	function nextSlide(){

		$(".active").removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':last-child')){
			$('.slide').first().addClass('active');
		} else {
			$('.oldActive').next().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}

	//switch to previous slide

	function previousSlide(){
		$(".active").removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':first-child')){
			$('.slide').last().addClass('active');
		} else {
			$('.oldActive').prev().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);

	}
});