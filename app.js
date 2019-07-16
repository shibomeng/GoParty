var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");


//MYSQL DB
var initSQL = require('./Database/initDB.js');

initSQL();  

//Requiring routes
var updateRoutes = require("./routes/update"),
    newRoutes = require("./routes/new"),
    authRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

app.use(updateRoutes);
app.use(newRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SEREVER STARTED!!");
});