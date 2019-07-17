var express = require("express");
var router = express.Router();

router.get("/update_order", function(req, res) {
   res.render("update_order");
});

router.post("/update_order", function(req, res) {
   	res.redirect("/")
});

module.exports = router;