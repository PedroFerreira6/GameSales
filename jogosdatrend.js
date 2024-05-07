var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var topSellers = data.top_sellers.items.slice(0, 4); // Escolher os primeiros 4
      
      var trendingContainer = document.getElementById('trendingContainer'); // container
      
      
      topSellers.forEach(function(item) {
        // Create the necessary HTML elements
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
        spanPrice.innerHTML = '<em>$' + item.ori + '</em>$' + item.original_price;
        
        thumbDiv.appendChild(img);
        thumbDiv.appendChild(spanPrice);
        
        var downContentDiv = document.createElement('div');
        downContentDiv.classList.add('down-content');
        
        var categorySpan = document.createElement('span');
        categorySpan.classList.add('category');
        categorySpan.textContent = 'Action';
        
        var h4 = document.createElement('h4');
        h4.textContent = item.name;
        
        var link = document.createElement('a');
        link.setAttribute('href', 'product-details.html');
        link.innerHTML = '<i class="fa fa-shopping-bag"></i>';
        
        downContentDiv.appendChild(categorySpan);
        downContentDiv.appendChild(h4);
        downContentDiv.appendChild(link);
        
        itemDiv.appendChild(thumbDiv);
        itemDiv.appendChild(downContentDiv);
        
        colDiv.appendChild(itemDiv);
        
        // Append the created elements to the container
        trendingContainer.appendChild(colDiv);
      });
    } else {
      console.error('Error fetching data:', xhr.status);
    }
  }
};
xhr.send();

