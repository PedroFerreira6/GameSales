const apiKey = 'YOUR_API_KEY';

// Function to fetch list of apps (games) on Steam
async function fetchAppList() {
  const response = await fetch(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`);
  const data = await response.json();
  return data.applist.apps;
}

// Function to fetch details of a specific app (game) by its appID
async function fetchAppDetails(appID) {
  const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appID}`);
  const data = await response.json();
  return data;
}

// Function to check if a game is on sale
function isGameOnSale(gameDetails) {
  // Check if the game has a price_overview property and if the discounted price is less than the full price
  return gameDetails.price_overview && gameDetails.price_overview.discount_percent > 0;
}

// Function to display games on sale
async function displayGamesOnSale() {
  const appList = await fetchAppList();
  const gamesOnSale = [];

  for (const app of appList) {
    const appID = app.appid;
    const appDetails = await fetchAppDetails(appID);

    if (isGameOnSale(appDetails[appID].data)) {
      const game = {
        name: appDetails[appID].data.name,
        discountedPrice: appDetails[appID].data.price_overview.final_formatted,
        originalPrice: appDetails[appID].data.price_overview.initial_formatted
      };
      gamesOnSale.push(game);
    }
  }

  // Display games on sale
  for (const game of gamesOnSale) {
    console.log(`${game.name} is on sale for ${game.discountedPrice} (original price: ${game.originalPrice})`);
  }
}

// Call the function to display games on sale
displayGamesOnSale();

