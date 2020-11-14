const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const queryCity = req.body.cityName;
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=imperial&appid=46911f906cadc2dcfe25045b2f3726ef`
    )
    .then((response) => {
      res.write(
        `<h1>The Temperature now in ${response.data.name} is ${response.data.main.temp}</h1> `
      );
      res.write(
        `<h1>Also there is  ${response.data.weather[0].description} and humidity is ${response.data.main.humidity}</h1> `
      );
      res.send();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
