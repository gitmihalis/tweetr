/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Escape non-alphanumeric characters
const escape = (str) => {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const timeago = (milliseconds) => {
  const age = Date.now() - milliseconds;
  const aYear = 1000 * 60 * 60 * 24 * 365;
  const aWeek = 1000 * 60 * 60 * 24 * 7;
  const aDay = 1000 * 60 * 60 * 24 * 365;
  const anHour = 1000 * 60 * 60;
  const aMinute = 1000 * 60;
  if ( age < aMinute  ) {
    return `seconds ago`;
  }
  if ( age > aMinute && age < anHour ) {
    return `${Math.ceil(age / 1000 / 60 ).toString()} minutes ago`;
  }
  if ( age > anHour && age < aDay ) {
    return `${Math.ceil(age / 1000 / 60 / 60).toString()} hours ago`;
  }
  if ( age > aDay && age < aWeek ) {
    return `${Math.ceil( age / 1000 / 60 / 60 / 24 ).toString()} days ago`;
  }
  if (age > aWeek && age < aYear) {
    return `${Math.ceil(age / 1000 / 60 / 60 / 24 / 7).toString()} weeks ago`;
  }
  if ( age > aYear ) {
    return `${Math.ceil(age / 1000 / 60 / 60 / 24 / 365).toString()} years ago`;
  }
  return 'Sometime ago'
}

const createTweetElement = (tweet) => {
  const template = `
          <header>
            <img src="${tweet.user.avatars.small}" alt="default avatar">
            <h3>${escape(tweet.user.name)}</h3>
            <span>${escape(tweet.user.handle)}</span>
          </header>
          <div class="content">
            ${escape(tweet.content.text)}
          </div>
          <footer>
            ${timeago(tweet.created_at)}
            <ul class="icon-list hidden">
              <li><i>⚑</i></li>
              <li><i>↻</i></li>
              <li><i class="like">♡</i><span class="like-counter">${tweet.likes}</span></li>
            </ul>
          </footer>
        </article>`;
  const $tweet = $(`<article id="${tweet._id}">`).addClass('tweet').html(template);
  return $tweet; 
}

const renderTweets = (tweets) => {
  // Create and prepend a tweet Element for each tweet
  tweets.forEach( tweet => {
    $('#tweets').prepend( createTweetElement(tweet) );  
  });
  return renderTweets;
}

const loadTweets = () => {
  $.get('/tweets').done(function(data) {
    // populate page with tweets
    $('#tweets').empty();
    renderTweets(data);
  }).fail(function(err) {
    console.error('Could not get tweets :', err);
  });
}

// ========== On document ready   =============
$(document).ready( function(){ 

  $('.new-tweet form').on('submit', function(e) {
    const $this = $(this);
    const $textarea = $this.children('textarea');
    
    e.preventDefault();
    // Remove the previous flash message if present on page.
    $('#flash-message').remove();
    // Validate tweet before we submit
    if ($textarea.val() === null || 
        $textarea.val() === "") {
          $this.closest('main.container')
            .prepend(`<div id="flash-message" class="warning"> 
                        Please fill in your message. 
                     </div>`);
    } else if ( $textarea.val().length > 140 ) {
        $this.closest('main.container')
          .prepend(`<div id="flash-message" class="warning"> 
                      Your tweet is too long.
                    </div>`);
    } else {
      $.post('/tweets', $this.serialize() )
        .done(function() {
          $this.children('textarea').val("");
          loadTweets();
          // append 
        });
    }
  })

  loadTweets(); // Load tweets after the page is loaded.
});