$(document).ready(function() {
  console.log('^= likes.js loaded! ')

  $("#tweets").on('click', '.icon-list .like', function(event) {
    const id = $(this).closest("article.tweet").attr('id');
    console.log(id);
    $.post('/tweets/like', id)
      .done(function() {

      })
      .fail(function() {
        console.log('i failed to post to /tweets/like');
      });
  });

});