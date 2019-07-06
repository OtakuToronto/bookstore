require('dotenv').config();
const express = require("express");
const app = express();
const axios = require("axios");
const Book = require('./models/Book');


const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
// const apiRoutes = require('./routes/api-routes')
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







app.get("/api/books", (req, res) => {
    Book.find().then(
        (booksData) => {
            res.json(booksData);
        }
    ).catch(
        (err) => {
            res.json({error: err});
        }
    );
});

app.post("/search", (req, res) => {
    // set bookTitle to the req.body.title with spaces replaced with plus signs(+)
    let bookTitle = req.body.title.replace(/\s/g, "+");
    axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${process.env.GBOOKS_KEY}`
    ).then(
        (response) => {
            res.json(response.data.items)
        }
    ).catch(
        (err) => {
            res.json({error: error})
        }
    );
});

app.post("/api/books", (req, res) => {
    Book.create(req.body).then(
        (response) => {
            res.json({successful: response});
        }
    ).catch(
        (err) => {
            res.json({error: err});
        }
    );
});

app.delete("/api/books/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id).then(
        (response) => {
            res.json({successful: response});
        }
    ).catch(
        (err) => {
            rres.json({error: err});
        }
    );
});




























app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});