$('document').ready(() => {

  $('.massive.circular.icon.write').transition('set looping').transition('jiggle');

  $('.ui.sidebar').sidebar('attach events', '#open_menu');

  $('#upload_button').click((e) => {
    console.log('Clicked');
  });

  $( window ).scroll(() => {
    $('.massive.circular.icon.write').transition('remove looping');
		$('.sun.icon').addClass('loading')
    clearTimeout( $.data( this, "scrollCheck" ) );
    $.data( this, "scrollCheck", setTimeout(function() {
    	$('.sun.icon').removeClass('loading')
    }, 100) );
  });

  $('#get_started_button').click((e) => {
    window.open('/step1', '_self');
  });

});
