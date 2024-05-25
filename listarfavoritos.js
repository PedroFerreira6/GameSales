// Firebase database
import { database } from './login_register/js/firebase-config.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function () {
    const uid = localStorage.getItem('uid');
    if (!uid) {
        // If no user is logged in, redirect to the index page
        window.location.href = "index.html";
        return;
    }

    // Get the reference to the user's favorites
    const userRef = ref(database, `users/${uid}/favorites`);

    // Retrieve the list of favorite game IDs
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const favoriteGameIds = Object.keys(snapshot.val());

            // Fetch the data of all games
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://gamesales-production.up.railway.app/jogosemsaldo', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);

                        var trendingContainer = document.querySelector('.trending-box'); // Select the existing trending-box container

                        // Track unique game IDs to avoid duplicates
                        var uniqueGameIds = new Set();

                        // Function to process each game item
                        function processGameItem(item) {
                            if (!item || !item.id) {
                                console.error("Invalid item or item.id:", item);
                                return;
                            }

                            // Check if the game ID is in the user's favorites
                            if (favoriteGameIds.includes(item.id.toString()) && !uniqueGameIds.has(item.id)) {
                                uniqueGameIds.add(item.id); // Add the game ID to the set of processed IDs

                                // Create the column div and other elements (similar to previous code)
                                var colDiv = document.createElement('div');
                                var classOrder = ['col-lg-3', 'col-md-6', 'align-self-center', 'mb-30', 'trending-items', 'adv'];
                                classOrder.forEach(className => colDiv.classList.add(className));

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
                                categorySpan.textContent = "Action";

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
                        }

                        // Process each game item in all categories
                        Object.keys(data).forEach(category => {
                            if (Array.isArray(data[category].items)) {
                                data[category].items.forEach(processGameItem);
                            } else {
                                console.error("Invalid category items:", data[category]);
                            }
                        });
                    } else {
                        console.error('Error fetching data:', xhr.status);
                    }
                }
            };

            xhr.send();
        } else {
            console.log("No favorite games found for the user");
        }
    }).catch((error) => {
        console.error("Error retrieving favorite games:", error);
    });
});
