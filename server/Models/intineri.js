const itinerarySchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  otherUserEmail: {
    type: [String],
  },
  itineraryName: {
    type: String,
    required: true,
  },
  itineraryDescription: {
    type: String,
    required: true,
  },
  itineraryData: {
    type: Array,
    required: true,
  },
  itineraryCost: {
    type: Number,
    required: true,
  },
});
const Itinerary = mongoose.model("Itinerary", itinerarySchema);
