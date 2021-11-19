const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
      
    res.sendFile(__dirname + '/index.html');
})
app.post('/', function(req, res) {
    const city = req.body.cityName;
    const appid = "be472880fc2c9042fed08dbefff9ba6e";
    const metric = "metric";
    const url = 'https://api.openweathermap.org/data/2.5/weather?q= ' + city + '&appid=' + appid +'&units=' + metric + '';

    https.get(url, function(response) {
    console.log('Response code is ', response.statusCode);
    response.on('data', function(data) {
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon+ "@2x.png"
        res.write("<p> The weather is " + weatherDesc + "</p>");
        res.write(`<h1>The temprature in ${city} is ${temp} degree celsius </h1>`);
        res.write("<img src=" + imageUrl + " >");
        res.send();
    })
})

})


app.listen(3000, function(){
    console.log('server is running at port 3000');
})
