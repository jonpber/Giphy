$(function() {
		var searchButtons = ["pokemon", "gravity falls", "rick and morty", 
		"simpsons", "animaniacs", "futurama", " family guy"];

		function buttonLoad(){
			$(".buttonSlot").empty();
			for (var i = 0; i < searchButtons.length; i++){
				$(".buttonSlot").append("<button class='gifButton'>" + searchButtons[i] + "</button");
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
	        // console.log(searchQuery);

         	var gifSearch = "http://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=dc6zaTOxFJmzC&limit=10";
         	// var gifSearch = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=american+psycho";

         	$.getJSON(gifSearch, function(json){
         		for (var i = 0; i < json.data.length; i++){
         			var gifDiv = $("<div>");
         			gifDiv.attr("data-stillUrl", json.data[i].images.fixed_height_still.url)
         			.attr("data-movingGif", json.data[i].images.fixed_height.url)
         			.attr("data-rating", json.data[i].rating)
         			.attr("data-playing", 0)
         			.append("<p>" + gifDiv.attr("data-rating") + "</p><img src =" + gifDiv.attr("data-stillUrl") + ">")
         			.addClass("gifDiv");
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
	    		$(this).html("<p>" + $(this).attr("data-rating") + "</p><img src =" + $(this).attr("data-movingGif") + ">");
	    		$(this).attr("data-playing", 1);
	    	}

	    	else {
	    		$(this).html("<p>" + $(this).attr("data-rating") + "</p><img src =" + $(this).attr("data-stillUrl") + ">");
	    		$(this).attr("data-playing", 0);
	    	}
	    });

});



