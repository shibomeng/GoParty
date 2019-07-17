var express = require("express");
var router = express.Router();

router.get("/update_client", function(req, res) {
   res.render("update_client");
});

router.post("/update_client", function(req, res) {
   	res.redirect("/")
});

module.exports = router;