var MenuQuantity = document.querySelector("#MenuQuantity");
var FWQuantity = document.querySelector("#FWQuantity");
var Menu = document.querySelector("#Menu");
var flower = document.querySelector("#flower");
var menu_div = document.querySelector("#menu_div");
var flower_div = document.querySelector("#flower_div");

menu_div.addEventListener("click", function() {
    console.log("you");
    for (i = 0; i < Menu.length; i++) {
        if (Menu[i].selected) {
            MenuQuantity.style.display = "block";
            console.log("fuck");
        } else if (i == Menu.length - 1) {
            MenuQuantity.style.display = "none";
        }
    }
});

flower_div.addEventListener("click", function() {
    for (i = 0; i < flower.length; i++) {
        if (flower[i].selected) {
            FWQuantity.style.display = "block";
            console.log("fuck");
        } else if (i == flower.length - 1) {
            FWQuantity.style.display = "none";
        }
    }
});