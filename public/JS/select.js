var MenuQuantity = document.querySelector("#MenuQuantity");
var FWQuantity = document.querySelector("#FWQuantity");
var Menu = document.querySelector("#Menu").options;
var flower = document.querySelector("#flower").options;
var menu_div = document.querySelector("#menu_div");
var flower_div = document.querySelector("#flower_div");

Menu.addEventListener("click", function() {
    console.log(Menu.length);
    for (i = 0; i < Menu.length; i++) {
        if (Menu[i].selected) {
            MenuQuantity.style.display = "block";
        } else if (i == Menu.length - 1) {
            MenuQuantity.style.display = "none";
        }
    }
});

flower.addEventListener("click", function() {
    for (i = 0; i < flower.length; i++) {
        if (flower[i].selected) {
            FWQuantity.style.display = "block";
        } else if (i == flower.length - 1) {
            FWQuantity.style.display = "none";
        }
    }
});