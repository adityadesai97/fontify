$('document').ready(() => {

  $('.ui.sidebar').sidebar('attach events', '#open_menu');

  $('#upload_button').click((e) => {
    console.log('Clicked');
  });

  $('#head_container').mouseenter((e) => {
    $('.sun.icon').addClass('loading')
  });

  $('#head_container').mouseleave((e) => {
    $('.sun.icon').removeClass('loading')
  });
});
