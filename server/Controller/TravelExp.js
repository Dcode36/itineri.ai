const Bus = require("../Models/ModeOfTravel/Bus");
const Train = require("../Models/ModeOfTravel/Train");
const Flight = require("../Models/ModeOfTravel/Flight");
const getTravelRoutes = async (req, res) => {
  try {
    const { source, destination } = req.body;
    const buses = await Bus.find({ source, destination });
    const trains = await Train.find({ source, destination });
    const flights = await Flight.find({ source, destination });
    buses.sort((a, b) => a.prices.regular - b.prices.regular);
    trains.sort((a, b) => a.prices.sleeper - b.prices.sleeper);
    flights.sort((a, b) => a.prices.economy - b.prices.economy);
    res.status(200).json({ buses, trains, flights });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTravelRoutes };
