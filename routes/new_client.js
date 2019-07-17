var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

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
        if (err) throw err;
        console.log("Inserted a new client!");
        req.flash("success", "Successfully Added New Client!");
        res.redirect("/");
    });
    
});

module.exports = router;