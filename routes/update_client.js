var express = require("express");
var router = express.Router();

router.get("/update_client", function(req, res) {
   res.render("update_client");
});

router.post("/update_client", function(req, res) {
   var clientId = req.body.ClientID;
   var budget = parseFloat(req.body.Budget);
   var phone = req.body.Phone;
   var address = req.body.Address;

   var sql = "UPDATE CLIENT SET Budget = ?";
   connection.query(sql, [budget, phone, address], function (err, result) {
      if (err) throw err;
      console.log("Update Budget of client!");
   });

   var sql = "UPDATE CLIENT SET Budget = ?";
   connection.query(sql, [budget, phone, address], function (err, result) {
      if (err) throw err;
      console.log("Update Budget of client!");
   });
});

module.exports = router;