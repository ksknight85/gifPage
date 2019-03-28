// VARIABLES
var searchVal;
var topics = ["Thor", "Ironman", "Star Lord", "Drax", "Captain America", "Dr. Strange", "Spiderman", "Black Panther"];
var apiKey = "61JxIUAPGbJxUuy3n1QP5294P0Bt9EDh";
var status = "still";
var displayedGIF = 10;




// FUNCTIONS
// AJAX


function createButton() {
    for (var i = 0; i < topics.length; i++) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics[i] + "&api_key=" + apiKey;
        newGif = $("<button>");
        newGif.text(topics[i]);
        newGif.attr("class", "buttons")
        newGif.attr("data-URL", queryURL);
        $(".gifButtons").append(newGif);
    }
};

// FUNCTION FOR submit
$(".submit").on("click", function () {
    event.preventDefault();
    searchVal = $(".searchBar").val().trim();
    topics.push(searchVal)
    $(".gifButtons").empty();
    createButton();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchVal + "&api_key=" + apiKey;
    $(".gifsImages").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data[0].images.fixed_height_still.url);
        for (var i = 0; i < displayedGIF; i++) {
            var gifURL = response.data[i].images.fixed_height.url;
            var stillGifURL = response.data[i].images.fixed_height_still.url;
            var rating = response.data[i].rating;
            var newGif = $("<div>");
            newGif.html("<p>Rating: " + rating + "</p><img data-state='" + status + "'id='gif' src='" + response.data[i].images.fixed_height_still.url + "' data-stillURL='" + stillGifURL + "'data-gifURL='" + gifURL + "'/>");
            $(".gifsImages").append(newGif);
        }
    });
    $(".searchBar").val("");
})




// display GIFs function
$(".gifButtons").on("click", ".buttons", function () {
    var queryURL = $(this).attr("data-URL");
    $(".gifsImages").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < displayedGIF; i++) {
            var gifURL = response.data[i].images.fixed_height.url;
            var stillGifURL = response.data[i].images.fixed_height_still.url;
            var rating = response.data[i].rating;
            var newGif = $("<div>");
            newGif.html("<p>Rating: " + rating + "</p><img data-state='" + status + "'id='gif' src='" + response.data[i].images.fixed_height_still.url + "' data-stillURL='" + stillGifURL + "'data-gifURL='" + gifURL + "'/>");
            $(".gifsImages").append(newGif);

        }
    });

})
$(".gifsImages").on("click", "#gif", function () {
    var state = $(this).attr("data-state");
    var gifURL = $(this).attr("data-gifURL");
    var stillGifURL = $(this).attr("data-stillURL");

    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", gifURL);
    }
    else {
        $(this).attr("data-state", "still");
        $(this).attr("src", stillGifURL);
    }

})

createButton()

