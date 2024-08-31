const Bus = require("../Models/ModeOfTravel/Bus");
const Flight = require("../Models/ModeOfTravel/Flight");
const Train = require("../Models/ModeOfTravel/Train");
const City = require("../Models/PlacesToVisit/City");
const { main } = require("./functions");
const getCity = async (req, res) => {
  try {
    const interest = req.body.interest;
    const minBudget = req.body.minBudget;
    const maxBudget = req.body.maxBudget;
    const days = req.body.days;
    const city = await City.findOne({ name: req.body.city }).populate(
      "places restaurent hotels"
    );
    const Buses =await Bus.find({ source: city.name });
    const Trains =await Train.find({ source: city.name });
    const Flights =await Flight.find({ source: city.name });

    console.log("city: ", city);
    const Places = city.places.filter((place) =>
      place.category.some((category) => interest.includes(category))
    );
    res.json({
      Places,
      restaurent: city.restaurent,
      hotels: city.hotels,
      transport: { Buses, Trains, Flights },
    });
    // main("I want to visit "+city.name+" and I am interested in following places "+Places.map((place)=>place.name).join(", ")+"create traveling plan for it , i will be at the Bus stand at 5.00pm . just give me the json of places to visit and timeline");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAvailableCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCity,
  getAvailableCities,
};
