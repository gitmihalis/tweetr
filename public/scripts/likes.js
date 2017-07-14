$(document).ready(function() {
  console.log('^= likes.js loaded! ')

  $("#tweets").on('click', '.icon-list .like', function(event) {
    const entityId = $(this).closest("article.tweet").attr('id');
    $.post('/tweets/likes', { entity_id: entityId })
      .done(function() {
        console.log(`Ooo-lala. You like ${entityId} 👩‍❤️‍💋‍👨`);
      })
      .fail(function(err) {
        console.error('Error: Could not like that tweet.');
      });
  });

});