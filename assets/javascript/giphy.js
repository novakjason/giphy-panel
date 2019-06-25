// 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.
$(function(){
    createButton(buttonArray, 'giphyButton btn btn-custom', "#giphyButtons");
})

var buttonArray = ["Dragon Ball Z", "Cowboy Bebop", "Ninja Scroll"];

function createButton(buttonArray, classes, gridLocation) {
    $(gridLocation).empty();

    for (var i = 0; i < buttonArray.length; i++) {

        var animeButton = $("<button>");

        animeButton.addClass(classes);
        animeButton.attr("title", buttonArray[i]);
        animeButton.text(buttonArray[i]);

        $(gridLocation).append(animeButton);

    }
}

$(document).on("click", ".giphyButton", function() {
    var title = $(this).attr("title");
    console.log(title);
})


var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + title + '&api_key=s471qPkGHmKx8PGao66Ogh34CZ1dQHpQ&limit=10';

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

    var results = response.data;

    for (var j = 0; j < results.length; j++) {

        var giphyDiv = $("<div>");
        var animeImage = $("<img>");
        var ratingDiv = $("<div>").text("Rating: " + results[j].rating);

        animeImage.attr("src", results[j].images.fixed_height_still.url);

        giphyDiv.addClass("col-md mb-1");
        ratingDiv.addClass("col-md mb-3");

        giphyDiv.append(animeImage);
        giphyDiv.append(ratingDiv);

        $("#gifs").prepend(giphyDiv);

    }
});

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// GIPHY API s471qPkGHmKx8PGao66Ogh34CZ1dQHpQ


// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.