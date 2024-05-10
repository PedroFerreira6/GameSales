var xhr = new XMLHttpRequest();

// Function to get the value of a query parameter from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get the game ID from the URL
var gameId = getQueryParam('id');

if (!gameId) {
    console.error('Game ID was not found in the URL');
} else {
    // Make a GET request to your Express server endpoint with the game ID
    xhr.open('GET', 'http://localhost:5002/getGameDetails/' + gameId, true);

    // Define what to do when the response is received
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                // Check if game details were found
                if (data && data.success) {
                    // Retrieve the detailed description of the game
                    var detailedDescription = data.data.detailed_description;
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
