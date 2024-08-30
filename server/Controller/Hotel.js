const City = require("../Models/PlacesToVisit/City");
const Hotel = require("../Models/PlacesToVisit/Hotel");
const Place = require("../Models/PlacesToVisit/Place");
const Restaurant = require("../Models/PlacesToVisit/Restaurent");

const getAllHotels = async (req, res) => {
  try {
    const Hotels = await Restaurant.find();
    const newH = Hotels.filter(
      (hotel) => hotel.location.address?.split(",")[1] === " Pune"
    );
    console.log(newH);
    const Cities = await City.findOne({ name: "Pune" });
    console.log(Cities);
    newH.forEach((hotel) => {
      console.log(hotel._id);
      if (!Cities.restaurent.includes(hotel._id)) {
        Cities.restaurent.push(hotel._id);
      }
    });
    await Cities.save();
    res.json(newH);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getHotelById = async (req, res) => {
  try {
    const Hotel = await Hotel.findById(req.params.id);
    res.json(Hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  getAllHotels,
  getHotelById,
};
