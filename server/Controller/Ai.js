const Bus = require("../Models/ModeOfTravel/Bus");
const Flight = require("../Models/ModeOfTravel/Flight");
const Train = require("../Models/ModeOfTravel/Train");
const City = require("../Models/PlacesToVisit/City");
const { run } = require("./functions");
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

const cache = {};

const suggestTrip = async (req, res) => {
  console.log(req.body);
  try {
    const { city, interest, days } = req.body;

    // Generate a unique cache key based on the request parameters
    const cacheKey = `${city}-${interest.join(',')}-${days}`;

    // Check if the result is already in the cache
    if (cache[cacheKey]) {
      console.log('Cache hit');
      return res.json(cache[cacheKey]);
    }

    // Fetch data from the database
    const Places = await City.findOne({ name: city }).populate(
      "places restaurent hotels"
    );

    const suggestedPlaces = Places.places.filter((place) =>
      place.category.some((category) => interest.includes(category))
    );

    const result = await run(
      `only Generate a JSON array for a ${days}-day trip to ${
        Places.name
      }. For each day, include in sequence: places to visit, restaurants to dine at, activities to enjoy, and a hotel to stay in at the end of the day. I am particularly interested in the following places: ${suggestedPlaces.join(
        ", "
      )}. Based on the number of days, prioritize the most important places and exclude those of lesser significance. Provide a detailed JSON array of the selected important places, including all relevant information. Additionally, create a JSON array of restaurants to visit from the following options: ${Places.restaurent.join(
        ", "
      )}. Include all available details for the chosen places and restaurants.`
    );

    // Store the result in the cache
    cache[cacheKey] = result;

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const suggestTripDemo = async (req, res) => {
  res.json({
    jsonString:
      '{\n  "trip": [\n    {\n      "day": 1,\n      "placesToVisit": [\n        {\n          "location": {\n            "address": "Shalini Palace, Kolhapur, Maharashtra",\n            "longitude": 74.2397,\n            "latitude": 16.7035\n          },\n          "_id": "66d22f97afafbca2e7fab715",\n          "name": "Shalini Palace",\n          "category": ["Historical", "Romantic"],\n          "duration": "1.5 hours",\n          "pricePerAdult": 100,\n          "description": "A beautiful palace on the shores of Rankala Lake, perfect for a romantic evening.",\n          "imageUrl": "",\n          "mapLink": ""\n        },\n        {\n          "location": {\n            "address": "Mahalakshmi Temple, Kolhapur, Maharashtra",\n            "longitude": 74.241,\n            "latitude": 16.6954\n          },\n          "_id": "66d22f97afafbca2e7fab716",\n          "name": "Mahalakshmi Temple",\n          "category": ["Historical", "Religious"],\n          "duration": "1 hour",\n          "pricePerAdult": 0,\n          "description": "A famous temple dedicated to Goddess Mahalakshmi.",\n          "imageUrl": "",\n          "mapLink": ""\n        }\n      ],\n      "restaurantsToDineAt": [\n        {\n          "location": {\n            "address": "Shivaji Park, Kolhapur, Maharashtra",\n            "longitude": 74.2317,\n            "latitude": 16.705\n          },\n          "_id": "66d237c4afafbca2e7fab75c",\n          "name": "Dehaati",\n          "imageUrl": "",\n          "cuisineTypes": ["Maharashtrian", "Indian"],\n          "reviews": [\n            {\n              "_id": "66d2a7fcd835e6003b2c8709",\n              "rating": 4.5,\n              "ratingCount": 150\n            }\n          ],\n          "priceRange": "$$",\n          "description": "A popular restaurant known for authentic Kolhapuri cuisine.",\n          "openingHours": "Mon-Sun: 9am - 10pm",\n          "contactNumber": "+91 231 2651234",\n          "website": "",\n          "mapLink": ""\n        },\n        {\n          "location": {\n            "address": "Near Mahalakshmi Temple, Kolhapur, Maharashtra",\n            "longitude": 74.241,\n            "latitude": 16.6954\n          },\n          "_id": "66d237c4afafbca2e7fab75d",\n          "name": "Gokul",\n          "imageUrl": "",\n          "cuisineTypes": ["Vegetarian", "Indian"],\n          "reviews": [\n            {\n              "_id": "66d2a7fcd835e6003b2c870a",\n              "rating": 4.2,\n              "ratingCount": 200\n            }\n          ],\n          "priceRange": "$",\n          "description": "A family-friendly restaurant offering a variety of vegetarian dishes.",\n          "openingHours": "Mon-Sun: 8am - 9pm",\n          "contactNumber": "+91 231 2645678",\n          "website": "",\n          "mapLink": ""\n        }\n      ],\n      "activitiesToEnjoy": [\n        {\n          "name": "Boat Ride on Rankala Lake",\n          "description": "Enjoy a relaxing boat ride on the beautiful Rankala Lake.",\n          "duration": "1 hour",\n          "pricePerAdult": 50\n        }\n      ],\n      "hotelToStayIn": {\n        "location": {\n          "address": "Station Road, Kolhapur, Maharashtra",\n          "longitude": 74.2433,\n          "latitude": 16.7033\n        },\n        "_id": "66d237c4afafbca2e7fab75e",\n        "name": "Opal",\n        "imageUrl": "",\n        "cuisineTypes": ["Maharashtrian", "Indian"],\n        "reviews": [\n          {\n            "_id": "66d2a7fcd835e6003b2c870b",\n            "rating": 4.4,\n            "ratingCount": 220\n          }\n        ],\n        "priceRange": "$$",\n        "description": "A well-known place to enjoy traditional Kolhapuri Thali.",\n        "openingHours": "Mon-Sun: 11am - 10pm",\n        "contactNumber": "+91 231 2654345",\n        "website": "",\n        "mapLink": ""\n      }\n    },\n    {\n      "day": 2,\n      "placesToVisit": [\n        {\n          "location": {\n            "address": "New Palace, Kolhapur, Maharashtra",\n            "longitude": 74.2385,\n            "latitude": 16.7032\n          },\n          "_id": "66d22f97afafbca2e7fab717",\n          "name": "New Palace",\n          "category": ["Historical"],\n          "duration": "1.5 hours",\n          "pricePerAdult": 50,\n          "description": "A beautiful palace that showcases the history of Kolhapur.",\n          "imageUrl": "",\n          "mapLink": ""\n        },\n        {\n          "location": {\n            "address": "Bhavani Mandap, Kolhapur, Maharashtra",\n            "longitude": 74.2406,\n            "latitude": 16.7072\n          },\n          "_id": "66d22f97afafbca2e7fab718",\n          "name": "Bhavani Mandap",\n          "category": ["Historical", "Religious"],\n          "duration": "1 hour",\n          "pricePerAdult": 0,\n          "description": "A historic temple dedicated to Goddess Bhavani.",\n          "imageUrl": "",\n          "mapLink": ""\n        }\n      ],\n      "restaurantsToDineAt": [\n        {\n          "location": {\n            "address": "Tarabai Park, Kolhapur, Maharashtra",\n            "longitude": 74.2425,\n            "latitude": 16.7097\n          },\n          "_id": "66d237c4afafbca2e7fab75f",\n          "name": "Padma Guest House",\n          "imageUrl": "",\n          "cuisineTypes": ["Indian", "Maharashtrian"],\n          "reviews": [\n            {\n              "_id": "66d2a7fcd835e6003b2c870c",\n              "rating": 4.3,\n              "ratingCount": 180\n            }\n          ],\n          "priceRange": "$$",\n          "description": "A favorite among locals for its homely food and cozy atmosphere.",\n          "openingHours": "Mon-Sun: 8am - 9pm",\n          "contactNumber": "+91 231 2678910",\n          "website": "",\n          "mapLink": ""\n        },\n        {\n          "location": {\n            "address": "Shivaji Chowk, Kolhapur, Maharashtra",\n            "longitude": 74.2367,\n            "latitude": 16.7044\n          },\n          "_id": "66d237c4afafbca2e7fab760",\n          "name": "Hotel Parakh",\n          "imageUrl": "",\n          "cuisineTypes": ["Indian", "Maharashtrian"],\n          "reviews": [\n            {\n              "_id": "66d2a7fcd835e6003b2c870d",\n              "rating": 4,\n              "ratingCount": 130\n            }\n          ],\n          "priceRange": "$",\n          "description": "A budget-friendly spot for delicious Maharashtrian food.",\n          "openingHours": "Mon-Sun: 10am - 10pm",\n          "contactNumber": "+91 231 2689123",\n          "website": "",\n          "mapLink": ""\n        }\n      ],\n      "activitiesToEnjoy": [\n        {\n          "name": "Shopping at Shivaji Market",\n          "description": "Explore the local market and shop for souvenirs.",\n          "duration": "2 hours",\n          "pricePerAdult": 0\n        }\n      ],\n      "hotelToStayIn": {\n        "location": {\n          "address": "Rajaram Road, Kolhapur, Maharashtra",\n          "longitude": 74.236,\n          "latitude": 16.705\n        },\n        "_id": "66d237c4afafbca2e7fab761",\n        "name": "Hotel Shree Sagar",\n        "imageUrl": "",\n        "cuisineTypes": ["South Indian", "Indian"],\n        "reviews": [\n          {\n            "_id": "66d2a7fcd835e6003b2c870e",\n            "rating": 4.1,\n            "ratingCount": 160\n          }\n        ],\n        "priceRange": "$",\n        "description": "Popular for its variety of South Indian dishes.",\n        "openingHours": "Mon-Sun: 7am - 10pm",\n        "contactNumber": "+91 231 2698901",\n        "website": "",\n        "mapLink": ""\n      }\n    },\n    {\n      "day": 3,\n      "placesToVisit": [\n        {\n          "location": {\n            "address": "Rankala Lake, Kolhapur, Maharashtra",\n            "longitude": 74.2397,\n            "latitude": 16.7035\n          },\n          "_id": "66d22f97afafbca2e7fab719",\n          "name": "Rankala Lake",\n          "category": ["Natural"],\n          "duration": "1 hour",\n          "pricePerAdult": 0,\n          "description": "A beautiful lake that offers boating and relaxation.",\n          "imageUrl": "",\n          "mapLink": ""\n        },\n        {\n          "location": {\n            "address": "Khasbag, Kolhapur, Maharashtra",\n            "longitude": 74.2385,\n            "latitude": 16.7032\n          },\n          "_id": "66d22f97afafbca2e7fab71a",\n          "name": "Khasbag",\n          "category": ["Historical"],\n          "duration": "1.5 hours",\n          "pricePerAdult": 50,\n          "description": "A historic place that showcases the history of Kolhapur.",\n          "imageUrl": "",\n          "mapLink": ""\n        }\n      ],\n      "restaurantsToDineAt": [\n        {\n          "location": {\n            "address": "Laxmipuri, Kolhapur, Maharashtra",\n            "longitude": 74.2394,\n            "latitude": 16.7054\n          },\n          "_id": "66d237c4afafbca2e7fab764",\n          "name": "Parakh Veg Restaurant",\n          "imageUrl": "",\n          "cuisineTypes": ["Vegetarian", "Indian"],\n          "reviews": [\n            {\n              "_id": "66d2a7fcd835e6003b2c8711",\n              "rating": 4.1,\n              "ratingCount": 170\n            }\n          ],\n          "priceRange": "$",\n          "description": "A great spot for pure vegetarian meals.",\n          "openingHours": "Mon-Sun: 8am - 9pm",\n          "contactNumber": "+91 231 2654321",\n          "website": "",\n          "mapLink": ""\n        },\n        {\n          "location": {\n            "address": "Shivaji Peth, Kolhapur, Maharashtra",\n            "longitude": 74.2406,\n            "latitude": 16.7072\n          },\n          "_id": "66d237c4afafbca2e7fab765",\n          "name": "Hotel Shrinivas",\n          "imageUrl": "",\n          "cuisineTypes": ["Indian", "Chinese"],\n          "reviews": [\n            {\n              "_id": "66d2a7fcd835e6003b2c8712",\n              "rating": 4,\n              "ratingCount": 140\n            }\n          ],\n          "priceRange": "$$",\n          "description": "Offers a variety of Indian and Chinese dishes in a casual setting.",\n          "openingHours": "Mon-Sun: 11am - 11pm",\n          "contactNumber": "+91 231 2666789",\n          "website": "",\n          "mapLink": ""\n        }\n      ],\n      "activitiesToEnjoy": [\n        {\n          "name": "Visit the Kolhapur Museum",\n          "description": "Explore the history and culture of Kolhapur.",\n          "duration": "2 hours",\n          "pricePerAdult": 50\n        }\n      ],\n      "hotelToStayIn": {\n        "location": {\n          "address": "Tarabai Road, Kolhapur, Maharashtra",\n          "longitude": 74.2399,\n          "latitude": 16.7098\n        },\n        "_id": "66d237c4afafbca2e7fab762",\n        "name": "Little Italy",\n        "imageUrl": "",\n        "cuisineTypes": ["Italian", "Continental"],\n        "reviews": [\n          {\n            "_id": "66d2a7fcd835e6003b2c870f",\n            "rating": 4.5,\n            "ratingCount": 190\n          }\n        ],\n        "priceRange": "$$$",\n        "description": "A place to enjoy authentic Italian cuisine in Kolhapur.",\n        "openingHours": "Mon-Sun: 12pm - 11pm",\n        "contactNumber": "+91 231 2651123",\n        "website": "",\n        "mapLink": ""\n      }\n    }\n  ]\n}',
  });
};

// const getBestTravel = async (req, res) => {
//   try {
//     const { source, destination, minBudget, maxBudget } = req.body;
//     const Buses = await Bus.find({ source, destination });
//     console.log(Buses);
//     const Trains = await Train.find({ source, destination });
//     const Flights = await Flight.find({ source, destination });
//     const city = await City.findOne({ name: source }).populate("hotels");
//     const hotels = city.hotels;

//     const prompt = `by looking at the available options of travel and hotels, i want the best travel plan in the budget of ${minBudget} to ${maxBudget} Bus options are ${Buses.map(
//       (bus) => bus
//     ).join(", ")} Train options are ${Trains.map((train) => train).join(
//       ", "
//     )} Flight options are ${Flights.map((flight) => flight).join(
//       ", "
//     )} Hotel options are ${hotels
//       .map((hotel) => hotel)
//       .join(", ")} give the array of best travel plan`;
//     const result = await runs(prompt);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  suggestPlaces,
  suggestTrip,
  suggestTripDemo,
  // getBestTravel,
};
