$(document).ready(function() {
  console.log('^= likes.js loaded! ')

  $("#tweets").on('click', '.icon-list .like', function(event) {
    const $this = $(this);
    const entityId = $this.closest("article.tweet").data('id');
    // Store whether||not tweet is already liked
    const isLiked = $this.closest("article.tweet").data('liked') || false;
    $.ajax({
      url: `/tweets/${entityId}/likes`,
      data: { is_liked: isLiked },
      method: "PUT"})
      .done(function() {
        // Set whether||not tweet is liked after db is updated
        let counter = $this.siblings('.like-counter').text();
        counter = Number(counter);
        if (!isLiked) {
          $this.text('♥︎')
            .siblings('.like-counter')
              .text(counter + 1);
          $this.closest("article.tweet").data('liked', true);
        } else {
          $this.text('♡')
            .siblings('.like-counter')
              .text(counter - 1);
          $this.closest("article.tweet").data('liked', false);
        }
      })
      .fail(function(err) {
        console.error('Error: Could not like that tweet.');
      });
  });

});