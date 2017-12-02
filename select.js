var myButton = document.getElementById("filter"); 
myButton.onclick = function() {
var Listings = document.getElementsByClassName("favorite-item");
Listings[0].parentNode.removeChild(Listings[0]);
};

var Highlight = document.getElementById("highlight"); 
Highlight.onclick = function() {
var Yellow = document.getElementsByClassName("favorite-item");
Yellow[0].style.color = "red";
};