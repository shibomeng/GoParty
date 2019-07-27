var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_supplier", function(req, res) {
    res.render('query_supplier');
});

router.post("/query_supplier", function(req, res) {
    var select = req.body.good;
    if (select == "Menu") {
        var sql = "Select * FROM MENU_ITEM LEFT JOIN SUPPLY_MENU ON\
                    MENU_ITEM.Name = SUPPLY_MENU.Menu_Name";
        connection.query(sql, function(err,result){
            if (err) return err;
            result.forEach(function(e) {
                delete e.Name;
            });
            res.render('query_supplier', {result : result});
        });
    } else if (select == "Flower") {
        var sql = "Select * FROM MENU_ITEM LEFT JOIN SUPPLY_MENU ON\
                    MENU_ITEM.Name = SUPPLY_MENU.Decor_Name";
        connection.query(sql, function (err, result) {
            if (err) return err;
            res.render('query_supplier', { result: result });
        });
    } else if (select == "Entertainment") {
        var sql = "Select * FROM MENU_ITEM LEFT JOIN SUPPLY_MENU ON\
                    MENU_ITEM.Name = SUPPLY_MENU.Entertainment_Name";
        connection.query(sql, function (err, result) {
            if (err) return err;
            res.render('query_supplier', { result: result });
        });
    }
});

module.exports = router;