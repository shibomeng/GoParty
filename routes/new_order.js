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

   var sql = "INSERT INTO ORDER_INFO (ORDER_INFO_ID, Client_ID, Num_Of_Invitees, Location,Event_Type) VALUES (?, ?, ?, ?, ?)";
   connection.query(sql, [orderID, clientID, numOfInvitees, venue, event], function (err, result) {
      if (err) {
         req.flash("error", err.sqlMessage);
         res.redirect("/new_order");
         return;
      }
      var id;
      var menu = req.body.Menu;
      var quantity = req.body.MenuQuantity;
      connection.query("SELECT Menu_ID FROM MENU_ITEM WHERE Name = ?", [menu], function(err, id){
         if (err) throw err;
         connection.query("INSERT INTO CONSIST_MENU (Menu_ID, ORDER_INFO_ID,Client_ID,Quantity) VALUES (?,?,?,?)", [id[0].Menu_ID, orderID, clientID, quantity],
            function (err, result) {
               if (err) throw err;
            });
      });
      

      var decor = req.body.FW;
      quantity = req.body.FWQuantity;
      connection.query("SELECT Decor_ID FROM DECOR_ITEM WHERE Name = ?", [decor], function (err, id) {
         if (err) throw err;
         connection.query("INSERT INTO CONSIST_DECOR (Decor_ID, ORDER_INFO_ID,Client_ID,Quantity) VALUES (?,?,?,?)", [id[0].Decor_ID, orderID, clientID, quantity],
            function (err, result) {
               if (err) throw err;
            });
      });
     

      var entertainment = req.body.ME;
      connection.query("SELECT Entertainment_ID FROM ENTERTAINMENT_ITEM WHERE Name = ?", [entertainment], function (err, id) {
         if (err) throw err;
         connection.query("INSERT INTO CONSIST_ENTERTAINMENT (Entertainment_ID, ORDER_INFO_ID,Client_ID) VALUES (?,?,?)", [id[0].Entertainment_ID, orderID, clientID],
            function (err, result) {
               if (err) throw err;
            });
      });

      req.flash("success", "Successfully Added New Order!");
      res.redirect("/");
   });

});

module.exports = router;