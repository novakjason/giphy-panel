// 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.
$(function () {
    createButton(buttonArray, 'giphyButton btn btn-custom mx-2 mb-2', "#giphyButtons");
    $("#createBtn").on("click", addButton);
    $(".giphyButton").on("click", showGiphy);
})

var buttonArray = ["Dragon Ball Z", "Akira", "Cowboy Bebop", "Ninja Scroll"];

// 2. Your app should take the topics in this array and create buttons in your HTML.
function createButton(buttonArray, classes, btnLocation) {
    $(btnLocation).empty();

    //    * Try using a loop that appends a button for each string in the array.
    for (var i = 0; i < buttonArray.length; i++) {

        var animeButton = $("<button>");

        animeButton.addClass(classes);
        animeButton.attr("title", buttonArray[i]);
        animeButton.text(buttonArray[i]);

        $(btnLocation).append(animeButton);

    }
}

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
function showGiphy() {
    $("#gifs").empty();
    // Grabbing title of anime from title attribute of buttons.
    var title = $(this).attr("title");

    // GIPHY API s471qPkGHmKx8PGao66Ogh34CZ1dQHpQ
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
            // 5. Under every gif, display its rating (PG, G, so on).
            var ratingDiv = $("<div>").text("Rated: " + results[j].rating.toUpperCase());
            var static = results[j].images.fixed_height_still.url;

            animeImage.attr("src", static);
            animeImage.attr("toggle", "off");
            animeImage.attr("gifURL", results[j].images.fixed_height.url);
            animeImage.attr("staticURL", static);
            animeImage.addClass("giphyImage rounded");

            giphyDiv.addClass("col-md mb-1 text-center");
            giphyDiv.append(animeImage);
            giphyDiv.append(ratingDiv);

            ratingDiv.addClass("mb-3");

            $("#gifs").prepend(giphyDiv);
        }
        $(".giphyImage").on("click", toggleGif);

    });
}

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

function toggleGif() {
    var toggle = $(this).attr("toggle");
    console.log(toggle);
    if (toggle === "off") {
        var toggle = $(this).attr("toggle", "on");
        $(this).attr("src", $(this).attr("gifURL"));
        $(this).attr("toggle", "on");
    } else {
        var toggle = $(this).attr("toggle", "off");
        $(this).attr("src", $(this).attr("staticURL"));
        $(this).attr("toggle", "off");
    }
}

// 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.

function addButton() {

    var userInput = $("input").eq(0).val();
    var lowercaseArray = buttonArray.toString().toLowerCase().split(',');
    var lowercaseInput = userInput.toLowerCase();
    var checkButton = $.inArray(lowercaseInput, lowercaseArray);

    if (checkButton > -1 || userInput == "") {
        createButton(buttonArray, 'giphyButton btn btn-custom mx-2 mb-2', "#giphyButtons");
    }
    else {
        buttonArray.push(userInput);
        createButton(buttonArray, 'giphyButton btn btn-custom mx-2 mb-2', "#giphyButtons");
    }
    $(".giphyButton").on("click", showGiphy);
    return false;
}