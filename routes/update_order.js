var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/update_order", function(req, res) {
   var clientID;
   var orderID;
   connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, result) {
       if (err) throw err;
       orderID = result;
   })
   connection.query("SELECT Client_ID FROM CLIENT", function (err, result) {
      if (err) throw err;
      clientID = result;
   });
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
                  res.render("update_order", {orderID : orderID, clientID: clientID, Event : Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music});});});});});});
});

router.post("/update_order", function(req, res) {
   var orderID = (req.body.OrderID ? req.body.OrderID : null);
   var invitee = (parseInt(req.body.invitee) ? parseInt(req.body.invitee) : null);
   var event = (req.body.Event ? req.body.Event : null);
   var venue = (req.body.Venue ? req.body.Venue : null);
   var menu = (req.body.Menu ? req.body.Menu : null);
   var menu_quantity = (req.body.MenuQuantity ? req.body.MenuQuantity : null);
   var fw = (req.body.FW ? req.body.FW : null);
   var flower_quantity = (req.body.FWQuantity ? req.body.FWQuantity : null);
   var me = (req.body.ME ? req.body.ME : null);

   connection.query('select Client_ID from ORDER_INFO where ORDER_INFO_ID = ?', [orderID],
   function (err, rows, fields) {
      var Client_ID = rows[0].Client_ID;
      
      var sql = ' update ORDER_INFO \
                  set Num_Of_Invitees = ? \
                  , Location = ? \
                  , Event_Type = ? \
                  where ORDER_INFO_ID = ? and Client_ID = ?';

      var input = [invitee, venue, event, orderID, Client_ID];

      connection.query(sql, input, function (err, rows, fields) {
         if (err) throw err;
         if (rows.length == 0) {
            req.flash("error", "Failed to update!");
            res.redirect("/home");
         } 
      });

      sql = '  update CONSIST_MENU \
               set Menu_Name = ? \
               , Menu_Quantity = ? \
               where ORDER_INFO_ID = ?';

      input = [menu, menu_quantity, orderID];

      connection.query(sql, input, function (err, rows, fields) {
         if (err) throw err;
         if (rows.length == 0) {
            req.flash("error", "Failed to update!");
            res.redirect("/home");
         } 
      });

      sql = '  update CONSIST_DECOR \
               set Decor_Name = ? \
               , Decor_Quantity = ? \
               where ORDER_INFO_ID = ?';

      input = [fw, flower_quantity, orderID];
      
      connection.query(sql, input, function (err, rows, fields) {
         if (err) throw err;
         if (rows.length == 0) {
            req.flash("error", "Failed to update!");
            res.redirect("/home");
         } 
      });

      sql = '  update CONSIST_ENTERTAINMENT \
               set Entertainment_Name = ? \
               where ORDER_INFO_ID = ?';

      input = [me, orderID];
      
      connection.query(sql, input, function (err, rows, fields) {
         if (err) throw err;
         if (rows.length == 0) {
            req.flash("error", "Failed to update!");
            res.redirect("/home");
         } 
      });

      req.flash("success", "Successfully updated oder information!");
      res.redirect("/home");
      });
});

module.exports = router;