$(function() {
		var searchButtons = ["pokemon", "gravity falls", "rick and morty", 
		"simpsons", "animaniacs", "futurama", " family guy", "archer", "south park"];

		function buttonLoad(){
			$(".buttonSlot").empty();
			for (var i = 0; i < searchButtons.length; i++){
				var tempButton = $("<button class='gifButton'>");
				tempButton.text(searchButtons[i]);
				console.log(tempButton);
				
				var leftOrRight = Math.round(Math.random());
         		var tiltVal = Math.floor(Math.random() * 2 + 1);

     			if (leftOrRight === 0){
     				tempButton.css("transform", "rotate(-" + tiltVal + "deg)");
     			}

     			else {
     				tempButton.css("transform", "rotate(" + tiltVal + "deg)");
     			}

				$(".buttonSlot").append(tempButton);
			}
		}

		buttonLoad();


	    var appID = "dc6zaTOxFJmzC";

	    $("body").on("click", ".gifButton", function(){
	    	$(".gifHolder").empty();
	        // var query_param = $(this).prev().val();
	        // searchQuery = query_param.replace(" ", "+");
	        tempSearchQuery = $(this).text();
	        searchQuery = tempSearchQuery.replace(" ", "+");
	        var rating = "pg"
	        // console.log(searchQuery);

         	var gifSearch = "http://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=dc6zaTOxFJmzC&limit=10&rating=" + rating;
         	// var gifSearch = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=american+psycho";

         	$.getJSON(gifSearch, function(json){
         		for (var i = 0; i < json.data.length; i++){
         			var gifDiv = $("<div>");
         			gifDiv.attr("data-stillUrl", json.data[i].images.fixed_height_still.url)
         			.attr("data-movingGif", json.data[i].images.fixed_height.url)
         			.attr("data-rating", json.data[i].rating)
         			.attr("data-playing", 0)
         			.append("<img src =" + gifDiv.attr("data-stillUrl") + "><p>Rating: " + gifDiv.attr("data-rating") + "</p>")
         			.addClass("gifDiv");

         			//give a random tilt to gifs
         			var leftOrRight = Math.round(Math.random());
         			var tiltVal = Math.floor(Math.random() * 3 + 1);

         			if (leftOrRight === 0){
         				gifDiv.css("transform", "rotate(-" + tiltVal + "deg)");
         			}

         			else {
         				gifDiv.css("transform", "rotate(" + tiltVal + "deg)");
         			}
         		

         			$(".gifHolder").append(gifDiv);
         			var preloadImg = $("<img src=" + gifDiv.attr("data-movingGif") + ">");
         		}
 
         	})

	    });

	    $("body").on("click", ".addButton", function(){
	    	if ($(this).prev().val() !== ""){
	    		searchButtons[searchButtons.length] = $(this).prev().val();
	    		buttonLoad();
	    	}
	    });

	    $(".gifHolder").on("click", ".gifDiv", function(){
	    	if ($(this).attr("data-playing") == 0){
	    		$(this).html("<img src =" + $(this).attr("data-movingGif") + "><p>Rating: " + $(this).attr("data-rating") + "</p>");
	    		$(this).attr("data-playing", 1);
	    	}

	    	else {
	    		$(this).html("<img src =" + $(this).attr("data-stillUrl") + "><p>Rating: " + $(this).attr("data-rating") + "</p>");
	    		$(this).attr("data-playing", 0);
	    	}
	    });

	 //    function preloadGifs(){
	 //    	var gifs = $(".gifHolder").children();
	 //    	for (i = 0; i < gifs.length; i++){
	 //    		var preloadImg = $("<img src=" + $(gifs[i]).attr("data-movingGif") + ">");
	 //    		var preloadImgStill = $("<img src=" + $(gifs[i]).attr("data-stillUrl") + ">");
	 //    	}
	 //    }

		// $(window).resize(function() {
		// 	if ($(this).width() >= 1200) {
		// 	preloadGifs();
		// 	}

		// 	else if ($(this).width() < 1280 && $(this).width()>= 992) {
		// 	preloadGifs();
		// 	}

		// 	else if ($(this).width() < 992 && $(this).width()>= 768){
		// 	preloadGifs();
		// 	}

		// 	else if ($(this).width() < 768 && $(this).width()>= 568){
		// 	preloadGifs();
		// 	}

		// 	else {
		// 	preloadGifs();
		// 	}
		// });

});



