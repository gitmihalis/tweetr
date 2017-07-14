$(document).ready(function() {
  console.log('^= likes.js loaded! ')

  $("#tweets").on('click', '.icon-list .like', function(event) {
    const $this = $(this);
    const entityId = $(this).closest("article.tweet").attr('id');
    $.post('/tweets/likes', { entity_id: entityId })
      .done(function() {
        const counter = Number($this.siblings('.like-counter').text());
        $this.text('♥︎')
          .removeClass('like')
          .addClass('liked')
          .siblings('.like-counter')
            .text(counter + 1 );
      })
      .fail(function(err) {
        console.error('Error: Could not like that tweet.');
      });
  });

});