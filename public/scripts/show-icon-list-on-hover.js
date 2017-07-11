$(document).ready(function() {
  console.log('^=show-icon-list-on-hover.js loaded!')
  const $tweet = $('article.tweet');

  $tweet.on('mouseenter', function(event) {
    // when we mouse over the tweet, we want to change the css opacity prop of .icon-list
    $(this).find('ul.icon-list').css({ opacity: 1 });
  });

  $tweet.on('mouseleave', function(event) {
    $(this).find('ul.icon-list').css({ opacity: 0 });
  });

})