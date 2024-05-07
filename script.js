var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var newreleases = data.new_releases.items.slice(0, 6); // Escolher os primeiros 6
      
      var newreleasescont = document.querySelector('#newreleases'); // container
      
      
      newreleases.forEach(function(item) {
        let colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-2 col-md-6 col-sm-6');
        let colDiv2 = document.createElement('div');
        colDiv2.classList.add('item');
        let colDiv3 = document.createElement('div');
        colDiv3.classList.add('thumb');
        let a = document.createElement('a');
        a.setAttribute('href',"product-details.html?id="+item.id);
        let img= document.createElement('img');
        img.setAttribute('src',item.header_image);
        let colDiv4 = document.createElement('div');
        colDiv4.classList.add('down-content');
        let h4 = document.createElement('div');
        let a2 = document.createElement('a');
        a2.setAttribute('href',"product-details.html?id="+item.id);
        h4.textContent=item.name

        colDiv4.appendChild(a2)
        colDiv4.appendChild(h4)
        colDiv3.appendChild(a)
        colDiv2.appendChild(colDiv3)
        colDiv2.appendChild(colDiv4)
        colDiv.appendChild(colDiv)
        newreleasescont.appendChild(colDiv)
        



/*<div class="col-lg-2 col-md-6 col-sm-6">
          <div class="item">
            <div class="thumb">
              <a href="product-details.html"><img src="assets/images/top-game-06.jpg" alt=""></a>
            </div>
            <div class="down-content">
                <span class="category">Adventure</span>
                <h4>Assasin Creed</h4>
                <a href="product-details.html">Explore</a>
            </div>
          </div>
        </div>*/





        /*
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
        trendingContainer.appendChild(colDiv);*/
      });

    } else {
      console.error('Error fetching data:', xhr.status);
    }
  }
};
xhr.send();

