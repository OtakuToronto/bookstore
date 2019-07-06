require("dotenv").config();
const axios = require("axios");
const Book = require('../models/Book');
const path = require("path");
const express = require('express')
const router = express.Router()

router.get("/api/books", (req, res) => {
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

router.post("/search", (req, res) => {
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

router.post("/api/books", (req, res) => {
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

router.delete("/api/books/:id", (req, res) => {
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


module.exports = router
// Send every other request to the React app
// Define any API routes before this runs
