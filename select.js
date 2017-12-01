var filterButton = document.getElementById("filter"); 

filterButton.addeventListener("click", fuction() {
var Listings = document.getElementByClassName("favorite-item");
Listings[0].parentNode.removeChild(Listings[0]);
});