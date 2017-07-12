$(function() {
  // When compse button is clicked, toggle the new-tweet section.
  $('#compose-btn').on('click', function(e) {
    $('section.new-tweet').slideToggle('fast');
  })

});