var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);

      var trendingContainer = document.querySelector('.trending-box'); // Select the existing trending-box container

      // Track unique game IDs to avoid duplicates
      var uniqueGameIds = new Set();

      // Process the data and create HTML elements
      data.new_releases.items.forEach(function (item) {
        if (uniqueGameIds.has(item.id)) return; // Skip if this game ID has already been processed
        uniqueGameIds.add(item.id); // Add the game ID to the set of processed IDs
        // Create the column div
        var colDiv = document.createElement('div');
        // Define the order of classes
        var classOrder = ['col-lg-3', 'col-md-6', 'align-self-center', 'mb-30', 'trending-items', 'adv'];
        classOrder.forEach(className => colDiv.classList.add(className));

        // Create the item div
        var itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        // Create the thumb div
        var thumbDiv = document.createElement('div');
        thumbDiv.classList.add('thumb');

        // Create the image element
        var img = document.createElement('img');
        img.setAttribute('src', item.large_capsule_image);
        img.setAttribute('alt', item.name);

        // Create the link element for the image
        var imgLink = document.createElement('a');
        imgLink.setAttribute('href', 'product-details.html?id=' + item.id);
        imgLink.appendChild(img);

        // Create the price span
        var priceSpan = document.createElement('span');
        priceSpan.classList.add('price');
        var originalPrice = (item.original_price / 100).toFixed(2);
        var finalPrice = (item.final_price / 100).toFixed(2);
        priceSpan.innerHTML = `<em>$${originalPrice}</em>$${finalPrice}`;

        // Append the image and price to the thumb div
        thumbDiv.appendChild(imgLink);
        thumbDiv.appendChild(priceSpan);

        // Create the down-content div
        var downContentDiv = document.createElement('div');
        downContentDiv.classList.add('down-content');

        // Create the category span
        var categorySpan = document.createElement('span');
        categorySpan.classList.add('category');
        categorySpan.textContent = "Action"; // You can replace this with actual category if available

        // Create the h4 element
        var h4 = document.createElement('h4');
        h4.textContent = item.name;

        // Create the link element for the shopping bag icon
        var link = document.createElement('a');
        link.setAttribute('href', 'product-details.html?id=' + item.id);
        link.innerHTML = '<i class="fa fa-shopping-bag"></i>';

        // Append elements to the down-content div
        downContentDiv.appendChild(categorySpan);
        downContentDiv.appendChild(h4);
        downContentDiv.appendChild(link);

        // Append thumb and down-content divs to the item div
        itemDiv.appendChild(thumbDiv);
        itemDiv.appendChild(downContentDiv);

        // Append the item div to the column div
        colDiv.appendChild(itemDiv);

        // Append the column div to the existing trending-box container
        trendingContainer.appendChild(colDiv);
      });
    } else {
      console.error('Error fetching data:', xhr.status);
    }
  }
};

xhr.send();
