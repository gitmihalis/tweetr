$(document).ready(function() {
  
  console.log('^=show-icon-list-on-hover.js loaded!')
  const $tweetContainer = $('#tweets');

  $tweetContainer.on('mouseenter', ".tweet", function(event) {
    // when we mouse over the tweet, we want to change the css opacity prop of .icon-list
    $(this).find('ul.icon-list').removeClass('hidden'); 
  });

  $tweetContainer.on('mouseleave', function(event) {
    $(this).find('ul.icon-list').addClass('hidden');
  });

})