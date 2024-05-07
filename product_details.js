//função recolhe o id através do URL(GET)
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var gameId = getQueryParam('id');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var topSellers = data.top_sellers.items.slice(0, 9); // Seleciona apenas alguns dos elementos dos topsellers

            // Filtra os itens duplicados com base nos seus IDs
            var uniqueTopSellers = topSellers.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.id === item.id
                ))
            );
        }
    }

}