var $overlay = $("<div id = 'overlay'></div>)");
	
$("body").append($overlay);

var $image = $("<img>");

$overlay.append($image);

var $exit = $("<img id = 'exitimage'>");

$overlay.append($exit);

$(".item img").click(function(event) {
event.preventDefault();



var imageSource = $(this).attr("src");
$image.attr("src", imageSource);
$exit.attr("src", "images/exit.png");
$exit.remove();

$overlay.show();



});


$("#overlay").click(function(event) {
event.preventDefault();

$($overlay).hide();
});