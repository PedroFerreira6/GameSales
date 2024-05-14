var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var topSellers = data.top_sellers.items.slice(0, 10); // Seleciona apenas alguns dos elementos dos topsellers

      // Filtra os itens duplicados com base nos seus IDs
      var uniqueTopSellers = topSellers.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      );

      var trendingContainer = document.getElementById('trendingContainer'); // Obtém o elemento do container
      var rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      // Loop através de cada top seller único
      uniqueTopSellers.forEach(function (item) {
        // adiciona 2 casa decimais ao preço
        if (item.name != "Steam Deck") {
          var finalPrice = (item.final_price / 100).toFixed(2);
          var originalPrice = (item.original_price / 100).toFixed(2);

          // Cria os elementos HTML necessários
          var colDiv = document.createElement('div');
          colDiv.classList.add('col-lg-3', 'col-md-6');

          var itemDiv = document.createElement('div');
          itemDiv.classList.add('item');

          var thumbDiv = document.createElement('div');
          thumbDiv.classList.add('thumb');

          var img = document.createElement('img');
          img.setAttribute('src', item.large_capsule_image);
          img.setAttribute('alt', item.name);

          var spanPrice = document.createElement('span');
          spanPrice.classList.add('price');
          spanPrice.innerHTML = '<em>$' + originalPrice + '</em>$' + finalPrice;

          thumbDiv.appendChild(img);
          thumbDiv.appendChild(spanPrice);

          var downContentDiv = document.createElement('div');
          downContentDiv.classList.add('down-content');

          var categorySpan = document.createElement('span');
          categorySpan.classList.add('category');
          categorySpan.textContent = item.name; 

          var h4 = document.createElement('h4');
          h4.textContent = item.name;

          var link = document.createElement('a');
          link.setAttribute('href', 'product-details.html?id='+item.id);
          link.innerHTML = '<i class="fa fa-shopping-bag"></i>';
          

          downContentDiv.appendChild(categorySpan);
          downContentDiv.appendChild(h4);
          downContentDiv.appendChild(link);

          itemDiv.appendChild(thumbDiv);
          itemDiv.appendChild(downContentDiv);

          colDiv.appendChild(itemDiv);

          rowDiv.appendChild(colDiv);
        }
      });

      // Anexa os elementos criados ao container
      trendingContainer.appendChild(rowDiv);
      console.log("Estado atual do XMLHttpRequest:", xhr.readyState);
    } else {
      console.error('Erro ao buscar os dados:', xhr.status);
    }
  }
};
xhr.send();
