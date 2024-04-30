// Make a GET request to your Node.js server endpoint
$.get('http://localhost:3000/jogosemsaldo', function(data) {
  // Handle the response data (list of games on sale)
  // You can display this data on your website however you like
  console.log(data);
});