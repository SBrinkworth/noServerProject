$(document).ready(function() {
var pikachu = $("#pikachu");
var width = pikachu.get(0).width;
var screenWidth = $(window).width();

  function pikachuLeft() {
    $("#pikachu").hide();
    $("#pikachu").animate({
      left: -screenWidth
    }, 5000, pikachuRight);
  }

  function pikachuRight() {
    $("#pikachu").show();
    $("#pikachu").animate({
      left: screenWidth
    }, 10000, pikachuLeft);
  }

  pikachuRight();
});
