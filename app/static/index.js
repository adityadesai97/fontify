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

  $('#text_editor_link').click((e) => {
    console.log("Works");
    window.open('/editor', '_self');
  });

  // var textarea = $("#text_field");
  // console.log(textarea);
  // textarea.onselect = function() {
  // var selection = getInputSelection(textarea);
  // var selectedText = textarea.value.slice(selection.start, selection.end);
  // console.log("Selected text: " + selectedText);
  // };

  // $('#bold').click( function() {
  //   $("#text_field").addClass("bold");
  // });

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
      printDiv();
  });

  function printDiv()
{

  var divToPrint=document.getElementById('print_div');

  var newWin=window.open('','Print-Window');

  newWin.document.open();

  newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

  newWin.document.close();

  setTimeout(function(){newWin.close();},10);

}

$("#down_button").click(function() {
  // window.open("http://scruss.com/wordpress/wp-content/uploads/2010/05/chargrid.pdf", "_blank");
  window.open("/static/chargrid.pdf");
  $("#next_btn").attr('class', 'ui button');
});

$("#next_btn").click(function() {
  window.open('/step2', '_self');
});

$("#login").click(function() {
  window.open('/login', '_self');
});

$("#signup").click(function() {
  window.open('/signup', '_self');
});

});
