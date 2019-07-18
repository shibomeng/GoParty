var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/new_order", function(req, res) {
   res.render("new_order");
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
      req.flash("success", "Successfully Added New Order!");
      res.redirect("/");
   });

});

module.exports = router;