var canvas = document.getElementById("signature");
const ctx = canvas.getContext("2d");
var $canvas = $("canvas");
var isMousedown = false;
var lastCoord = [];

canvas.addEventListener("mousedown", function(e) {
    isMousedown = true;
    lastCoord = [e.clientX, e.clientY];
});

canvas.addEventListener("mousemove", function(e) {
    if (isMousedown == true) {
        var startingPointX = e.clientX;
        var startingPointY = e.clientY;
        var endingPointX = lastCoord[0];
        var endingPointY = lastCoord[1];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(
            endingPointX - $canvas.offset().left,
            endingPointY - $canvas.offset().top
        );
        ctx.lineTo(
            startingPointX - $canvas.offset().left,
            startingPointY - $canvas.offset().top
        );
        ctx.stroke();
        lastCoord = [e.clientX, e.clientY];
    }

    canvas.addEventListener("mouseup", function() {
        isMousedown = false;
    });
    $("[name=button]").on("click", function() {
        $("[name=signature]").val(canvas.toDataURL());
    });
});
