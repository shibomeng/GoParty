var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection');

router.get("/new_client", function(req, res) {
   res.render("new_client");
});

router.post("/new_client", function(req, res) {
    res.redirect("/")
});

module.exports = router;