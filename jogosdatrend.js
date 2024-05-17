var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var topSellers = data.top_sellers.items.slice(0, 9); // Select only some of the top sellers

      // Maintain an array of items already added to ensure uniqueness
      var addedItems = [];

      var trendingContainer = document.getElementById('trendingContainer'); // Get the container element
      var rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      // Loop through each top seller
      topSellers.forEach(function (item) {
        // Check if the item is not already added and it's not the "Steam Deck"
        if (!addedItems.includes(item.id) && item.name !== "Steam Deck") {
          // Add the item to the added items list
          addedItems.push(item.id);

   
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

      // Append the created elements to the container
      trendingContainer.appendChild(rowDiv);
      console.log("Current state of the XMLHttpRequest:", xhr.readyState);
    } else {
      console.error('Error fetching data:', xhr.status);
    }
  }
};
xhr.send();
