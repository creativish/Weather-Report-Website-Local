const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // console.log(req.body.City)
  const query = req.body.City
  const units = "metric"
  const apiKey = "4f09b637245b96712d0dbca69d7476d1"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const descrip = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>weather description is " + descrip + ". <p/>")
      res.write("<h1> Temprature in " + query + " in " + temp + " degree celsious.!</h1>")
      res.write("<img src=" + imgURL +">")
      res.send();

    })
  })
});




app.listen(1010, function (req, res) {
  console.log("your server port is 1010");
})
