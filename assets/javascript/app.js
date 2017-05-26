$(function() {
		var searchButtons = ["pokemon", "gravity falls", "rick and morty", 
		"simpsons", "animaniacs", "futurama", " family guy", "archer", "south park",
		"cowboy bebop", "american dad", "bob's burgers", "invader zim", "robot chicken",
		"king of the hill", "peanuts", "bojack horseman", "adventure time", "regular show"];

		var movingGifHolder = new Image();
		var stillGifHolder = new Image();
		var clickToPlay = $(".clickToPlay");

		function buttonLoad(){
			$(".buttonSlot").empty();
			for (var i = 0; i < searchButtons.length; i++){
				var tempButton = $("<button class='gifButton'>");
				tempButton.text(searchButtons[i]);
				
				//give a random tilt to the stickers
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
	    	clickToPlay.fadeIn();
	    	$(".gifHolder").empty();
	        tempSearchQuery = $(this).text();
	        searchQuery = tempSearchQuery.replace(" ", "+");
	        var rating = "pg"

         	var gifSearch = "https://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=dc6zaTOxFJmzC&limit=10&rating=" + rating;

         	$.getJSON(gifSearch, function(json){
         		for (var i = 0; i < json.data.length; i++){
         			var gifDiv = $("<div>");
         			gifDiv.attr("data-stillUrl", json.data[i].images.fixed_height_still.url)
         			.attr("data-movingGif", json.data[i].images.fixed_height.url)
         			.attr("data-rating", json.data[i].rating)
         			.attr("data-playing", 0)
         			.append("<img src =" + gifDiv.attr("data-stillUrl") + " onerror='errorImg(this)'><p>Rating: " + gifDiv.attr("data-rating") + "</p>")
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
         		}
         	})

	    });

	    $("body").on("click", ".addButton", function(){
	    	if ($(this).prev().val() !== ""){
	    		var tempButton = $("<button class='gifButton'>");
				tempButton.text($(this).prev().val());
				
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
	    });

		$(".gifHolder").on("mouseover", ".gifDiv", function(){
			stillGifHolder.src = $(this).attr("data-stillUrl");
			movingGifHolder.src = $(this).attr("data-movingGif");

	    });

	    $(".gifHolder").on("click", ".gifDiv", function(){
	    	if ($(this).attr("data-playing") == 0){
	    		$(this).html("<img src =" + $(this).attr("data-movingGif") + "><p>Rating: " + $(this).attr("data-rating") + "</p>");
    			$(this).attr("data-playing", 1);
	    	}

	    	else {
	    		$(this).html("<img src=" + $(this).attr("data-stillUrl") + "><p>Rating: " + $(this).attr("data-rating") + "</p>");
    			$(this).attr("data-playing", 0);
	    	}
	    });

});

function errorImg(img){
	$(img).parent().hide();
}




