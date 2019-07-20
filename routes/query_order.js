var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_order", function(req, res) {
   var clientID;
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
                  res.render("query_order", {clientID: clientID, Event : Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music});});});});});});
});


router.post("/query_order", function (req, res) {
    var clientID = req.body.ClientID;
    var orderID = (req.body.OrderID ? req.body.OrderID: null);
    var invitee = parseInt(req.body.invitee);
    var comparsion = req.body.comparsion;
    var event = (req.body.Event ? req.body.Event : null);
    var venue = (req.body.Venue ? req.body.Venue : null);
    var menu = req.body.Menu;
    var fw = req.body.FW;
    var me = req.body.ME;

    if (clientID) {
        connection.query("SELECT * FROM ORDER_INFO WHERE ClientID = ?",
        [clientID], function(err, result) {
            if (err) throw err;
            if (result.length == 0) {
                req.flash("error", "No Result Found");
            } else {
                req.flash("success", "Check Result Below");
            }
            res.render("query_order", { result: result });
        });
    } else {
        var sql = 'SELECT * FROM ORDER_INFO WHERE (? is NULL or ORDER_INFO_ID = ?) AND (? is NULL OR Location = ?) AND (? is NULL OR Event_Type = ?)';
        var append;
        if (comparsion) {
            if (comparsion === "less") {
                append = "AND (Num_Of_Invitees < ?)";
            } else {
                append = "AND (Num_Of_Invitees > ?)";
            }
        } else {
            append = "AND (Num_Of_Invitees = ?)";
        }
        if (!invitee) {
            invitee = null;
        } else {
            sql = sql.concat(append);
        }
        connection.query(sql,[orderID, orderID, venue, venue, event,event, invitee],
            function(err, result){
            if (err) throw err;
            if (result.length == 0) {
                req.flash("error", "No Result Found");
            } else {
                req.flash("success", "Check Result Below");
            }
            console.log("success");
            res.render("query_order", { result: result });
        });
    }
});

module.exports = router;