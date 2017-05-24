$(document).ready(function(){
	$(".js-phone").mask("+7 (999) 999 - 99 - 99?");
	// Мобильное меню 
	$(".fa-bars").click(function(m){
		m.preventDefault();
		$(".main-menu").slideToggle(500);
	});
	// Конец Мобильное меню

	// вывод блока в каталоге 
	$(".js-button_1").click(function(z){
		z.preventDefault();
		$(".box2").slideToggle(500);
	});
	$(".js-button2").click(function(q){
		q.preventDefault();
		// $(".box2").css("display","none");
		$(".box2").slideUp(500);
	});
	// Конец вывод блока в каталоге

	/*MODAL WINDOW*/
	$('a.js-modal').on("click", function(e){
		e.preventDefault();
		var  id = $(this).attr('href'),
		winW = $(window).width(),
		winH = $(window).height();
		$(id).css("left", winW/2-$(id).width()/2);
		$(id).css("top", winH/2-$(id).height()/2);
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

	


});//END READY
