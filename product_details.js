var xhr = new XMLHttpRequest();

// funçao para buscar o id do jogo no url
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
// id do url
var gameId = getQueryParam('id');

if (!gameId) {
    console.error('Game ID não foi encontrado no URL');
} else {
    // 
    xhr.open('GET', 'https://gamesales-production.up.railway.app/getGameDetails?id='+gameId, true);

    // 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                // verifica se 
                if (data && data[gameId] && data[gameId].success) {
                    // Retrieve the detailed description of the game
                    var detailedDescription = data[gameId].data.detailed_description;
                    console.log(detailedDescription);
                } else {
                    console.error('Game details not found for ID:', gameId);
                }
            } else {
                console.error('Error fetching game details:', xhr.status);
            }
        }
    };

    // Send the request
    xhr.send();
}