$( document ).ready( function($){
	var animado = 1;

	$('.persona').hide();
	$('.boton').css('opacity', 0);
	$('.persona:first-child').show();
	setInterval( function(){ animar() }, 150 );
	$('.personas img').on('click', function(){ toggleAnimar() });

	function animar(){
		if( animado == 1 ){
			if( $('.persona:visible').next().length != 0 ){
				$('.persona:visible').hide().next().show();
			}else{
				$('.persona:visible').hide();
				$('.persona:first-child').show();
			}
		}
	}

	function toggleAnimar(){
		if( animado == 1 ){
			animado = 0;
			$('.boton').css('opacity', 1);
		}else{
			animado = 1;
			$('.boton').css('opacity', 0);
		}
	}

});