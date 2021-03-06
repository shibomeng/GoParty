var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/", function(req, res) {
    res.render("landingPage");
});

router.get("/home", function(req, res) {
    res.render("home");
});

router.get("/new_client", function(req, res) {
   res.render("new_client");
});

router.post("/new_client", function(req, res) {
    var clientId = req.body.ClientID;
    var budget = parseFloat (req.body.Budget);
    var phone = req.body.Phone;
    var address = req.body.Address;

    var sql = "INSERT INTO CLIENT (Client_ID, Budget,Phone_Num, Address) VALUES (?, ?, ?, ?)";
    connection.query(sql, [clientId, budget, phone, address], function (err, result) {
        if (err) {
            req.flash("error", err.sqlMessage);
            res.redirect("/home");
        }
        req.flash("success", "Successfully Added New Client!");
        res.redirect("/home");
    });
    
});

module.exports = router;