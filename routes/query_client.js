var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_client", function (req, res) {
    res.render("query_client");
});

router.post("/query_client", function (req, res) {
    var clientID = req.body.ClientID;
    var comparsion = req.body.comparsion;
    var budget = parseFloat(req.body.Budget);
    var phone = req.body.Phone;

    var sql = ' SELECT * FROM CLIENT WHERE (? IS NULL OR Client_ID = ?) AND (? IS NULL OR Phone_Num = ?) ';
    
    var append;
    if (comparsion) {
        if (comparsion === "less") {
            append = "AND (Budget < ?)";
        } else {
            append = "AND (Budget > ?)";
        }
    } else {
        append = "AND (Budget = ?)";
    }
    
    if (!clientID) {
        clientID = null;
    }
    if (!phone) {
        phone = null;
    }
    if (!budget) {
        budget = null;
    } else {
        sql = sql.concat(append);
    }

    connection.query(sql, [clientID, clientID, phone, phone, budget], function (err, rows, fields) {
        if (err) throw err;
        if (rows) {
            req.flash("error", "No Result Found");
        } else {
            req.flash("success", "Check Result Below");
        }
        res.render("query_client", {rows : rows});
    });
});

module.exports = router;