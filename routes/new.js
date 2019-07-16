var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection');

router.get("/new", function(req, res) {
   res.render("new");
});

router.post("/new", function(req, res) {
    res.redirect("/")
});

module.exports = router;