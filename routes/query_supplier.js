var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_supplier", function(req, res) {
    res.render('query_supplier');
});

router.post("/query_supplier", function(req, res) {
    var select = req.body.good;
    if (select == "Menu") {
        console.log(select);
        var sql = "Select * FROM MENU_ITEM LEFT JOIN SUPPLY_MENU ON\
                    MENU_ITEM.Name = SUPPLY_MENU.Name";
        connection.query(sql, function(err,result){
            if (err) return err;
            console.log(result);
            res.render('query_supplier', {result : result});
        });
    } else if (select == "Flower") {
        console.log(select);
        var sql = "Select * FROM MENU_ITEM LEFT JOIN SUPPLY_MENU ON\
                    MENU_ITEM.Name = SUPPLY_MENU.Name";
        connection.query(sql, function (err, result) {
            if (err) return err;
            console.log(result);
            res.render('query_supplier', { result: result });
        });
    } else if (select == "Entertainment") {
        console.log(select);
        var sql = "Select * FROM MENU_ITEM LEFT JOIN SUPPLY_MENU ON\
                    MENU_ITEM.Name = SUPPLY_MENU.Name";
        connection.query(sql, function (err, result) {
            if (err) return err;
            console.log(result);
            res.render('query_supplier', { result: result });
        });
    } else {
        res.render('query_supplier');
    }
});

module.exports = router;