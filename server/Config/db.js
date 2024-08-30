const mongoose = require("mongoose");

// Replace <connection-string> with your actual MongoDB connection string
const connectionString =
  "mongodb+srv://TIP:TIP@cluster0.kgr61gs.mongodb.net/ItenaryAI";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
