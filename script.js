var dataSteam = [];
// Make a GET request to your Node.js server endpoint
$.get('https://gamesales-production.up.railway.app/jogosemsaldo', function(data) {
  // Handle the response data (list of games on sale)
  // You can display this data on your website however you like
        
  dataFuncPush(data);
    
    
  //console.log(data);
});
function dataFuncPush(dataGlobal){
    dataSteam.push(dataGlobal)
    
}
console.log(dataSteam);


