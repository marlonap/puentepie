$( document ).ready( function($){
	var animado = 1;

	$('.persona').hide();
	$('.boton, nav').hide();
	$('.boton').on('click', function(e){
		e.preventDefault();
		var element = $(this).parent().children('.texto');
		if( $(this).parent().hasClass('abierto') ){
			element.animate({'height': 0}, 500, function(){
				$('.abierto').removeClass('abierto').css({'height', '0'});
				$('.boton, nav').fadeOut( "fast" );
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
			$('.info').animate({'height': 0}, 500).removeClass('mostrar');
		}else{
			autoHeightAnimate($('.info'),500);
			console.log( "offset:" , $('.botonc').offset().top-70 );
			$('html, body').animate({ scrollTop: parseInt($('.botonc').offset().top-70) }, 500);
			$('.info').addClass('mostrar');
		}
	});

	$('.prev').on('click', function(e){ 
		e.preventDefault();
		var abierto = 0;
		var prev = $('.persona:visible').prev( '.persona' ) || $('.persona:last-of-type');
		if( $('.persona:visible').hasClass('abierto') ){
			abierto = 1;
		};
		retroceder();	
		if( abierto === 1){
			prev.addClass('abierto');
			autoHeightAnimate( prev.children( '.texto' ),0);
		}	
	});
	
	$('.next').on('click', function(e){ 
		e.preventDefault();
		var abierto = 0;
		var next = $('.persona:visible').next( '.persona' ) || $('.persona:first-of-type');
		if( $('.persona:visible').hasClass('abierto') ){
			abierto = 1;
		};
		avanzar();
		if( abierto === 1){
			next.addClass('abierto');
			autoHeightAnimate( next.children( '.texto' ),0);
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
			avanzar();
		}
	}

	function avanzar(){
		if( $('.persona:visible').next().length != 0 ){
			$('.persona:visible').hide().next().show();
		}else{
			$('.persona:visible').hide();
			$('.persona:first-of-type').show();
		}
	}

	function retroceder(){
		if( $('.persona:visible').prev('.persona').length != 0 ){
			$('.persona:visible').hide().prev().show();
		}else{
			$('.persona:visible').hide();
			$('.persona:last-of-type').show();
		}
	}

	function toggleAnimar(){
		if( animado == 1 ){
			animado = 0;
			$('.boton, nav').fadeIn( "fast" );
		}else{
			$('.texto').animate({'height': 0}, 500, function(){
				$('html, body').animate({scrollTop: 0}, 500);
				$('.boton, nav').fadeOut( "fast");
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