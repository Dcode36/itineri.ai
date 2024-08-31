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
    temperature: 0.1,
    max_tokens: 4048,
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

module.exports = { main };
// main();
