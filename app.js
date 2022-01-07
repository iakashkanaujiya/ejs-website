const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// Home route
app.get("/", function (req, res) {
    res.render("home");
});

// Product pages routes

app.get("/essential-oil", function (req, res) {
    res.render("essential-oil");
});

app.get("/absolute-oil", function (req, res) {
    res.render("absolute-oil");
});

app.get("/floral-water", function (req, res) {
    res.render("floral-water")
});

app.get("/attar", function (req, res) {
    res.render("attar")
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

// Form data
app.post("/sumit-form", function (req, res) {
    if(!req.body) {
        res.sendStatus(404); 
    } else {
        res.sendStatus(200); 
    }
});

// Product detalis 
app.get("/textfiles/:productType/:productName", (req, res) => {
    var productType = req.params.productType;
    var productName = req.params.productName;
    res.sendFile(__dirname + `/textfiles/${productType}/${productName}.json`);
});

// 404 request
app.use(function (req, res, next) {
    res.status(404).render("404", {requestedUrl: req.url});
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});