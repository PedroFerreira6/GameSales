var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE){
        if (xhr.status === 200){
            var data = JSON.parse(xhr.responseText);
            var topSellers = data.top_sellers.items(0, 1);

            var uniqueTopSellers = topSellers.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.id === item.id
                ))
            );

    } else {
        console.log('Erro ao buscar os dados:', xhr.status);
    }
};
xhr.send();