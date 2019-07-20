var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_order", function (req, res) {
    res.render("query_order");
});

router.post("/query_order", function (req, res) {
});

module.exports = router;