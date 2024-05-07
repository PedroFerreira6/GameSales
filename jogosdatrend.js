var dataSteam = [];
//coletar informaçoes do api
$.get('https://gamesales-production.up.railway.app/jogosemsaldo', function(data) {

  dataFuncPush(data);
    
    
  //console.log(data);
});
function dataFuncPush(dataGlobal){
    dataSteam.push(dataGlobal)
    
    
}
console.log(dataSteam);