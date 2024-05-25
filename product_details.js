var xhr = new XMLHttpRequest();

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var gameId = getQueryParam('id');
console.log('Game ID:', gameId);  
if (!gameId) {
    console.error('Game ID was not found in the URL');

} else {
  
    function fetchGameData() {
        xhr.open('GET', 'https:gamesales-production.up.railway.app/getGameDetails/' + gameId, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                    var data = JSON.parse(xhr.responseText);
                    console.log('Server Response:', data); 
                    var dados = data;
                
                    var headerImage = dados.header_image;
                    console.log('Header Image URL:', headerImage); 
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
                         
                        if (retryCount < maxRetries) {
                            retryCount++;
                            console.log('Retry:', retryCount);
                            setTimeout(fetchGameData, retryInterval);
                            return;
                        } else {
                            console.error('Max retries reached, final_formatted not available');
                          
                            location.reload();
                        }
                    }
                    aboutgame.innerHTML = dados.about_the_game;
                    id_game.textContent = gameId;
                    image.setAttribute('src', headerImage);


                    //Géneros
                    var container = document.getElementById('genresContainer');

                    var gameData = dados.genres;

                    gameData.forEach(function (genre) {
                        var genreLink = document.createElement('a');
                        genreLink.href = '#';
                        genreLink.textContent = genre.description + ", ";
                        container.appendChild(genreLink);
                    });

                    //TAGS
                    var container = document.getElementById('tagsmm');

                    var gameCate = dados.categories;

                    gameCate.forEach(function (genre) {
                        var genreLink = document.createElement('a');
                        genreLink.href = '#';
                        genreLink.textContent = genre.description + ", ";
                        container.appendChild(genreLink);
                    });


                    //Screenshots
                    var gamescre = dados.screenshots;
                    var reviews = document.querySelector("#reviews")
                    gamescre.forEach(function (genre) {
                        var genreLink = document.createElement('img');
                        genreLink.setAttribute('src', genre.path_full)
                        reviews.appendChild(genreLink);
                        genreLink.style = "margin-bottom:10px;"
                    });

                     //BOTAO COMPRAR NA STEAM
                    var botaosteam = document.querySelector("#ir_steam");
                    botaosteam.addEventListener('click', function (event) {
                        event.preventDefault();  
                        window.location.href = "https:store.steampowered.com/app/" + gameId;
                    });


                    //TRAILERS
                    var trailers = document.querySelector("#trailers");
                    var movies = dados.movies;

                   
                    var rowDiv = document.createElement('div');
                    rowDiv.classList.add('row');

                    movies.forEach(function (movie) {
                        
                        var trailerUrl = movie.webm.max;
                        if (trailerUrl.startsWith('http:')) {
                            trailerUrl = trailerUrl.replace('http:', 'https:');
                        }

                        var genreLink = document.createElement('iframe');
                        genreLink.setAttribute('src', trailerUrl);
                        genreLink.setAttribute('width', '100%'); 
                        genreLink.setAttribute('height', '500px'); 

                       
                        var colDiv = document.createElement('div');
                        colDiv.classList.add('col-12'); 
                        colDiv.appendChild(genreLink);

                      
                        rowDiv.appendChild(colDiv);
                    });
                    
                    trailers.appendChild(rowDiv);
              
            }
        };

         
        xhr.send();
    }

    var retryCount = 0;
    var maxRetries = 5;  //Maximum number of retries
    var retryInterval = 1000;  //Retry interval in milliseconds

     //Start fetching game data
    fetchGameData();
}

 import { database } from './login_register/js/firebase-config.js';
 import { ref, push, get, child, orderByChild, equalTo, remove, set } from "https:www.gstatic.com/firebasejs/10.12.1/firebase-database.js";



var favbutton=document.getElementById('favorite');
 favbutton.addEventListener('click', function () {
    event.preventDefault();

    // Get UID from localStorage
    const uid = localStorage.getItem('uid');
    if (!uid) {
        console.error("User is not logged in");
        return;
    }

    // Get the game ID
    const gameId = getQueryParam('id');
    if (!gameId) {
        console.error('Game ID was not found in the URL');
        return;
    }

    // Toggle favorite game
    const userRef = ref(database, `users/${uid}/favorites`);
    get(child(userRef, gameId)).then((snapshot) => {
        if (snapshot.exists()) {
            // Game is already in favorites, remove it
            remove(child(userRef, gameId))
                .then(() => {
                    alert("Jogo removido dos favoritos");
                    favicon.setAttribute('class','fa-regular fa-star')
                })
                .catch((error) => {
                    console.error("Error removing game from favorites:", error);
                });
        } else {
            // Game is not in favorites, add it
            set(child(userRef, gameId), true)
                .then(() => {
                    alert("Jogo adicionado aos favoritos");
                    favicon.setAttribute('class','fa-solid fa-star') // Change icon to solid
                })
                .catch((error) => {
                    console.error("Error adding game to favorites:", error);
                });
        }
    }).catch((error) => {
        console.error("Error checking favorite game:", error);
    });
});



 var favicon = document.getElementById('favicon');
//Update favorite button color on page load
document.addEventListener('DOMContentLoaded', function () {
    // Get UID from localStorage
    const uid = localStorage.getItem('uid');
    if (!uid) {
        console.error("User is not logged in");
        return;
    }

    // Get the game ID
    const gameId = getQueryParam('id');
    if (!gameId) {
        console.error('Game ID was not found in the URL');
        return;
    }

    // Check if the game is in favorites
    const userRef = ref(database, `users/${uid}/favorites`);
    get(child(userRef, gameId)).then((snapshot) => {
        // If the game is in favorites, change the icon to solid
        if (snapshot.exists()) {
            favicon.classList.add("fa-solid");
        }
    }).catch((error) => {
        console.error("Error checking favorite game:", error);
    });
});
