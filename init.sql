Revised Information:
	1. Create lower-level entities for Menu_Item, Flower/Decor and Entertainment.
	2. Create relations between Order and Menu_Item,
						between Order and Flower/Decor,
						between Order and Entertainment, separately.
	3. Create relations between Supplier and Menu_Item,
						between Supplier and Flower/Decor,
						between Supplier and Entertainment, separately.
	4. Order is a weak entity
	5. Venue, Event, Menu_Item, Flower/Decor and Entertainment are strong entities.



create Table CLIENT(
Client_ID char(5) primary key,
Budget decimal(9,2) not null check(Budget > 0),
Phone_Num char(11),
Address varchar(50),
UNIQUE(Phone_Num, Address)
)

create Table ORDER_INFO(
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
primary key(ORDER_INFO_ID, Client_ID)
)

create Table VENUE(
Location varchar(20) primary key
)

create Table EVENT(
Event_Type varchar(20) primary key
)

create Table MENU_ITEM(
Menu_ID char(10) primary key,
Name varchar(20) not null,
Price decimal(9,2) not null check(Price > 0),
Quantity INT not null check(Quantity > 0),
UNIQUE(Name)
)
 
create Table FOOD(
Menu_ID char(10) primary key,
Allergy varchar(50) default 'no',
foreign key(Menu_ID) references MENU_ITEM(Menu_ID) ON UPDATE CASCADE ON DELETE CASCADE
)

create Table DRINK(
Menu_ID char(10) primary key,
Flavour varchar(10) default 'spicy',
foreign key(Menu_ID) references MENU_ITEM(Menu_ID) ON UPDATE CASCADE ON DELETE CASCADE
)

create Table DECOR_ITEM(
Decor_ID char(10) primary key,
Name varchar(20) not null,
Price decimal(9, 2) not null check(Price > 0)
Quantity INT not null check(Quantity > 0),
UNIQUE(Name)
) 

create Table FLOWER(
Decor_ID char(10) primary key, 
Type varchar(20) not null,
foreign key(Decor_ID) references DECOR_ITEM(Decor_ID) ON UPDATE CASCADE ON DELETE CASCADE
)


create Table DECOR(
Decor_ID char(10) primary key,
Color varchar(10) not null,
foreign key(Decor_ID) references DECOR_ITEM(Decor_ID) ON UPDATE CASCADE ON DELETE CASCADE
)

create Table ENTERTAINMENT_ITEM(
Entertainment_ID char(10) primary key,
Name varchar(20) not null,
Price decimal(9,2) not null check(Price > 0),
UNIQUE(Name)
)

create Table MUSIC(
Entertainment_ID char(10) primary key,
Type varchar(10) not null,
foreign key(Entertainment_ID) references ENTERTAINMENT_ITEM(Entertainment_ID) ON UPDATE CASCADE ON DELETE CASCADE
)

create Table DANCE(
Entertainment_ID char(10) primary key,
Type varchar(10) not null,
foreign key(Entertainment_ID) references ENTERTAINMENT_ITEM(Entertainment_ID) ON UPDATE CASCADE ON DELETE CASCADE
)

create Table CONSIST_MENU(
Menu_ID char(10) not null,
ORDER_INFO_ID char(5) not null,
Client_ID char(5) not null,
primary key(ORDER_INFO_ID, Client_ID, Menu_ID),
foreign key (ORDER_INFO_ID, Client_ID) references ORDER_INFO(ORDER_INFO_ID, Client_ID) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key(Menu_ID) references MENU_ITEM(Menu_ID)
)

create Table CONSIST_DECOR(
Decor_ID char(10) not null,
ORDER_INFO_ID char(5) not null,
Client_ID char(5) not null,
primary key(ORDER_INFO_ID, Client_ID,Decor_ID),
foreign key (ORDER_INFO_ID, Client_ID) references ORDER_INFO(ORDER_INFO_ID, Client_ID) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key (Decor_ID) references DECOR_ITEM(Decor_ID)
)

create Table CONSIST_ENTERTAINMENT(
Entertainment_ID char(10) not null,
ORDER_INFO_ID char(5) not null,
Client_ID char(5) not null,
primary key(ORDER_INFO_ID, Client_ID,Entertainment_ID),
foreign key (ORDER_INFO_ID, Client_ID) references ORDER_INFO(ORDER_INFO_ID, Client_ID) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key (Entertainment_ID) references ENTERTAINMENT_ITEM(Entertainment_ID)
)

create Table SUPPLIER(
Supplier_ID char(10) primary key,
Name varchar(10) not null,
Phone_Num char(11),
UNIQUE(Name, Phone_Num)
)

create Table SUPPLY_MENU(
Menu_ID char(10) primary key,
Supplier_ID char(10) not null,
foreign key (Menu_ID) references MENU_ITEM(Menu_ID),
foreign key(Supplier_ID) references SUPPLIER(Supplier_ID) ON UPDATE CASCADE ON DELETE CASCADE
)

create Table SUPPLY_DECOR(
Decor_ID char(10) primary key,
Supplier_ID char(10) not null,
foreign key(Supplier_ID) references SUPPLIER(Supplier_ID) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key(Decor_ID) references DECOR_ITEM(Decor_ID) 
)

create Table SUPPLY_ENTERTAINMENT(
Entertainment_ID char(10) primary key,
Supplier_ID char(10) not null,
foreign key(Supplier_ID) references SUPPLIER(Supplier_ID) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key(Entertainment_ID) references ENTERTAINMENT_ITEM(Entertainment_ID)
)