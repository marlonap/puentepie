$( document ).ready( function($){
	var animado = 1;

	$('.persona').hide();
	$('.boton').css('opacity', 0);

	$('.persona:first-of-type').show();

	setInterval( function(){ animar() }, 200 );
	$('#clickable').on('click', function(){ toggleAnimar() });


	function animar(){
		if( animado == 1 ){
			if( $('.personas img').height() > 0){
				$('#clickable').css('height', $('.personas img').height() );
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
			$('.boton').css('opacity', 1);
		}else{
			animado = 1;
			$('.boton').css('opacity', 0);
		}
	}

});