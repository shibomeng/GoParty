var express = require("express");
var router = express.Router();

router.get("/query_client", function (req, res) {
    res.render("query_client");
});

router.post("/query_client", function (req, res) {
    var clientID = req.body.ClientID;
    var comparsion = req.body.comparsion;
    var budget = parseFloat(req.body.Budget);
    var phone = req.body.Phone;

    var sql = 'SELECT * FROM CLIENT WHERE CLIENT_ID ? AND PHONE_NUM = ? AND';
    var append ;
    if (comparsion) {
        if (comparsion == "less") {
            append = "<";
        } else {
            append = ">"
        }
    } else {

    }
    res.redirect("/")
});

module.exports = router;