var OrderID = document.querySelector("#OrderID");
var ClientID = document.querySelector("#ClientID");


OrderID.addEventListener("focus", function() {
    ClientID.style.display = "none";
});

OrderID.addEventListener("focusout", function() {
    if (this.value) {
        ClientID.style.display = "block";
    }
});