const City = require("../Models/PlacesToVisit/City");
const Place = require("../Models/PlacesToVisit/Place");

// async function retrivePlaces(city, intrest) {
//   const Places = await City.findById(city).populate("places");
//   return Places.places.filter((place) => place.intrest === intrest);
// }

// console.log(retrivePlaces("60d8d0f3f3f4c3f8b4c9b6b7", "Historical"));

// const getPlaces = async () => {
//   const Places = await Place.find();
//   console.log(Places);
// };

// // console.log(getPlaces());
// getPlaces();
const Groq = require("groq-sdk");

// // Initialize the Groq SDK with your API key
const groq = new Groq({
  apiKey: "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",
});

async function main(text) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: text,
      },
      {
        role: "user",
        content: "",
      },
    ],
    model: "llama-3.1-70b-versatile",
    temperature: 0.4,
    max_tokens: 6048,
    top_p: 1,
    stream: true,
    stop: null,
  });

  let completeResponse = ""; // Initialize an empty string to store the complete response

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
    const content = chunk.choices[0]?.delta?.content || "";
    completeResponse += content; // Append each chunk to the complete response
  }

  return completeResponse; // Return the complete response at the end
}

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyBdEbZ-23-Ps-lyxb2nxcTq16RzjZVvFBo";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.55,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function run(prompt) {
  const parts = [
    {text: "input: only Generate a JSON array for a 3-day trip to Kolhapur. For each day, include in sequence: places to visit, restaurants to dine at, activities to enjoy, and a hotel to stay in at the end of the day. I am particularly interested in the following places: {  location: {    address: 'Shalini Palace, Kolhapur, Maharashtra',    longitude: 74.2397,    latitude: 16.7035  },  _id: new ObjectId('66d22f97afafbca2e7fab715'),  name: 'Shalini Palace',  category: [ 'Historical', 'Romantic' ],  duration: '1.5 hours',  pricePerAdult: 100,  description: 'A beautiful palace on the shores of Rankala Lake, perfect for a romantic evening.',  imageUrl: 'https://www.trawell.in/admin/images/upload/796114550shalini-palace-kolhapur.jpg',  mapLink: ''}. Based on the number of days, prioritize the most important places and exclude those of lesser significance. Provide a detailed JSON array of the selected important places, including all relevant information. Additionally, create a JSON array of restaurants to visit from the following options: {  location: {    address: 'Shivaji Park, Kolhapur, Maharashtra',    longitude: 74.2317,    latitude: 16.705  },  _id: new ObjectId('66d237c4afafbca2e7fab75c'),  name: 'Dehaati',  imageUrl: 'https://content.jdmagicbox.com/comp/kolhapur/z8/0231px231.x231.131223145723.r6z8/catalogue/dehaati-kolhapuri-thalis-tararani-chowk-kolhapur-restaurants-2a4g44a.jpg',  cuisineTypes: [ 'Maharashtrian', 'Indian' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde529'),      rating: 4.5,      ratingCount: 150    }  ],  priceRange: '$$',  description: 'A popular restaurant known for authentic Kolhapuri cuisine.',  openingHours: 'Mon-Sun: 9am - 10pm',  contactNumber: '+91 231 2651234',  website: '',  mapLink: ''}, {  location: {    address: 'Near Mahalakshmi Temple, Kolhapur, Maharashtra',    longitude: 74.241,    latitude: 16.6954  },  _id: new ObjectId('66d237c4afafbca2e7fab75d'),  name: 'Gokul',  imageUrl: 'https://content.jdmagicbox.com/comp/pune/p7/020pxx20.xx20.140527131949.j7p7/catalogue/gokul-pure-veg-restaurant-kondhwa-budruk-pune-north-indian-restaurants-bfjb6nybhn.jpg',  cuisineTypes: [ 'Vegetarian', 'Indian' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde52a'),      rating: 4.2,      ratingCount: 200    }  ],  priceRange: '$',  description: 'A family-friendly restaurant offering a variety of vegetarian dishes.',  openingHours: 'Mon-Sun: 8am - 9pm',  contactNumber: '+91 231 2645678',  website: '',  mapLink: ''}, {  location: {    address: 'Station Road, Kolhapur, Maharashtra',    longitude: 74.2433,    latitude: 16.7033  },  _id: new ObjectId('66d237c4afafbca2e7fab75e'),  name: 'Opal',  imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1f/53/9e/93/opal-hotel.jpg',  cuisineTypes: [ 'Maharashtrian', 'Indian' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde52b'),      rating: 4.4,      ratingCount: 220    }  ],  priceRange: '$$',  description: 'A well-known place to enjoy traditional Kolhapuri Thali.',  openingHours: 'Mon-Sun: 11am - 10pm',  contactNumber: '+91 231 2654345',  website: '',  mapLink: ''}, {  location: {    address: 'Tarabai Park, Kolhapur, Maharashtra',    longitude: 74.2425,    latitude: 16.7097  },  _id: new ObjectId('66d237c4afafbca2e7fab75f'),  name: 'Padma Guest House',  imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/05/ae/49/33/padma-guest-house.jpg',  cuisineTypes: [ 'Indian', 'Maharashtrian' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde52c'),      rating: 4.3,      ratingCount: 180    }  ],  priceRange: '$$',  description: 'A favorite among locals for its homely food and cozy atmosphere.',  openingHours: 'Mon-Sun: 8am - 9pm',  contactNumber: '+91 231 2678910',  website: '',  mapLink: ''}, {  location: {    address: 'Shivaji Chowk, Kolhapur, Maharashtra',    longitude: 74.2367,    latitude: 16.7044  },  _id: new ObjectId('66d237c4afafbca2e7fab760'),  name: 'Hotel Parakh',  imageUrl: 'https://pbs.twimg.com/media/F0qJnwjaYAI3fsH.jpg',  cuisineTypes: [ 'Indian', 'Maharashtrian' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde52d'),      rating: 4,      ratingCount: 130    }  ],  priceRange: '$',  description: 'A budget-friendly spot for delicious Maharashtrian food.',  openingHours: 'Mon-Sun: 10am - 10pm',  contactNumber: '+91 231 2689123',  website: '',  mapLink: ''}, {  location: {    address: 'Rajaram Road, Kolhapur, Maharashtra',    longitude: 74.236,    latitude: 16.705  },  _id: new ObjectId('66d237c4afafbca2e7fab761'),  name: 'Hotel Shree Sagar',  imageUrl: 'https://static.wixstatic.com/media/feee33_f09ee996d36143dab433736a5db60bf8~mv2.jpg/v1/crop/x_535,y_0,w_705,h_500/fill/w_560,h_398,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/3.jpg',  cuisineTypes: [ 'South Indian', 'Indian' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde52e'),      rating: 4.1,      ratingCount: 160    }  ],  priceRange: '$',  description: 'Popular for its variety of South Indian dishes.',  openingHours: 'Mon-Sun: 7am - 10pm',  contactNumber: '+91 231 2698901',  website: '',  mapLink: ''}, {  location: {    address: 'Tarabai Road, Kolhapur, Maharashtra',    longitude: 74.2399,    latitude: 16.7098  },  _id: new ObjectId('66d237c4afafbca2e7fab762'),  name: 'Little Italy',  imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/106468123.jpg?k=c733953fc14d002d4782c1450fe82611d872b094358233b484296a3df7ec4714&o=&hp=1',  cuisineTypes: [ 'Italian', 'Continental' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde52f'),      rating: 4.5,      ratingCount: 190    }  ],  priceRange: '$$$',  description: 'A place to enjoy authentic Italian cuisine in Kolhapur.',  openingHours: 'Mon-Sun: 12pm - 11pm',  contactNumber: '+91 231 2651123',  website: '',  mapLink: ''}, {  location: {    address: 'Kawala Naka, Kolhapur, Maharashtra',    longitude: 74.2471,    latitude: 16.7057  },  _id: new ObjectId('66d237c4afafbca2e7fab763'),  name: 'Hotel Rajpurush',  imageUrl: '',  cuisineTypes: [ 'Maharashtrian', 'Indian' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde530'),      rating: 4.2,      ratingCount: 210    }  ],  priceRange: '$$',  description: 'Known for its spicy Kolhapuri cuisine and warm ambiance.',  openingHours: 'Mon-Sun: 11am - 10pm',  contactNumber: '+91 231 2697123',  website: 'https://content.jdmagicbox.com/comp/kolhapur/38/0231p231stds000138/catalogue/hotel-rajpurush-station-road-kolhapur-hotels-7oaz.jpg',  mapLink: ''}, {  location: {    address: 'Laxmipuri, Kolhapur, Maharashtra',    longitude: 74.2394,    latitude: 16.7054  },  _id: new ObjectId('66d237c4afafbca2e7fab764'),  name: 'Parakh Veg Restaurant',  imageUrl: 'https://content.jdmagicbox.com/comp/solapur/g6/9999px217.x217.221128123826.i3g6/catalogue/hotel-prakash-veg-family-restaurant-telangwadi-solapur-restaurants-hx1yk6r29n.jpg',  cuisineTypes: [ 'Vegetarian', 'Indian' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde531'),      rating: 4.1,      ratingCount: 170    }  ],  priceRange: '$',  description: 'A great spot for pure vegetarian meals.',  openingHours: 'Mon-Sun: 8am - 9pm',  contactNumber: '+91 231 2654321',  website: '',  mapLink: ''}, {  location: {    address: 'Shivaji Peth, Kolhapur, Maharashtra',    longitude: 74.2406,    latitude: 16.7072  },  _id: new ObjectId('66d237c4afafbca2e7fab765'),  name: 'Hotel Shrinivas',  imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/16/a7/cb/4d/front-view-day.jpg',  cuisineTypes: [ 'Indian', 'Chinese' ],  reviews: [    {      _id: new ObjectId('66d2e3f6db3360c0e3cde532'),      rating: 4,      ratingCount: 140    }  ],  priceRange: '$$',  description: 'Offers a variety of Indian and Chinese dishes in a casual setting.',  openingHours: 'Mon-Sun: 11am - 11pm',  contactNumber: '+91 231 2666789',  website: '',  mapLink: ''}. Include all available details for the chosen places and restaurants."},
    {text: "output: [\n {\n \"day\": 1,\n \"placesToVisit\": [\n {\n \"location\": {\n \"address\": \"Shalini Palace, Kolhapur, Maharashtra\",\n \"longitude\": 74.2397,\n \"latitude\": 16.7035\n },\n \"_id\": \"66d22f97afafbca2e7fab715\",\n \"name\": \"Shalini Palace\",\n \"category\": [\"Historical\", \"Romantic\"],\n \"duration\": \"1.5 hours\",\n \"pricePerAdult\": 100,\n \"description\": \"A beautiful palace on the shores of Rankala Lake, perfect for a romantic evening.\",\n \"imageUrl\": \"\",\n \"mapLink\": \"\"\n },\n {\n \"location\": {\n \"address\": \"Mahalakshmi Temple, Kolhapur, Maharashtra\",\n \"longitude\": 74.241,\n \"latitude\": 16.6954\n },\n \"_id\": \"66d22f97afafbca2e7fab716\",\n \"name\": \"Mahalakshmi Temple\",\n \"category\": [\"Historical\", \"Religious\"],\n \"duration\": \"1 hour\",\n \"pricePerAdult\": 0,\n \"description\": \"A famous temple dedicated to Goddess Mahalakshmi.\",\n \"imageUrl\": \"\",\n \"mapLink\": \"\"\n }\n ],\n \"restaurantsToDineAt\": [\n {\n \"location\": {\n \"address\": \"Shivaji Park, Kolhapur, Maharashtra\",\n \"longitude\": 74.2317,\n \"latitude\": 16.705\n },\n \"_id\": \"66d237c4afafbca2e7fab75c\",\n \"name\": \"Dehaati\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"Maharashtrian\", \"Indian\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c8709\",\n \"rating\": 4.5,\n \"ratingCount\": 150\n }\n ],\n \"priceRange\": \"$$\",\n \"description\": \"A popular restaurant known for authentic Kolhapuri cuisine.\",\n \"openingHours\": \"Mon-Sun: 9am - 10pm\",\n \"contactNumber\": \"+91 231 2651234\",\n \"website\": \"\",\n \"mapLink\": \"\"\n },\n {\n \"location\": {\n \"address\": \"Near Mahalakshmi Temple, Kolhapur, Maharashtra\",\n \"longitude\": 74.241,\n \"latitude\": 16.6954\n },\n \"_id\": \"66d237c4afafbca2e7fab75d\",\n \"name\": \"Gokul\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"Vegetarian\", \"Indian\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c870a\",\n \"rating\": 4.2,\n \"ratingCount\": 200\n }\n ],\n \"priceRange\": \"$\",\n \"description\": \"A family-friendly restaurant offering a variety of vegetarian dishes.\",\n \"openingHours\": \"Mon-Sun: 8am - 9pm\",\n \"contactNumber\": \"+91 231 2645678\",\n \"website\": \"\",\n \"mapLink\": \"\"\n }\n ],\n \"activitiesToEnjoy\": [\n {\n \"name\": \"Boat Ride on Rankala Lake\",\n \"description\": \"Enjoy a relaxing boat ride on the beautiful Rankala Lake.\",\n \"duration\": \"1 hour\",\n \"pricePerAdult\": 50\n }\n ],\n \"hotelToStayIn\": {\n \"location\": {\n \"address\": \"Station Road, Kolhapur, Maharashtra\",\n \"longitude\": 74.2433,\n \"latitude\": 16.7033\n },\n \"_id\": \"66d237c4afafbca2e7fab75e\",\n \"name\": \"Opal\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"Maharashtrian\", \"Indian\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c870b\",\n \"rating\": 4.4,\n \"ratingCount\": 220\n }\n ],\n \"priceRange\": \"$$\",\n \"description\": \"A well-known place to enjoy traditional Kolhapuri Thali.\",\n \"openingHours\": \"Mon-Sun: 11am - 10pm\",\n \"contactNumber\": \"+91 231 2654345\",\n \"website\": \"\",\n \"mapLink\": \"\"\n }\n },\n {\n \"day\": 2,\n \"placesToVisit\": [\n {\n \"location\": {\n \"address\": \"New Palace, Kolhapur, Maharashtra\",\n \"longitude\": 74.2385,\n \"latitude\": 16.7032\n },\n \"_id\": \"66d22f97afafbca2e7fab717\",\n \"name\": \"New Palace\",\n \"category\": [\"Historical\"],\n \"duration\": \"1.5 hours\",\n \"pricePerAdult\": 50,\n \"description\": \"A beautiful palace that showcases the history of Kolhapur.\",\n \"imageUrl\": \"\",\n \"mapLink\": \"\"\n },\n {\n \"location\": {\n \"address\": \"Bhavani Mandap, Kolhapur, Maharashtra\",\n \"longitude\": 74.2406,\n \"latitude\": 16.7072\n },\n \"_id\": \"66d22f97afafbca2e7fab718\",\n \"name\": \"Bhavani Mandap\",\n \"category\": [\"Historical\", \"Religious\"],\n \"duration\": \"1 hour\",\n \"pricePerAdult\": 0,\n \"description\": \"A historic temple dedicated to Goddess Bhavani.\",\n \"imageUrl\": \"\",\n \"mapLink\": \"\"\n }\n ],\n \"restaurantsToDineAt\": [\n {\n \"location\": {\n \"address\": \"Tarabai Park, Kolhapur, Maharashtra\",\n \"longitude\": 74.2425,\n \"latitude\": 16.7097\n },\n \"_id\": \"66d237c4afafbca2e7fab75f\",\n \"name\": \"Padma Guest House\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"Indian\", \"Maharashtrian\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c870c\",\n \"rating\": 4.3,\n \"ratingCount\": 180\n }\n ],\n \"priceRange\": \"$$\",\n \"description\": \"A favorite among locals for its homely food and cozy atmosphere.\",\n \"openingHours\": \"Mon-Sun: 8am - 9pm\",\n \"contactNumber\": \"+91 231 2678910\",\n \"website\": \"\",\n \"mapLink\": \"\"\n },\n {\n \"location\": {\n \"address\": \"Shivaji Chowk, Kolhapur, Maharashtra\",\n \"longitude\": 74.2367,\n \"latitude\": 16.7044\n },\n \"_id\": \"66d237c4afafbca2e7fab760\",\n \"name\": \"Hotel Parakh\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"Indian\", \"Maharashtrian\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c870d\",\n \"rating\": 4,\n \"ratingCount\": 130\n }\n ],\n \"priceRange\": \"$\",\n \"description\": \"A budget-friendly spot for delicious Maharashtrian food.\",\n \"openingHours\": \"Mon-Sun: 10am - 10pm\",\n \"contactNumber\": \"+91 231 2689123\",\n \"website\": \"\",\n \"mapLink\": \"\"\n }\n ],\n \"activitiesToEnjoy\": [\n {\n \"name\": \"Shopping at Shivaji Market\",\n \"description\": \"Explore the local market and shop for souvenirs.\",\n \"duration\": \"2 hours\",\n \"pricePerAdult\": 0\n }\n ],\n \"hotelToStayIn\": {\n \"location\": {\n \"address\": \"Rajaram Road, Kolhapur, Maharashtra\",\n \"longitude\": 74.236,\n \"latitude\": 16.705\n },\n \"_id\": \"66d237c4afafbca2e7fab761\",\n \"name\": \"Hotel Shree Sagar\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"South Indian\", \"Indian\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c870e\",\n \"rating\": 4.1,\n \"ratingCount\": 160\n }\n ],\n \"priceRange\": \"$\",\n \"description\": \"Popular for its variety of South Indian dishes.\",\n \"openingHours\": \"Mon-Sun: 7am - 10pm\",\n \"contactNumber\": \"+91 231 2698901\",\n \"website\": \"\",\n \"mapLink\": \"\"\n }\n },\n {\n \"day\": 3,\n \"placesToVisit\": [\n {\n \"location\": {\n \"address\": \"Rankala Lake, Kolhapur, Maharashtra\",\n \"longitude\": 74.2397,\n \"latitude\": 16.7035\n },\n \"_id\": \"66d22f97afafbca2e7fab719\",\n \"name\": \"Rankala Lake\",\n \"category\": [\"Natural\"],\n \"duration\": \"1 hour\",\n \"pricePerAdult\": 0,\n \"description\": \"A beautiful lake that offers boating and relaxation.\",\n \"imageUrl\": \"\",\n \"mapLink\": \"\"\n },\n {\n \"location\": {\n \"address\": \"Khasbag, Kolhapur, Maharashtra\",\n \"longitude\": 74.2385,\n \"latitude\": 16.7032\n },\n \"_id\": \"66d22f97afafbca2e7fab71a\",\n \"name\": \"Khasbag\",\n \"category\": [\"Historical\"],\n \"duration\": \"1.5 hours\",\n \"pricePerAdult\": 50,\n \"description\": \"A historic place that showcases the history of Kolhapur.\",\n \"imageUrl\": \"\",\n \"mapLink\": \"\"\n }\n ],\n \"restaurantsToDineAt\": [\n {\n \"location\": {\n \"address\": \"Laxmipuri, Kolhapur, Maharashtra\",\n \"longitude\": 74.2394,\n \"latitude\": 16.7054\n },\n \"_id\": \"66d237c4afafbca2e7fab764\",\n \"name\": \"Parakh Veg Restaurant\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"Vegetarian\", \"Indian\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c8711\",\n \"rating\": 4.1,\n \"ratingCount\": 170\n }\n ],\n \"priceRange\": \"$\",\n \"description\": \"A great spot for pure vegetarian meals.\",\n \"openingHours\": \"Mon-Sun: 8am - 9pm\",\n \"contactNumber\": \"+91 231 2654321\",\n \"website\": \"\",\n \"mapLink\": \"\"\n },\n {\n \"location\": {\n \"address\": \"Shivaji Peth, Kolhapur, Maharashtra\",\n \"longitude\": 74.2406,\n \"latitude\": 16.7072\n },\n \"_id\": \"66d237c4afafbca2e7fab765\",\n \"name\": \"Hotel Shrinivas\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"Indian\", \"Chinese\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c8712\",\n \"rating\": 4,\n \"ratingCount\": 140\n }\n ],\n \"priceRange\": \"$$\",\n \"description\": \"Offers a variety of Indian and Chinese dishes in a casual setting.\",\n \"openingHours\": \"Mon-Sun: 11am - 11pm\",\n \"contactNumber\": \"+91 231 2666789\",\n \"website\": \"\",\n \"mapLink\": \"\"\n }\n ],\n \"activitiesToEnjoy\": [\n {\n \"name\": \"Visit the Kolhapur Museum\",\n \"description\": \"Explore the history and culture of Kolhapur.\",\n \"duration\": \"2 hours\",\n \"pricePerAdult\": 50\n }\n ],\n \"hotelToStayIn\": {\n \"location\": {\n \"address\": \"Tarabai Road, Kolhapur, Maharashtra\",\n \"longitude\": 74.2399,\n \"latitude\": 16.7098\n },\n \"_id\": \"66d237c4afafbca2e7fab762\",\n \"name\": \"Little Italy\",\n \"imageUrl\": \"\",\n \"cuisineTypes\": [\"Italian\", \"Continental\"],\n \"reviews\": [\n {\n \"_id\": \"66d2a7fcd835e6003b2c870f\",\n \"rating\": 4.5,\n \"ratingCount\": 190\n }\n ],\n \"priceRange\": \"$$$\",\n \"description\": \"A place to enjoy authentic Italian cuisine in Kolhapur.\",\n \"openingHours\": \"Mon-Sun: 12pm - 11pm\",\n \"contactNumber\": \"+91 231 2651123\",\n \"website\": \"\",\n \"mapLink\": \"\"\n }\n }\n ]"},
    {text: `input: ${prompt}`},
    {text: "output: "},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
  });
  console.log(result.response.text());
  return result.response.text();
}

// run();

// run(promt);


module.exports = { main, run };
// main();
