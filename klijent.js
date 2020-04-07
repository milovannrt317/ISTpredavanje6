const http = require('http');

const options = [{
    hostname: 'localhost',
    port: '5000',
    path: '/',
    method: "GET"
},
{
    hostname: 'localhost',
    port: '5000',
    path: '/pretraga?kategorija=voce',
    method: "GET"
},
{
    hostname: 'localhost',
    port: '5000',
    path: '/opseg?min=10&max=50',
    method: "GET"
},
{
    hostname: 'localhost',
    port: '5000',
    path: '/kreirajNovi?kategorija=test&naziv=test&cena=100&zalihe=120',
    method: "POST"
}];
function handleResponse(response) {
    var serverData = '';
    response.on('data', function (chunk) {
        serverData += chunk;
    });
    response.on('end', function () {
        console.log(serverData);
    });
}
options.forEach(x=>{
    http.request(x, function (response) {
        console.log("\nPutanja: "+x.path+" metoda: "+x.method)
        handleResponse(response);
    }).end();
})