$(document).ready(function() {
		  $("#owl-demo").owlCarousel({
		       autoplay: true, //Set AutoPlay to 3 seconds
		 	   autoplayTimeout:2000,
		       items : 3,
		       loop:true,
		       autoplayHoverPause:true,
		       itemsDesktop : [1199,3],
		       itemsDesktopSmall : [979,3]
		  });
		});