var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/new_order", function(req, res) {
   var sql = "SELECT Client_ID FROM CLIENT"
   connection.query(sql, function (err, results, fields) {
      if (err) throw err;
      console.log(results);
      res.render("new_order", { clientID: results });
   });

  
});

router.post("/new_order", function(req, res) {
    var clientID = req.body.ClientID;
    var orderID = req.body.OrderID;
    var event = req.body.Event;
    var venue = req.body.Venue;

   var sql = "INSERT INTO ORDER_INFO (ORDER_INFO_ID,Client_ID, Budget,Phone_Num, Address) VALUES (?, ?, ?, ?)";
   connection.query(sql, [clientId, budget, phone, address], function (err, result) {
      if (err) throw err;
      console.log("Inserted a new client!");
      req.flash("success", "Successfully Added New Client!");
      res.redirect("/");
   });

});

module.exports = router;