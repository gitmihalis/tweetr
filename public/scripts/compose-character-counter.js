console.log("^= compose-character-counter.js loaded successfully")
$(document).ready(function() {
  console.log('^= loaded on document ready');

  $('.new-tweet textarea').keyup( function() { 
    const characterLimit = 140;
    const characterCount = characterLimit - $(this).val().length;
    const $counter = $(this).siblings('.counter');

    $counter.text(characterCount);
    // Change the counter color to red when invalid.
    if (characterCount < 0) {
      $counter.css({ color: 'darkred'});
    } else {
      $counter.css({ color: '#244751'});
    }
  });

  

}); // end 