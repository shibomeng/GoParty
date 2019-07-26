var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_menu_item", function (req, res) {
    var menu;
    connection.query("SELECT NAME FROM MENU_ITEM", function (err, result) {
        if (err) throw err;
        menu = result;
    });
    var decor;
    connection.query("SELECT NAME FROM DECOR_ITEM", function (err, result) {
        if (err) throw err;
        decor = result;
    });
    var entertainment;
    connection.query("SELECT NAME FROM ENTERTAINMENT_ITEM", function (err, result) {
        if (err) throw err;
        entertainment = result;
        res.render("query_menu_item", {menu:menu, decor:decor, entertainment:entertainment})
    });
});

router.post("/query_menu_item", function (req, res) {
    var name = req.body.Name;
    var sql = "SELECT * FROM  SUPPLIER\
                natural join SUPPLY_MENU \
                natural join MENU_ITEM \
                where Name = ? "

    connection.query(sql, [name], function (err, info){
        if (err) throw err;
        var menu;
        connection.query("SELECT NAME FROM MENU_ITEM", function (err, result) {
            if (err) throw err;
            menu = result;
        });
        var decor;
        connection.query("SELECT NAME FROM DECOR_ITEM", function (err, result) {
            if (err) throw err;
            decor = result;
        });
        var entertainment;
        connection.query("SELECT NAME FROM ENTERTAINMENT_ITEM", function (err, result) {
            if (err) throw err;
            entertainment = result;
            console.log(info);
            res.render("query_menu_item", { info: info, menu: menu, decor: decor, entertainment: entertainment })
        });
        
    })

});

module.exports = router;