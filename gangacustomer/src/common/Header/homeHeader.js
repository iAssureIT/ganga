$(function() {
   $("li").click(function() {
      // remove classes from all
      $("li").removeClass("homeHeader");
      // add class to the one we clicked
      $(this).addClass("homeHeader");
   });
});