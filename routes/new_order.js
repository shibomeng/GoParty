var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/new_order", function(req, res) {
   connection.query("SELECT Event_Type FROM EVENT", function(err, Event){
      if (err) throw err;
      connection.query("SELECT Location FROM VENUE", function(err, Venue){
         if (err) throw err;
         connection.query("SELECT Name FROM MENU_ITEM", function(err, Menu){
            if (err) throw err;
            connection.query("SELECT Name FROM DECOR_ITEM", function (err, Flower){
               if (err) throw err;
               connection.query("SELECT Name FROM ENTERTAINMENT_ITEM", function (err, Music){
                  if (err) throw err;
                  res.render("new_order", {Event : Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music});});});});});});

});

router.post("/new_order", function(req, res) {
    var clientID = req.body.ClientID;
    var orderID = req.body.OrderID;
    var numOfInvitees = req.body.invitee;
    var event = req.body.Event;
    var venue = req.body.Venue;
    var price;

   var sql = "INSERT INTO ORDER_INFO (ORDER_INFO_ID, Client_ID, Num_Of_Invitees, Location,Event_Type) VALUES (?, ?, ?, ?. ?)";
   connection.query(sql, [orderID, clientId, numOfInvitees, venue, event], function (err, result) {
      if (err) throw err;
      console.log("Inserted a new client!");
      req.flash("success", "Successfully Added New Order!");
      res.redirect("/");
   });

});

module.exports = router;