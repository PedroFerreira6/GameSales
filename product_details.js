var xhr = new XMLHttpRequest();

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var gameId = getQueryParam('id');
console.log('Game ID:', gameId); // Check if gameId is correctly obtained from the URL
if (!gameId) {
    console.error('Game ID was not found in the URL');
    window.location.href = "index.html";

} else {
    // Function to fetch game data
    function fetchGameData() {
        xhr.open('GET', 'http://gamesales-production.up.railway.app/getGameDetails/' + gameId, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    console.log('Server Response:', data); // Check the server response
                    var dados = data;
                    // Access the header_image URL from the data object
                    var headerImage = dados.header_image;
                    console.log('Header Image URL:', headerImage); // Check if headerImage is correctly obtained
                    var image = document.getElementById('mainImg');
                    var nome = document.querySelector("#nome1");
                    var nome1 = document.querySelector("#nome2");
                    var price = document.querySelector("#price");
                    var aboutgame = document.querySelector("#about_game");
                    var id_game = document.querySelector("#game_id");
                    nome.textContent = dados.name;
                    nome1.textContent = dados.name;
                    if (dados.price_overview && dados.price_overview.final_formatted) {
                        price.textContent = dados.price_overview.final_formatted;
                    } else {
                        // Retry fetching the data
                        if (retryCount < maxRetries) {
                            retryCount++;
                            console.log('Retry:', retryCount);
                            setTimeout(fetchGameData, retryInterval);
                            return;
                        } else {
                            console.error('Max retries reached, final_formatted not available');
                            // You can handle this scenario, for example, redirecting or displaying an error message
                            // For now, let's refresh the page
                            location.reload();
                        }
                    }
                    aboutgame.innerHTML = dados.about_the_game;
                    id_game.textContent = gameId;
                    image.setAttribute('src', headerImage);


                    //Géneros
                    var container = document.getElementById('genresContainer');

                    gameData = dados.genres;

                    gameData.forEach(function (genre) {
                        var genreLink = document.createElement('a');
                        genreLink.href = '#';
                        genreLink.textContent = genre.description + ", ";
                        container.appendChild(genreLink);
                    });

                    //TAGS

                    var container = document.getElementById('tagsmm');

                    gameCate = dados.categories;

                    gameCate.forEach(function (genre) {
                        var genreLink = document.createElement('a');
                        genreLink.href = '#';
                        genreLink.textContent = genre.description + ", ";
                        container.appendChild(genreLink);
                    });

                


                    //Screenshots
                    gamescre = dados.screenshots;
                    var reviews = document.querySelector("#reviews")
                    gamescre.forEach(function (genre) {
                        var genreLink = document.createElement('img');
                        genreLink.setAttribute('src', genre.path_full)
                        reviews.appendChild(genreLink);
                    });


                    var botaosteam = document.querySelector("#ir_steam");
                    botaosteam.addEventListener('click', function (event) {
                        event.preventDefault(); // Prevent the default behavior of the button
                        window.location.href = "https://store.steampowered.com/app/" + gameId;
                    });


                    //TRAILERS
                    gamescre = dados.movies;
                    var trailers = document.querySelector("#trailers");
                    
                    gamescre.forEach(function (genre) {
                        // Create a new row for each trailer
                        var rowDiv = document.createElement('div');
                        rowDiv.classList.add('row');
                    
                        var genreLink = document.createElement('iframe');
                        genreLink.setAttribute('src', genre.webm.max);
                        genreLink.setAttribute('width', '100%'); // Set the width to 100% to fill the container
                        genreLink.setAttribute('height', '500px'); // Adjust the height as needed
                    
                        // Create a column for the trailer
                        var colDiv = document.createElement('div');
                        colDiv.classList.add('col-12'); // Make the column occupy the entire row width
                        colDiv.appendChild(genreLink);
                    
                        // Append the column to the row
                        rowDiv.appendChild(colDiv);
                    
                        // Append the row to the trailers container
                        trailers.appendChild(rowDiv);
                    });
                } else {
                    console.error('Error fetching game details:', xhr.status);
                    window.location.href = "index.html";

                }
            }
        };

        // Send the request
        xhr.send();
    }

    var retryCount = 0;
    var maxRetries = 5; // Maximum number of retries
    var retryInterval = 1000; // Retry interval in milliseconds

    // Start fetching game data
    fetchGameData();
}
