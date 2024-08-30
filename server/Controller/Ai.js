const City = require("../Models/PlacesToVisit/City");

const suggestPlaces = async (req, res) => {
    console.log(req.body);
  try {
    const { city, intrest } = req.body;
    const Places = await City.findById(city).populate("places");
    console.log(Places);
    const suggestedPlaces = Places.places.filter((place) =>
      intrest.includes(place.category)
    );
    console.log("suggested:",suggestedPlaces);
    res.json(suggestedPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  suggestPlaces,
};
