$('document').ready(() => {

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
    $('').addClass('animating transition jiggle');
    $('#get_started_button')
    .transition({
      animation  : 'jiggle',
      duration   : '1s'
    });
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

  $('#logout_button').click((e) => {
    window.open('/logout', '_self');
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

  $('template_link2').click((e) => {

  })

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
      // var contents = $("#printDiv").html();
      //   var frame1 = $('<iframe />');
      //   frame1[0].name = "frame1";
      //   frame1.css({ "position": "absolute", "top": "-1000000px" });
      //   $("body").append(frame1);
      //   var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
      //   frameDoc.document.open();
      //   //Create a new HTML document.
      //   frameDoc.document.write('<html><head><title>DIV Contents</title>');
      //   frameDoc.document.write('</head><body>');
      //   //Append the external CSS file.
      //   frameDoc.document.write('<link href="../static/styles.css" rel="stylesheet" type="text/css" />');
      //   //Append the DIV contents.
      //   frameDoc.document.write(contents);
      //   frameDoc.document.write('</body></html>');
      //   frameDoc.document.close();
      //   setTimeout(function () {
      //       window.frames["frame1"].focus();
      //       window.frames["frame1"].print();
      //       frame1.remove();
      //   }, 500);
  });

  $('#fontify').click(function() {
      $("#print_div").attr('class', 'field font');
  });

  var doc = new jsPDF();
  var specialElementHandlers = {
      '#editor': function (element, renderer) {
          return true;
      }
  };
  // $('#print').click(function () {
  //     doc.fromHTML($('#print_div').html(), 15, 15, {
  //         'width': 170,
  //             'elementHandlers': specialElementHandlers
  //     });
  //     doc.save('sample-file.pdf');
  // });

  function printDiv(){
    var printText=document.getElementById('print_div').innerHTML;
    var newWin=window.open('','Print-Window');
    // newWin.document.open();
    newWin.document.write('<html><head><title>Cool</title>');
    newWin.document.write('<link rel="stylesheet" href="../static/styles.css" type="text/css" />');
    newWin.document.write(`</head><body onload="window.print()"><div class="font">${printText}</div></body></html>`);
    // newWin.document.write();
    // newWin.document.write('');
    newWin.document.close();
    // newWin.focus();
    // setTimeout(function(){
    //   window.print();
    // },5000);
    // newWin.close();
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

  $('#helper_button').mouseenter((e) => {
    $('#helper_text').css('opacity', '1');
  });

  $('#helper_button').mouseleave((e) => {
    $('#helper_text').css('opacity', '0');
  });

  // $('#overlay_buttton').bind("click", () => {
  //   $('#default_button').click();
  // });

});
