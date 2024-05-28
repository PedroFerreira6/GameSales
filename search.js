document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var trendingContainer = document.querySelector('.trending-box');
                var uniqueGameIds = new Set();

                // Function to create and append game elements to the container
                function createGameElement(item) {
                    if (uniqueGameIds.has(item.id)) return;
                    uniqueGameIds.add(item.id);

                    var colDiv = document.createElement('div');
                    colDiv.classList.add('col-lg-3', 'col-md-6', 'align-self-center', 'mb-30', 'trending-items', 'adv');

                    var itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');

                    var thumbDiv = document.createElement('div');
                    thumbDiv.classList.add('thumb');

                    var img = document.createElement('img');
                    img.setAttribute('src', item.large_capsule_image);
                    img.setAttribute('alt', item.name);

                    var imgLink = document.createElement('a');
                    imgLink.setAttribute('href', 'product-details.html?id=' + item.id);
                    imgLink.appendChild(img);

                    var priceSpan = document.createElement('span');
                    priceSpan.classList.add('price');
                    var originalPrice = (item.original_price / 100).toFixed(2);
                    var finalPrice = (item.final_price / 100).toFixed(2);
                    priceSpan.innerHTML = `<em>$${originalPrice}</em>$${finalPrice}`;

                    thumbDiv.appendChild(imgLink);
                    thumbDiv.appendChild(priceSpan);

                    var downContentDiv = document.createElement('div');
                    downContentDiv.classList.add('down-content');

                    var categorySpan = document.createElement('span');
                    categorySpan.classList.add('category');
                    categorySpan.textContent = "Action"; // You can replace this with actual category if available

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
                    trendingContainer.appendChild(colDiv);
                }

                // Initial display of games
                var allItems = [];
                Object.keys(data).slice(6).forEach(function (category) { // Skip the first 6 categories
                    if (Array.isArray(data[category].items)) {
                        allItems = allItems.concat(data[category].items);
                    }
                });
                allItems.forEach(createGameElement);

                // Search functionality
                var searchInput = document.querySelector('.search-input input');
                searchInput.addEventListener('input', function () {
                    var query = searchInput.value.toLowerCase();
                    trendingContainer.innerHTML = ''; // Clear current displayed items
                    uniqueGameIds.clear(); // Clear the set to allow re-adding games
                    allItems.forEach(function (item) {
                        if (item.name.toLowerCase().includes(query)) {
                            createGameElement(item);
                        }
                    });
                });
            } else {
                console.error('Error fetching data:', xhr.status);
            }
        }
    };
    xhr.send();
});
