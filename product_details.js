var xhr = new XMLHttpRequest();

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var gameId = getQueryParam('id');
console.log('Game ID:', gameId); // Check if gameId is correctly obtained from the URL

if (!gameId) {
    console.error('Game ID was not found in the URL');
} else {
    // Function to fetch game data
    function fetchGameData() {
        xhr.open('GET', 'http://gamesales-production.up.railway.app/getGameDetails/' + gameId, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    console.log('Server Response:', data); // Check the server response
                    var dados = data[gameId].data;
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

                    var container = document.getElementById('genresContainer');

                    gameData = dados.genres;

                    // Loop through each genre and create an <a> element for it
                    gameData.forEach(function (genre) {
                        var genreLink = document.createElement('a');
                        genreLink.href = '#'; // Set the href attribute, you can modify it based on your requirement
                        genreLink.textContent = genre.description + ", "; // Set the text content of the <a> element
                        container.appendChild(genreLink); // Append the <a> element to the container
                    });
                } else {
                    console.error('Error fetching game details:', xhr.status);
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
