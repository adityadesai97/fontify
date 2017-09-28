$('document').ready(() => {

  let nextJump = 439;

  $(window).scroll(function(e) {
    $('.massive.circular.icon.write').transition('remove looping');
		$('.sun.icon').addClass('loading')
    clearTimeout( $.data( this, "scrollCheck" ) );
    $.data( this, "scrollCheck", setTimeout(function() {
    	$('.sun.icon').removeClass('loading')
    }, 100) );
    var scrollTop = $(window).scrollTop();
    console.log(scrollTop);
    if(scrollTop == 0) {
    }
    else{
      if(scrollTop < 439) {
        nextJump = 439;
      }
      else if(scrollTop < 821) {
        nextJump = 821;
      }
      else if(scrollTop < 1223) {
        nextJump = 1223;
      }
      else if(scrollTop < 1815) {
        nextJump = 1815;
      }
    }
  });

  $('#tp_button').click((e) => {
    if($('#scroll_to_top_button').css('opacity') == 0) {
      $('#scroll_to_top_button').css('opacity', '1')
      $('#next_instruction_button').css('opacity', '1')
    }
    else {
      $('#scroll_to_top_button').css('opacity', '0')
      $('#next_instruction_button').css('opacity', '0')
    }
  });

  $('.massive.circular.icon.write').transition('set looping').transition('jiggle');

  $('.ui.sidebar').sidebar('attach events', '#open_menu');

  $('#upload_button').click((e) => {
    console.log('Clicked');
  });

  $('#brand_name').click((e) => {
    window.open('/', '_self')
  });

  $('#view_button').click((e) => {
    $('html, body').animate({
      scrollTop: $("#step1").offset().top - 200
    }, 1000);
  });

  $("input:file").change(function (){
       var fileName = $(this).val();
       console.log(fileName);
       $('#filename_para').text(fileName.split('\\')[3])
  });

  $('#down_button2').click((e) => {
    $.ajax({
      type: "GET",
      url: "/font",
      success: (data) => {
        console.log(data);
      }
    });
  });

  $('#scroll_to_top_button').click((e) => {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  $('#next_instruction_button').click((e) => {
    var scrollTop = $(window).scrollTop();
    $('html, body').animate({
      scrollTop: nextJump
    }, 1000);
  });

  $('#get_started_button').click((e) => {
    window.open('/step1', '_self');
  });

  $('#text_editor_link').click((e) => {
    console.log("Works");
    window.open('/editor', '_self');
  });

  $('#logout_button').click((e) => {
    window.open('/logout', '_self');
  });

  function ChangeText(elementID, openTag, closeTag) {
    var textArea = $('#' + elementID);
    var len = textArea.val().length;
    var start = textArea[0].selectionStart;
    var end = textArea[0].selectionEnd;
    var selectedText = textArea.val().substring(start, end);
    var replacement = openTag + selectedText + closeTag;
    textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
  }

  $('#bold').click(function() {
      document.execCommand('bold');
  });

  $('#italic').click(function() {
      document.execCommand('italic');
  });

  $('#underline').click(function() {
      document.execCommand('underline');
  });

  $('#copy').click(function() {
      document.execCommand('copy');
  });

  $('#cut').click(function() {
      document.execCommand('cut');
  });

  $('#paste').click(function() {
      document.execCommand('paste');
  });

  $('#strikethrough').click(function() {
      document.execCommand('strikeThrough');
  });

  $('#print').click(function() {
      getUsername();
  });

  $('#fontify').click(function() {
      $("#print_div").attr('class', 'field font');
  });

  function getUsername(){
    $.ajax({
      type:"GET",
      url: "/getusername",
      datatype: "text",
      success: (data) => {
        printDiv(data);
      }
    })
  }

  function printDiv(username) {
    var printText=document.getElementById('print_div').innerHTML;
    var newWin=window.open('','Print-Window');
    newWin.document.write('<html><head><title>Cool</title>');
    // newWin.document.write(`<style>@font-face {font-family: 'userfont';src: URL('/font');}</style>`)
    newWin.document.write('<link rel="stylesheet" href="../static/styles.css" type="text/css" />');
    newWin.document.write(`</head><body><div class="font">${printText}</div></body></html>`);
    newWin.document.write('<script>setTimeout(function(){window.print();},1000)</script>');
    newWin.document.close();
  }

  $("#down_button").click(function() {
    window.open("/static/chargrid.pdf");
    window.open('/step2', '_self');
    $("#next_btn").attr('class', 'ui green button');
  });

  $("#login").click(function() {
    window.open('/login', '_self');
  });

  $("#signup").click(function() {
    window.open('/signup', '_self');
  });

  $("#aboutus").click(function() {
    window.open('/about', '_self');
  });

  $("#journey").click(function() {
    window.open('/journey', '_self');
  });

  $('#helper_button').mouseenter((e) => {
    console.log("blah");
    $('#helper_text').css('opacity', '1');
  });

  $('#helper_button').mouseleave((e) => {
    $('#helper_text').css('opacity', '0');
  });

});
