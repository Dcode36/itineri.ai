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
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
    // console.log(chunk.choices[0]?.delta?.content);
  }
}
module.exports = { main };
// main();
