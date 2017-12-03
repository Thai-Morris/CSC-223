var food = ['Apple', 'Banana', ' Vegan Pizza', 'Burritos', 'Booty'];
var text = "";
var i;
for (i = 0; i < food.length; i++) {
    text += food[i] + "<br>";
}
document.getElementById("menu").innerHTML = text;



