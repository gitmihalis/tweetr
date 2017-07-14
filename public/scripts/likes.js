$(document).ready(function() {
  console.log('^= likes.js loaded! ')

  $("#tweets").on('click', '.icon-list .like', function(event) {
    const $this = $(this);
    const entityId = $(this).closest("article.tweet").attr('id');
    $.post('/tweets/likes', { entity_id: entityId })
      .done(function() {
        $this.text('♥︎').removeClass('like').addClass('liked');
        console.log(`Ooo-lala. You like ${entityId} 👩‍❤️‍💋‍👨`);
      })
      .fail(function(err) {
        console.error('Error: Could not like that tweet.');
      });
  });

});