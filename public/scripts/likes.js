$(document).ready(function() {
  console.log('^= likes.js loaded! ')

  $("#tweets").on('click', '.icon-list .like', function(event) {
    const entityId = $(this).closest("article.tweet").attr('id');
    console.log(`oooo, you like ${entityId} 👩‍❤️‍💋‍👨`);
    $.post('/tweets/likes', { entity_id: entityId })
      .done(function() {
        console.log('like was posted!')
      })
      .fail(function() {
        console.log('i failed to post to /tweets/like');
      });
  });

});