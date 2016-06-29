$( document ).ready( function($){
	var animado = 1;
	var $viewport = $("html, body");

	$('.persona').hide();
	$('.boton, nav').hide();
	$('.boton').on('click', function(e){
		e.preventDefault();
		var element = $(this).parent().children('.texto');
		if( $(this).parent().hasClass('abierto') ){
			element.stop().animate({'height': 0}, 500, function(){
				$('.abierto').removeClass('abierto');
				$('.texto').each(function() {
					$(this).height(0);
				}); 
				$('.boton, nav').fadeOut( "fast" );
				$viewport.stop().animate({scrollTop: 1}, 500);
				animado = 1;
			});
			$('.adicionales , #i').hide();
		}else{
			$(this).parent().addClass('abierto');
			autoHeightAnimate( element, 500 );
			$('.adicionales , #i ').show();
			$viewport.stop().animate({ scrollTop: parseInt($('.boton').css('top'))-90 }, 500);
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
			$('.info').stop().animate({'height': 0}, 500).removeClass('mostrar');
		}else{
			autoHeightAnimate($('.info'),500);
			console.log( "offset:" , $('.botonc').offset().top-70 );
			$viewport.stop().animate({ scrollTop: parseInt($('.botonc').offset().top-70) }, 500);
			$('.info').addClass('mostrar');
		}
	});

	$('.prev').on('click', function(e){ 
		e.preventDefault();
		var abierto = 0;
		var prev = 0;
		if( $('.persona:visible').prev( '.persona' ).length > 0 ){
			var prev = $('.persona:visible').prev( '.persona' );
		}else{
			var prev = $('.persona:last-of-type');			
		}
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
		var next = 0;
		if( $('.persona:visible').next( '.persona' ).length > 0 ){
			next = $('.persona:visible').next( '.persona' );
		}else{
			next = $('.persona:first-of-type');			
		}
		if( $('.persona:visible').hasClass('abierto') ){
			abierto = 1;
		};
		avanzar();
		if( abierto === 1){
			next.addClass('abierto');
			autoHeightAnimate( next.children( '.texto' ),0);
		}	
	});

	$(window).resize(function(){ 
		ubicarElementos(); 
	});

	$(window).keyup(function( event){
		if(animado == 0){
			if (event.which == 37) {
				$('.next').click();
			}
			if (event.which == 39) {
				$('.prev').click();
			}
		}
	});

	function animar(){
		if( animado == 1 ){
			ubicarElementos();
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

	function ubicarElementos(){
		var altoimagen = $('.persona:visible img').height();
		var altopantalla = $(window).height();
		console.log("redimension");

		if( $('.persona:visible img').height() > 0){
			$('#clickable').css('height', altoimagen );
			if( altoimagen > altopantalla ){
				$('.boton').css( 'top', altopantalla-70 );
			}else{
				$('.boton').css( 'top', altoimagen-70 );
			}
		}
	}

	function retroceder(){
		if( $('.persona:visible').prev('.persona').length != 0 ){
			$('.persona:visible').hide().prev('.persona').show();
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
			$('.texto').stop().animate({'height': 0}, 500, function(){
				$viewport.stop().animate({scrollTop: 1}, 500);
				$('.adicionales , #i').hide();
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
	  	element.stop().stop().animate({ height: autoHeight }, time); // Animate to Auto Height
	}

	/* Function to animate width: auto */
	function autoWidthAnimate(element, time){
		var curwidth = element.width(), // Get Default width
		autoWidth = element.css('width', 'auto').width(); // Get Auto width
	  	element.width(curwidth); // Reset to Default width
	  	element.stop().stop().animate({ width: autoWidth }, time); // Animate to Auto Height
	}

	// Stop the animation if the user scrolls. Defaults on .stop() should be fine
	$viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
	    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
	         $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
	    }
	});    
});