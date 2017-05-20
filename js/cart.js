jQuery(document).ready(function() {
	
	$('.product__numberinp').on("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});
	$('.product__metr-up').on('click', function () {
		var inpnumber = $('.product__numberinp').val();
		inpnumber = parseFloat(inpnumber);
		if (inpnumber > 0) {
			inpnumber++;
		}
		$('.product__numberinp').val(inpnumber);			
	});
	$('.product__metr-down').on('click', function () {
		var inpnumber = $('.product__numberinp').val();
		x = parseFloat(inpnumber);
		if (inpnumber > 1) {
			inpnumber--;
		}
		$('.product__numberinp').val(inpnumber);		
	});


	$('.product__img-choise img').on('click', function(evt) { 
		evt.preventDefault();       		
		var imgPath = $(this).attr('data-bigimg');         
		var oldImage = $('.product__img img');              
		var newImage = $('<img src="' + imgPath +'">' );	

		$('.activeimg').removeClass('activeimg');
		$(this).addClass('activeimg'); 	

		$(this).parents('.product__leftbox').find('.product__img').html(newImage);		
	});



	$('.product__tablink').on('click', function(e) {
		e.preventDefault();
		var thishref = $(this).attr('href');
		thishref = '.' + thishref;
		$('.product__activeblink').removeClass('product__activeblink');
		$(this).addClass('product__activeblink');        
		$('.product__tabtxt').not(thishref).css({'display':'none'});
		$(thishref).css({'display':'block'});
	});	



		var owlproduct = $(".product__owl-slider");
		owlproduct.owlCarousel({
			loop:true,
			nav:true, 
			autoplay:false,
			smartSpeed:1000,
			margin:25,
			mouseDrag:false,
			touchDrag: false,
			center:false,     //если нужны обрезаные края
			navText:['<span class="productleft"></span>','<span class="productright"></span>'],
			responsive:
			{
				0:{
					items:1
				}, 
				480:{
					items:2
				},      
				800:{
					items:3
				},  
				1200:{
					items:4
				}
			}
	});
	
});