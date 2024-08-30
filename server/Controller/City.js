const City = require("../Models/PlacesToVisit/City");
const { main } = require("./functions");
const getCity = async (req, res) => {
  try {
    const interest = [
      "Historical",
      "Religious",
      "Adventure",
      "Shopping",
      "Food",
    ];
    const city = await City.findById(req.params.id).populate(
      `places${interest.includes("Food") ? " restaurent" : ""}`
    );
    console.log("city: ", city);
    const Places = city.places.filter((place) =>
      place.category.some((category) => interest.includes(category))
    );
    res.json({ Places, rest: city.restaurent });
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
