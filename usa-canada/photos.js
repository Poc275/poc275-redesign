$(document).ready(function () {
    $("#controls").on('click', 'span', function () {
        $("#photos-container img").removeClass("opaque");

        var newImageIndex = $(this).index();
        $("#photos-container img").eq(newImageIndex).addClass("opaque");

        $("#controls span").removeClass("photo-selected");
        $(this).addClass("photo-selected");
    });
});


$("#menu").hover(function () {
    $(this).stop().animate({
        bottom: "20px"
    }, 1000, function () { });
}, function () {
    $(this).stop().animate({
        bottom: "-80px"
    }, 1000, function () { });
});