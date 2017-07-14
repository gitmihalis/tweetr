$(document).ready(function() {
  console.log('^= likes.js loaded! ')

  $("#tweets").on('click', '.icon-list .like', function(event) {
    const $this = $(this);
    const entityId = $this.closest("article.tweet").attr('id');
    // Store whether||not tweet is already liked
    const isLiked = $this.closest("article.tweet").data('liked') || false;

    $.post('/tweets/likes', { entity_id: entityId, is_liked: isLiked })
      .done(function() {
        // Set whether||not tweet is liked
        if (!isLiked) {
          $this.closest("article.tweet").data('liked', true);
          console.log($this.closest("article.tweet").data());
        } else {
          $this.closest("article.tweet").data('liked', false);
          console.log($this.closest("article.tweet").data());
        }
        const counter = Number($this.siblings('.like-counter').text());
        $this.text('♥︎')
          .siblings('.like-counter')
            .text(counter + 1 );
      })
      .fail(function(err) {
        console.error('Error: Could not like that tweet.');
      });
  });

});