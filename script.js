console.log('Init App!');

urlSteam()

function pedido_GetSTEAM(url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('load', callback);
    xhr.send();
}

function urlSteam(){
    let urlSteamSales = 'https://store.steampowered.com/api/featuredcategories/?l=portuguese' 
    console.log(" teste url "+urlSteamSales);

    pedido_GetSTEAM(urlSteamSales, showGames)

}

function showGames(){
    console.log(this.responseText);
    let games = JSON.parse(this.responseText)   
}

