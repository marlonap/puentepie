$( document ).ready( function($){
	var animado = 1;

	$('.persona').hide();
	$('.boton').hide();
	$('.boton').on('click', function(e){
		e.preventDefault();
		var element = $(this).parent().children('.texto');
		if( $(this).parent().hasClass('abierto') ){
			element.animate({'height': 0}, 500, function(){
				$(this).parent().removeClass('abierto');
				$('.boton').fadeOut( "fast" );
				$('html, body').animate({scrollTop: 0}, 500);
				animado = 1;
			});
		}else{
			$(this).parent().addClass('abierto');
			autoHeightAnimate( element, 500 );
			$('html, body').animate({ scrollTop: parseInt($('.boton').css('top'))-90 }, 500);
		}
	});
	$('.persona:first-of-type').show();

	setInterval( function(){ animar() }, 200 );
	$('#clickable').on('click', function(){ toggleAnimar() });

	$('.manito img').on('click', function(){ 
		if ($('.manito').hasClass('activo')) {
			$('.manito').removeClass('activo');

		}else{
			$('.manito').addClass('activo');
		}
	});

	$('.botonc img').on('click', function(){
		if ($('.info').hasClass('mostrar')) {
			$('.info').removeClass('mostrar');

		}else{
			$('.info').addClass('mostrar');
		}
	});

	function animar(){
		if( animado == 1 ){
			var altoimagen = $('.personas img').height();
			var altopantalla = $(window).height();

			if( $('.personas img').height() > 0){
				$('#clickable').css('height', altoimagen );
				if( altoimagen > altopantalla ){
					$('.boton').css( 'top', altopantalla-70 );
				}else{
					$('.boton').css( 'top', altoimagen-70 );
				}
			}
			if( $('.persona:visible').next().length != 0 ){
				$('.persona:visible').hide().next().show();
			}else{
				$('.persona:visible').hide();
				$('.persona:first-of-type').show();
			}
		}
	}

	function toggleAnimar(){
		if( animado == 1 ){
			animado = 0;
			$('.boton').fadeIn( "fast" );
		}else{
			$('.texto').animate({'height': 0}, 500, function(){
				$('html, body').animate({scrollTop: 0}, 500);
				$('.boton').fadeOut( "fast");
				$('.abierto').removeClass('abierto');
				animado = 1;
			});
		}
	}

	/* Function to animate height: auto */
	function autoHeightAnimate(element, time){
		var curHeight = element.height(), // Get Default Height
		autoHeight = element.css('height', 'auto').height(); // Get Auto Height
	  	element.height(curHeight); // Reset to Default Height
	  	element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
	}

	/* Function to animate width: auto */
	function autoWidthAnimate(element, time){
		var curwidth = element.width(), // Get Default width
		autoWidth = element.css('width', 'auto').width(); // Get Auto width
	  	element.width(curwidth); // Reset to Default width
	  	element.stop().animate({ width: autoWidth }, time); // Animate to Auto Height
	}
});