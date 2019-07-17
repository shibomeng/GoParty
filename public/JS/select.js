var MenuQuantity = document.querySelector("#MenuQuantity");
var FWQuantity = document.querySelector("#FWQuantity");
var Menu = document.querySelector("#Menu");
var flower = document.querySelector("#flower");

main();

function main() {
    // MenuQuantity.style.display = "none";
    // FWQuantity.style.display = "none";

    Menu.addEventListener("click", function() {
        if (MenuQuantity.style.display === "none") {
            MenuQuantity.style.display = "block";
        } else {
            MenuQuantity.style.display = "none";
        }
        MenuQuantity.style.borderColor = "red"; 
    });

    flower.addEventListener("click", function() {
        if (FWQuantity.style.display === "none") {
            FWQuantity.style.display = "block";
        } else {
            FWQuantity.style.display = "none";
        }
        FWQuantity.style.borderColor = "red";
    });
}