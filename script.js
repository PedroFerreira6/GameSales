var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr2.onreadystatechange = function() {
  if (xhr2.readyState === XMLHttpRequest.DONE) {
    if (xhr2.status === 200) {
      var data = JSON.parse(xhr2.responseText);
      var newreleases = data.new_releases.items.slice(0, 6); // Choose the first 6 items
      
      var newreleasescont = document.getElementById('newreleases'); // Container

      var rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      newreleases.forEach(function(item) {
        // Create elements
        let colDiv = document.createElement('div');
        colDiv.className = 'col-lg-2 col-md-6 col-sm-6'; // Set class name
        
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        
        let thumbDiv = document.createElement('div');
        thumbDiv.className = 'thumb';
        
        let a = document.createElement('a');
        a.setAttribute('href', "product-details.html?id=" + item.id);
        
        let img = document.createElement('img');
        img.setAttribute('src', item.header_image);
        
        let downContentDiv = document.createElement('div');
        downContentDiv.className = 'down-content';
        
        let h4 = document.createElement('h4');
        h4.textContent = item.name;
        
        let bagIcon = document.createElement('i');
        bagIcon.className = 'fa fa-shopping-bag';

        let link = document.createElement('a');
        link.setAttribute('href', 'product-details.html?id=' + item.id);
        link.appendChild(bagIcon);

        let categorySpan = document.createElement('span');
        categorySpan.classList.add('category');
        categorySpan.textContent = item.name; 

        let promoSpan = document.createElement('span');
        promoSpan.classList.add('price');
        promoSpan.innerHTML = '<em>$0.00</em>$0.00';

        // Append elements
        downContentDiv.appendChild(categorySpan);
        downContentDiv.appendChild(h4);
        downContentDiv.appendChild(link);
        downContentDiv.appendChild(promoSpan);
        
        thumbDiv.appendChild(a);
        thumbDiv.appendChild(img);
        
        itemDiv.appendChild(thumbDiv);
        itemDiv.appendChild(downContentDiv);
        
        colDiv.appendChild(itemDiv);
        
        rowDiv.appendChild(colDiv);
      });

      newreleasescont.appendChild(rowDiv);

    } else {
      console.error('Error fetching data:', xhr2.status);
    }
  }
};
xhr2.send();
