// Function to search for an artist
async function searchArtist() {
    const artistName = document.getElementById("artist-input").value;
    const tracksContainer = document.getElementById("tracks-container");
    tracksContainer.innerHTML = ""; // Clear previous search results

    try {
        // Search for the artist on Spotify
        const spotifyTracks = await searchSpotify(artistName);
        displayTracks(spotifyTracks, "Spotify");

        // Search for the artist on YouTube
        const youtubeTracks = await searchYouTube(artistName);
        displayTracks(youtubeTracks, "YouTube");

        // Search for the artist on SoundCloud
        const soundCloudTracks = await searchSoundCloud(artistName);
        displayTracks(soundCloudTracks, "SoundCloud");
    } catch (error) {
        console.error("Error searching for artist:", error);
    }
}

// Function to search for artist on Spotify
async function searchSpotify(artistName) {
    // Make API call to Spotify
    // For example:
    const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track`);
    const data = await response.json();
    return data.tracks.items;
}

// Function to search for artist on YouTube
async function searchYouTube(artistName) {
    // Make API call to YouTube
    // For example:
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${artistName}&key=YOUR_YOUTUBE_API_KEY`);
    const data = await response.json();
    return data.items;
}

// Function to search for artist on SoundCloud
async function searchSoundCloud(artistName) {
    // Make API call to SoundCloud
    // For example:
    const response = await fetch(`https://api.soundcloud.com/tracks?q=${artistName}&client_id=YOUR_SOUNDCLOUD_CLIENT_ID`);
    const data = await response.json();
    return data;
}

// Function to display tracks
function displayTracks(tracks, source) {
    const tracksContainer = document.getElementById("tracks-container");
    tracks.forEach(track => {
        const trackElement = document.createElement("div");
        trackElement.classList.add("track");
        trackElement.innerText = track.name + " (" + source + ")";
        trackElement.addEventListener("click", () => playTrack(track, source));
        tracksContainer.appendChild(trackElement);
    });
}

// Function to play a track
function playTrack(track, source) {
    // Implement playing track based on the source (Spotify, YouTube, SoundCloud)
    console.log("Playing", track.name, "from", source);
}
