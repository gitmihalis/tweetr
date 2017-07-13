$(function() {
  // When compse button is clicked, toggle the new-tweet section.
  const $newTweet = $('section.new-tweet');
  $('#compose-btn').on('click', function(e) {
    $('#flash-message').remove();
    if ( $newTweet.is(':hidden') ) {
      $newTweet.slideToggle('fast');
      $newTweet.find('textarea').focus();
    } else {
      $newTweet.find('textarea').blur();
       $newTweet.slideToggle('fast');
    }
  })

});