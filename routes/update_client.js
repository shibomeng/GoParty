var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/update_client", function(req, res) {
   res.render("update_client");
});

router.post("/update_client", function(req, res) {
   var clientId = req.body.ClientID;
   var budget = parseFloat(req.body.Budget);
   var phone = req.body.Phone;
   var address = req.body.Address;

   if (budget) {
      var sql = "UPDATE CLIENT SET Budget = ? WHERE CLIENT_ID = ?" ;
      connection.query(sql, [budget, clientId], function (err, result) {
         if (err) throw err;
         console.log("Update Budget of client!");
      });
   }
   
   if (phone) {
      var sql = "UPDATE CLIENT SET Phone_Num = ? WHERE CLIENT_ID = ?";
      connection.query(sql, [phone, clientId], function (err, result) {
         if (err) throw err;
         console.log("Update phone num of client!");
      });
   }

   if (address) {
      var sql = "UPDATE CLIENT SET Address = ? WHERE CLIENT_ID = ?";
      connection.query(sql, [address, clientId], function (err, result) {
         if (err) throw err;
         console.log("Update address of client!");
      });
   }


});

module.exports = router;