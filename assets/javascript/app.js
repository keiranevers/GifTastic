$(document).ready(function(){

 

var animals = ['cat', 'dog', 'gremlin'];

    $('body').on('click', '.animal', function() {

        var animal  = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=BLZeUFUso54cVFZ9RU3N0aCuaP8WB3Jw&limit=10";

            $("#displayAnimalInfo").empty();

              $.ajax({
                url: queryURL,
                method: "GET"
                }).done(function(response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                   var pictureDiv = $('<div-container>');
                   var p = $('<p>').text("Rating: " + results[i].rating);
                   var pictureImage = $('<img>');

                    pictureImage.attr("src", results[i].images.fixed_height_still.url);
                    pictureImage.attr("data-state", "still");
                    pictureImage.attr("data-still", results[i].images.fixed_height_still.url);
                    pictureImage.attr("data-animate", results[i].images.fixed_height.url);
                    pictureImage.addClass("pictureImage")
                    pictureDiv.append(p);
                    pictureDiv.append(pictureImage);
                    $('#displayAnimalInfo').prepend(pictureDiv);

                }

                $('img').on('click', function(e) {

                var state = $(this).attr("data-state");

                if (state === "still"){
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
                } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
                }
              });
            });
      });

    function renderButtons(){

        $('#buttonsView').empty();

        for (var i = 0; i < animals.length; i++){

            var a = $('<button>') 

            a.addClass('animal'); 
            a.attr('data-name', animals[i]); 
            a.text(animals[i]); 
            $('#buttonsView').append(a); 
        }
    }

    $('#addAnimal').on('click', function(){

        var animal = $('#animal-input').val().trim();

        animals.push(animal);
        renderButtons();
        return false;
    })

    renderButtons();
});