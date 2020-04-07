let http=require('http')
let ev=new (require('events'))()
let url=require('url')
let fs=require('fs')

let podaci=JSON.parse(fs.readFileSync("artikli.json"))

ev.on('dodavanje', function(data){
    console.log("Dodat je novi artikal: "+data)
})

http.createServer(function (request,response){
    let urlObj=url.parse(request.url,true,true)

    switch (request.method)
    {
        case "GET":
            switch (urlObj.pathname)
            {
                case "/":
                    response.end(JSON.stringify(podaci))
                    break;
                case "/pretraga":
                        response.end(JSON.stringify(podaci.filter(x=> x.kategorija==urlObj.query.kategorija)))
                    break;
                case "/opseg":
                        response.end(JSON.stringify(podaci.filter(x=> x.cena>=urlObj.query.min && x.cena<=urlObj.query.max)))
                    break;
                default:
                    response.end("Pogresna putanja!")
                    break;
            }    
            break;
        case "POST":
            switch (urlObj.pathname)
            {
                case "/kreirajNovi":
                    let novi={"id_artikla":podaci.length+1,"kategorija":urlObj.query.kategorija,"naziv":urlObj.query.naziv,"cena":urlObj.query.cena,"zalihe":urlObj.query.zalihe}
                    let t=new setImmediate(dodavanje, novi)
                    response.end(JSON.stringify(novi))
                    break;
                default:
                    response.end("Pogresna putanja!")
                    break;
            }   
            break;
        default:
            response.end("Pogresan metod! (GET | POST)")
            break;
    }
}).listen(5000)

function dodavanje(data){
    podaci.push(data)
    ev.emit('dodavanje', JSON.stringify(data))
}