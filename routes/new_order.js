var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/new_order", function(req, res) {
   res.render("new_order");
});

router.post("/new_order", function(req, res) {
    
});

module.exports = router;