var express = require("express");
var router = express.Router();

router.get("/update", function(req, res) {
   res.render("update");
});

router.post("/update", function(req, res) {
   	res.redirct("/")
});

module.exports = router;