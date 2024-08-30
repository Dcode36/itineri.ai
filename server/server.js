const express = require("express");
const axios = require("axios");
const { getAllHotels, getHotelById } = require("./Controller/Hotel");
const { getAvailableCities, getCity } = require("./Controller/City");
const { suggestPlaces } = require("./Controller/Ai");
const app = express();
app.use(express.json());
require("./Config/db");
require("./Models/PlacesToVisit/Restaurent");

//hotels routes
app.get("/hotels", getAllHotels);
app.get("/hotel/:id", getHotelById);

//cities routes
app.get("/cities", getAvailableCities);
app.get("/city/:id", getCity);

//ai routes
app.post("/suggestPlaces", suggestPlaces);
app.listen(3000, () => {
  console.log("Hello World");
});
