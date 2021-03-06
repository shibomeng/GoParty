var connection = require('./DB_Connection.js');

function init() {    
    var client = `create Table if not exists CLIENT(
        Client_ID char(5) primary key,
        Budget decimal(9,2), 
        Phone_Num char(11),
        Address varchar(50),
        CHECK(Budget > 0),
        UNIQUE(Phone_Num, Address)
        )`;

    connection.query(client, function(err, results, fields) {
        if (err) throw err;
    });

    var event = `create Table if not exists EVENT(
        Event_Type varchar(20) primary key
        )`;

    connection.query(event, function(err, results, fields) {
        if (err) throw err;
    });

    var venue = `create Table if not exists VENUE(
        Location varchar(20) primary key
        )`;

    connection.query(venue, function(err, results, fields) {
        if (err) throw err;
    });

    var order_info = `create Table if not exists ORDER_INFO(
        ORDER_INFO_ID char(5) not null,
        Client_ID char(5) not null,
        ORDER_INFO_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
        Num_Of_Invitees INT not null check(Num_Of_Invitees > 0),
        Location varchar(20) not null,
        Event_Type varchar(20) not null,
        Total_Price decimal(9,2) not null check(Total_Price > 0),
        foreign key (Client_ID) references CLIENT(Client_ID) ON UPDATE CASCADE ON DELETE CASCADE,
        foreign key (Location) references VENUE(Location),
        foreign key (Event_Type) references EVENT(Event_Type),
        primary key(ORDER_INFO_ID, Client_ID),
        UNIQUE(ORDER_INFO_ID)
        )`;
    
    connection.query(order_info, function(err, results, fields) {
        if (err) throw err;
    });
    
    var menu_item = `create Table if not exists MENU_ITEM(
        Name varchar(20) not null primary key,
        Price decimal(9,2) not null check(Price > 0),
        Quantity INT not null check(Quantity > 0)
        )`;

    connection.query(menu_item, function(err, results, fields) {
        if (err) throw err;
    });

    var food = `create Table if not exists FOOD(
        Name char(10) primary key,
        Allergy varchar(50) default 'no',
        foreign key(Name) references MENU_ITEM(Name) ON UPDATE CASCADE ON DELETE CASCADE
        )`;

    connection.query(food, function(err, results, fields) {
        if (err) throw err;
    });

    var drink = `create Table if not exists DRINK(
        Name char(10) primary key,
        Flavour varchar(10) default 'spicy',
        foreign key(Name) references MENU_ITEM(Name) ON UPDATE CASCADE ON DELETE CASCADE
        )`;

    connection.query(drink, function(err, results, fields) {
        if (err) throw err;
    });

    var DECOR_ITEM = `create Table if not exists DECOR_ITEM(
        Name varchar(20) not null primary key,
        Price decimal(9, 2) not null check(Price > 0),
        Quantity INT not null check(Quantity > 0)
        ) `;

    connection.query(DECOR_ITEM, function(err, results, fields) {
        if (err) throw err;
    });

    var flower = `create Table if not exists FLOWER(
        Name char(10) primary key, 
        foreign key(Name) references DECOR_ITEM(Name) ON UPDATE CASCADE ON DELETE CASCADE
        ) `;

    connection.query(flower, function(err, results, fields) {
        if (err) throw err;
    });

    var decor = `create Table if not exists DECOR(
        Name char(10) primary key,
        foreign key(Name) references DECOR_ITEM(Name) ON UPDATE CASCADE ON DELETE CASCADE
        )`;

    connection.query(decor, function(err, results, fields) {
        if (err) throw err;
    });

    var music_entertainment = `create Table if not exists ENTERTAINMENT_ITEM(
        Name varchar(20) not null primary key,
        Price decimal(9,2) not null check(Price > 0)
        )`;

    connection.query(music_entertainment, function(err, results, fields) {
        if (err) throw err;
    });
    
    var music = `create Table if not exists MUSIC(
        Name char(10) primary key,
        foreign key(Name) references ENTERTAINMENT_ITEM(Name) ON UPDATE CASCADE ON DELETE CASCADE
        )`;

    connection.query(music, function(err, results, fields) {
        if (err) throw err;
    });

    var dance = `create Table if not exists DANCE(
        Name char(10) primary key,
        foreign key(Name) references ENTERTAINMENT_ITEM(Name) ON UPDATE CASCADE ON DELETE CASCADE
        )`;

    connection.query(dance, function(err, results, fields) {
        if (err) throw err;
    });

    var CONSIST_MENU = `create Table if not exists CONSIST_MENU(
        Menu_Name char(10) not null,
        ORDER_INFO_ID char(5) not null,
        Client_ID char(5) not null,
        Menu_Quantity INT not null check(Quantity > 0),
        primary key(ORDER_INFO_ID, Client_ID, Menu_Name),
        foreign key (ORDER_INFO_ID, Client_ID) references ORDER_INFO(ORDER_INFO_ID, Client_ID) ON UPDATE CASCADE ON DELETE CASCADE,
        foreign key(Menu_Name) references MENU_ITEM(Name)
        )`;

    connection.query(CONSIST_MENU, function(err, results, fields) {
        if (err) throw err;
    });

    var CONSIST_DECOR = `create Table if not exists CONSIST_DECOR(
        Decor_Name char(10) not null,
        ORDER_INFO_ID char(5) not null,
        Client_ID char(5) not null,
        Decor_Quantity INT not null check(Quantity > 0),
        primary key (ORDER_INFO_ID, Client_ID, Decor_Name),
        foreign key (ORDER_INFO_ID, Client_ID) references ORDER_INFO(ORDER_INFO_ID, Client_ID) ON UPDATE CASCADE ON DELETE CASCADE,
        foreign key (Decor_Name) references DECOR_ITEM(Name)
        )`;

    connection.query(CONSIST_DECOR, function(err, results, fields) {
        if (err) throw err;
    });

    var CONSIST_ENTERTAINMENT = `create Table if not exists CONSIST_ENTERTAINMENT(
        Entertainment_Name char(10) not null,
        ORDER_INFO_ID char(5) not null,
        Client_ID char(5) not null,
        primary key(ORDER_INFO_ID, Client_ID, Entertainment_Name),
        foreign key (ORDER_INFO_ID, Client_ID) references ORDER_INFO(ORDER_INFO_ID, Client_ID) ON UPDATE CASCADE ON DELETE CASCADE,
        foreign key (Entertainment_Name) references ENTERTAINMENT_ITEM(Name)
        )`;

    connection.query(CONSIST_ENTERTAINMENT, function(err, results, fields) {
        if (err) throw err;
    });

    var supplier = `create Table if not exists SUPPLIER(
        Supplier_Name varchar(10) not null primary key,
        Phone_Num char(11),
        UNIQUE(Phone_Num)
        )`;

    connection.query(supplier, function(err, results, fields) {
        if (err) throw err;
    });

    var SUPPLY_MENU = `create Table if not exists SUPPLY_MENU(
        Menu_Name char(10) primary key,
        Supplier_Name varchar(10) not null,
        foreign key (Menu_Name) references MENU_ITEM(Name),
        foreign key(Supplier_Name) references SUPPLIER(Supplier_Name) ON UPDATE CASCADE ON DELETE CASCADE
        )`;

    connection.query(SUPPLY_MENU, function(err, results, fields) {
        if (err) throw err;
    });

    var SUPPLY_DECOR = `create Table if not exists SUPPLY_DECOR(
        Decor_Name char(10) primary key,
        Supplier_Name varchar(10) not null,
        foreign key(Supplier_Name) references SUPPLIER(Supplier_Name) ON UPDATE CASCADE ON DELETE CASCADE,
        foreign key(Decor_Name) references DECOR_ITEM(Name) 
        )`;

    connection.query(SUPPLY_DECOR, function(err, results, fields) {
        if (err) throw err;
    });

    var SUPPLY_ENTERTAINMENT = `create Table if not exists SUPPLY_ENTERTAINMENT(
        Entertainment_Name char(10) primary key,
        Supplier_Name varchar(10) not null,
        foreign key(Supplier_Name) references SUPPLIER(Supplier_Name) ON UPDATE CASCADE ON DELETE CASCADE,
        foreign key(Entertainment_Name) references ENTERTAINMENT_ITEM(Name)
        )`;

    connection.query(SUPPLY_ENTERTAINMENT, function(err, results, fields) {
        if (err) throw err;
    });           
}

module.exports = init;