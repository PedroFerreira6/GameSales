var xhr3 = new XMLHttpRequest();

xhr3.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);

xhr3.onreadystatechange = function () {
    
    if (xhr3.readyState === XMLHttpRequest.DONE) {
        console.log("chegou1");
        if (xhr3.status === 200){
            var data = JSON.parse(xhr3.responseText);
            var topSellers = data.top_sellers.items.slice(0, 9);

            var uniqueTopSellers = topSellers.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.id === item.id
                ))
            );
            const rigthImage = document.querySelector('.right-image img');

            
            var rImagePrice = document.querySelector('.price');
            var rImageSale = document.querySelector('.offer');

            //Loop que lerá cada top seller único

            uniqueTopSellers.forEach(function (item) {
                
                if (item.name != "Steam Deck") {
                    console.log(item.finalPrice);
                    var finalPrice = (item.final_price /100).toFixed(2);
                    //var originalPrice = (item.original_price / 100).toFixed(2);
                    var sale = item.discount_percent

                    
                    //Não irei criar elementos HTML apenas dar setAtribute 
                    rigthImage.setAttribute('src', item.large_capsule_image);
                    rImagePrice.textContent =finalPrice;
                    rImageSale.textContent = sale+"%"
                }
            });
    } else {
        console.log('Erro ao buscar os dados:', xhr.status);
    }
}else{
    console.log("Estado atual do XMLHttpRequest:", xhr.readyState);
    //ez commit
}
}
xhr3.send();