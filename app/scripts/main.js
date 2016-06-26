$( document ).ready( function($){
	var animado = 1;

	$('.persona').hide();
	$('.boton').css('opacity', 0);

	$('.persona:first-of-type').show();

	setInterval( function(){ animar() }, 200 );
	$('#clickable').on('click', function(){ toggleAnimar() });


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
			$('.boton').fadeTo( "slow" , 1);
		}else{
			animado = 1;
			$('.boton').fadeTo( "slow" , 0);
		}
	}

});