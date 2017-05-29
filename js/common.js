$(document).ready(function(){
	$(".js-phone").mask("+7 (999) 999 - 99 - 99?");
	// Мобильное меню 
	$(".fa-bars").click(function(m){
		m.preventDefault();
		$(".main-menu").slideToggle(500);
	});
	// Конец Мобильное меню

	// вывод блока в каталоге 
	// $(".js-button_1").click(function(z){
	// 	z.preventDefault();
	// 	$(".box2").slideToggle(500);
	// });
	// $(".js-button2").click(function(q){
	// 	q.preventDefault();
	// 	// $(".box2").css("display","none");
	// 	$(".box2").slideUp(500);
	// });

	$('.js-producthide').hide();

	$(".catalog-button a").on('click', function(e){
		e.preventDefault();
		$(this).parents('.box').find('.js-producthide').slideToggle();		
		if ($(this).find('.button-more__txt').text() == 'Свернуть каталог') {
			$(this).find('.button-more__txt').text('ВЕСЬ АССОРТИМЕНТ ПРОДУКЦИИ');
			$('.button-more_active').removeClass('button-more_active');
		}else{
			$(this).find('.button-more__txt').text('Свернуть каталог');			
			$(this).addClass('button-more_active');
		}
	});

	// Конец вывод блока в каталоге

	/*MODAL WINDOW*/
	$('a.js-modal').on("click", function(e){
		e.preventDefault();
		var  id = $(this).attr('href'),
		winW = $(window).width(),
		winH = $(window).height();
		$(id).css("left", winW/2-$(id).innerWidth()/2);
		$(id).css("top", winH/2-$(id).innerHeight()/2);
		$('body').css({
			"overflowY" : "hidden",
			"paddingRight" : "17px"
		});
		$(id).fadeIn();
		$('body').append('<div class="mask" id="js-mask"></div>');
	});

	

	$('body').on("click", ".js-close", function(e){
		e.preventDefault();
		$('#js-mask').remove();
		$('.js-window').hide();
		$('body').removeAttr("style");
	});

	$('body').on("click", "#js-mask", function(){
		$('#js-mask').remove();
		$('.js-window').hide();
		$('body').removeAttr("style");

	});

	/*MODAL SUBMIT*/
	$('.js-submit').submit(function(){
		var phone = $(this).find('input[name="phone"]');
		
		if(phone.val() == ""){
			phone.focus();
			return false;
		}

		else{
			var form_data = $(this).serialize(); 
			$.ajax({
				type: "POST", 
				url: "/message.php", 
				data: form_data,
				success: function(form) {	
					$('.js-window').hide();
					$("input[type=text]").val("");
					$("input[type=email]").val("");
					$("input[type=hidden]").val("");
					$("textarea").val("");
					$('#js-mask').remove();
					$('a[href=#js-form2]').trigger('click');
				// location = "thanks.php";
			}
		});
		}
		return false;
	});


	$('.gototop').on("click", function(e){
		e.preventDefault();
		var scrollTopH = $('body').offset().top;
		$('html, body').animate({
			scrollTop: scrollTopH
		}, 500);
	});
});//END READY


$(document).on("scroll", function(){
	var documentScroll = $(this).scrollTop();
	if(documentScroll > 400 && window.innerWidth < 990){
		$('.gototop').css("display", "block");
	}
	else{
		$('.gototop').css("display", "none");
	}
	
});
	