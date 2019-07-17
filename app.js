var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");


//MYSQL DB
var initSQL = require('./Database/initDB.js');

initSQL();  

//Requiring routes
var update_client = require("./routes/update_client"),
    new_client = require("./routes/new_client"),
    index = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

app.use(require("express-session")({
    secret: "dumb",
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(update_client);
app.use(new_client);
app.use(index);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SEREVER STARTED!!");
});