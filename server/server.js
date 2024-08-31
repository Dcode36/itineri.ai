const express = require("express");
const axios = require("axios");
const { getAllHotels, getHotelById } = require("./Controller/Hotel");
const { getAvailableCities, getCity } = require("./Controller/City");
const { suggestPlaces, suggestTrip } = require("./Controller/Ai");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())
require("./Config/db");
require("./Models/ModeOfTravel/Bus");

//hotels routes
app.get("/hotels", getAllHotels);
app.get("/hotel/:id", getHotelById);

//cities routes
app.get("/cities", getAvailableCities);
app.get("/city/:id", getCity);

//ai routes
app.post("/suggestPlaces", suggestPlaces);
app.post("/suggestTrip", suggestTrip);
app.listen(3000, () => {
  console.log("Hello World");
});
