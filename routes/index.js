var express = require("express");
var router = express.Router();

//landingpage
router.get("/", function(req, res) {
    res.render("index");
});

router.post("/search", function(req, res) {
   res.redirect("new");
});

router.get("/register", function(req, res) {
   res.render("auth/register");
});

router.get("/login", function(req, res) {
   res.render("auth/login");
});


module.exports = router;