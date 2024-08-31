const saveIntinerary = async (req, res) => {
  try {
    const {
      userEmail,
      otherUserEmail,
      itineraryName,
      itineraryDescription,
      itineraryData,
      itineraryCost,
    } = req.body;
    const newIntinerary = new Itinerary({
      userEmail,
      otherUserEmail,
      itineraryName,
      itineraryDescription,
      itineraryData,
      itineraryCost,
    });
    res.status(201).json(newIntinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
