var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_supplier", function(req, res) {
    
    res.render('query_supplier');
});

router.post("/query_supplier", function(req, res) {
    res.render('query_supplier');
});

module.exports = router;