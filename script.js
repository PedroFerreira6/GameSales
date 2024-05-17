const xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr2.onreadystatechange = function () {
  if (xhr2.readyState === XMLHttpRequest.DONE) {
    if (xhr2.status === 200) {
      const data = JSON.parse(xhr2.responseText);
      const newreleases = data.new_releases.items.slice(0, 6); 
      const newreleasescont = document.getElementById('newreleases'); 
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      rowDiv.style.minHeight = '200px'; 
      rowDiv.style.display = 'flex';
      rowDiv.style.flexWrap = 'wrap'; 
      newreleases.forEach(function (item) {
        // Create elements
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-2 col-md-6 col-sm-6'; 
        colDiv.style.minHeight = '150px'; 
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'thumb';
        const a = document.createElement('a');
        a.setAttribute('href', "product-details.html?id=" + item.id);
        const img = document.createElement('img');
        img.setAttribute('src', item.header_image);

        // Price elements
        const price = document.createElement('span');
        price.classList.add('price', 'altprice'); 
        if (item.original_price != null) {
          if (item.original_price != item.final_price) {
            const em = document.createElement('em');
            let strikeThroughEm = document.createElement('del');
            strikeThroughEm.textContent = (item.original_price / 100).toFixed(2) + '€';
            em.appendChild(strikeThroughEm);
            price.appendChild(em);
            price.innerHTML += "<br />";
          }
          price.innerHTML += (item.final_price / 100).toFixed(2) + '€';
        }else{
          price.innerHTML += "FREE";
        }
        

        // Apply styles to price
        price.style.textAlign = 'right';
        price.style.position = 'absolute';
        price.style.right = '10px';
        price.style.top = '10px';
        price.style.borderRadius = '10px';
        price.style.backgroundColor = '#008af8';
        price.style.fontSize = '12px';
        price.style.textTransform = 'uppercase';
        price.style.fontWeight = '500';
        price.style.color = '#fff';
        price.style.padding = '5px 15px';
        price.style.zIndex = '2'; 

        const downContentDiv = document.createElement('div');
        downContentDiv.className = 'down-content';
        const h4 = document.createElement('h4');
        h4.textContent = item.name;

        const bagIcon = document.createElement('i');
        bagIcon.className = 'fa fa-shopping-bag';
        const link = document.createElement('a');
        link.setAttribute('href', 'product-details.html?id=' + item.id);
        link.appendChild(bagIcon);

        // Apply styles to link
        link.style.position = 'relative'; 
        link.style.display = 'block'; 
        link.style.margin = 'auto'; 
        link.style.zIndex = '1'; 

        // Append elements
        downContentDiv.appendChild(h4);
        downContentDiv.appendChild(link); 

        thumbDiv.appendChild(a);
        thumbDiv.appendChild(img);
        thumbDiv.appendChild(price);
        thumbDiv.appendChild(downContentDiv); 

        itemDiv.appendChild(thumbDiv);

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
