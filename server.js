require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const apiRoutes = require('./routes/api-routes')
const mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017/googlebooks";

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


mongoose.connect(mongoURL, {useNewUrlParser: true})
  .then(() => {
    console.log("🗄 ==> Successfully connected to mongoDB.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });

// app.use(apiRoutes)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});