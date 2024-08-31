const City = require("../Models/PlacesToVisit/City");
const { main } = require("./functions");
function extractJsonString(text) {
  const startIndex = text.indexOf("```json");
  console.log(startIndex);
  const endIndex = text.indexOf("```", startIndex + 1);
  console.log(endIndex);
  if (startIndex === -1 || endIndex === -1) {
    return null; // or handle the error as needed
  }

  // Adjusting indices to exclude the ```json and ```
  let jsonString = text.substring(startIndex + 8, endIndex).trim();
  jsonString = jsonString.replaceAll(/\\n/g, "");
  console.log(jsonString);
  return jsonString;
}
const suggestPlaces = async (req, res) => {
  console.log(req.body);
  try {
    const { city, interest, days } = req.body;
    const Places = await City.findById(city).populate("places restaurent");
    console.log(Places);
    const suggestedPlaces = Places.places.filter((place) =>
      place.category.some((category) => interest.includes(category))
    );
    const text = `Generate a JSON array for a 2-day trip to Kolhapur. For each day, include in sequence: places to visit, restaurants to dine at, activities to enjoy, and a hotel to stay in at the end of the day. I am particularly interested in the following places: ${suggestedPlaces.join(
      ", "
    )}. Based on the number of days, prioritize the most important places and exclude those of lesser significance. Provide a detailed JSON array of the selected important places, including all relevant information. Additionally, create a JSON array of restaurants to visit from the following options: ${Places.restaurent.join(
      ", "
    )}. Include all available details for the chosen places and restaurants.`;
    console.log(text);
    // const result = main(
    //   `I want to visit ${
    //     Places.name
    //   } and I have ${days} days to visit. I am interested in the following places: ${suggestedPlaces
    //     .map((place) => place)
    //     .join(
    //       ", "
    //     )}. Given the number of days, please filter out the less important places and provide a JSON array of the important places to visit, including all their details. Additionally, provide a JSON array of restaurants to visit from the following options: ${Places.restaurent
    //     .map((place) => place)
    //     .join(
    //       ", "
    //     )}. Please include all parameters of the selected places and restaurants from the provided info.`

    //   // " and hotels: " +
    //   // Places.hotel.map((place) => place.name).join(", ")
    // );
    // console.log("suggested:", suggestedPlaces);
    res.json({ suggestedPlaces, rest: Places.restaurent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const suggestTrip = async (req, res) => {
  console.log(req.body);
  try {
    const { city, interest, days } = req.body;
    const Places = await City.findById(city).populate("places restaurent");
    console.log(Places);
    const suggestedPlaces = Places.places.filter((place) =>
      place.category.some((category) => interest.includes(category))
    );
    const result = await main(
      `only Generate a JSON array for a ${days}-day trip to ${
        Places.name
      }. For each day, include in sequence: places to visit, restaurants to dine at, activities to enjoy, and a hotel to stay in at the end of the day. I am particularly interested in the following places: ${suggestedPlaces.join(
        ", "
      )}. Based on the number of days, prioritize the most important places and exclude those of lesser significance. Provide a detailed JSON array of the selected important places, including all relevant information. Additionally, create a JSON array of restaurants to visit from the following options: ${Places.restaurent.join(
        ", "
      )}. Include all available details for the chosen places and restaurants.`
    );
    //     const result =
    //       main(`Generate a detailed itinerary for a trip based on the following inputs:

    // Number of Days: ${days}
    // Number of People: 2
    // Destination: ${Places.name}
    // Places to Visit: ${suggestedPlaces.map((place) => place.name).join(", ")}
    // Restaurants to Visit: ${Places.restaurent.map((place) => place.name).join(", ")}
    // Create a JSON array where each entry represents a day of the trip. Each day's itinerary should include:

    // Day Number: Sequential day number of the trip.
    // combine all the places to visit, restaurants to visit, activities to enjoy, and a hotel to stay in at the end of the day.

    // `);
    console.log("result:", result);
    const jsonString = extractJsonString(result);
    // console.log("suggested:", suggestedPlaces);
    res.json(jsonString);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  suggestPlaces,
  suggestTrip,
};
