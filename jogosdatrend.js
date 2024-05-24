var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var topSellers = data.top_sellers.items; // Obter todos os top sellers

      // Manter um Set de ids já adicionados para garantir a exclusividade
      var addedIds = new Set();
      var validItems = [];

      // Filtrar os itens válidos (não duplicados e não sendo "Steam Deck")
      topSellers.forEach(function (item) {
        if (!addedIds.has(item.id) && item.name !== "Steam Deck") {
          addedIds.add(item.id);
          validItems.push(item);
        }
      });

      // Se houver menos de 4 itens válidos, adicionar mais itens (incluindo possivelmente o "Steam Deck") até completar 4
      if (validItems.length < 4) {
        topSellers.forEach(function (item) {
          if (!addedIds.has(item.id) && validItems.length < 4) {
            addedIds.add(item.id);
            validItems.push(item);
          }
        });
      }

      // Limitar aos primeiros 4 itens válidos
      var limitedItems = validItems.slice(0, 4);

      var trendingContainer = document.getElementById('trendingContainer'); // Obter o elemento container
      var rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      // Loop através de cada item limitado
      limitedItems.forEach(function (item) {
        var finalPrice = (item.final_price / 100).toFixed(2);
        var originalPrice = (item.original_price / 100).toFixed(2);

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
        if (originalPrice != null) {
          if (originalPrice != finalPrice) {
            spanPrice.innerHTML = '<em>' + originalPrice + '€</em>' + finalPrice + "€";
          } else {
            spanPrice.innerHTML = originalPrice + "€";
          }
        } else {
          spanPrice.innerHTML = "FREE";
        }

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
        link.setAttribute('href', 'product-details.html?id=' + item.id);
        link.innerHTML = '<i class="fa fa-shopping-bag"></i>';

        downContentDiv.appendChild(categorySpan);
        downContentDiv.appendChild(h4);
        downContentDiv.appendChild(link);

        itemDiv.appendChild(thumbDiv);
        itemDiv.appendChild(downContentDiv);

        colDiv.appendChild(itemDiv);

        rowDiv.appendChild(colDiv);
      });

      // Anexar os elementos criados ao container
      trendingContainer.appendChild(rowDiv);
    } else {
      console.error('Error fetching data:', xhr.status);
    }
  }
};
xhr.send();
