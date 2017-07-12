/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1491116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1499113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts <script>alert('dieshen')</script>schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1499613796368
  }
];

const escape = (str) => {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const parseDate = (milliseconds) => {
  let date = new Date( Date.now() - milliseconds);
  return Math.floor(date / 1000 / 60 / 60 / 24).toString();
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
            ${parseDate(tweet.created_at)} days ago
            <ul class="icon-list">
              <li><img src="/images/filled_flag.png" alt="flag"></li>
              <li><img src="/images/repeat.png" alt="repeat"></li>
              <li><img src="/images/filled_like.png" alt="like"></li>
            </ul>
          </footer>
        </article>`;
  const $tweet = $('<article>').addClass('tweet').html(template);
  return $tweet; 
}
// function renderTweets
const renderTweets = (tweets) => {
  // loops through tweets
  // const renderedTweets;
  tweets.forEach( tweet => {
    // calls createTweetElement for each tweet
    $('#tweets').append( createTweetElement(tweet) );  
  });
  return renderTweets;
}

const loadTweets = () => {
  console.log('loading tweets...')
  $.get('/tweets').done(function(data) {
    // populate page with tweets
    renderTweets(data);
  }).fail(function(err) {
    console.error('Could not get tweets :', err);
  });
}

// This is run after page is loaded.
$(function() {
  $('.new-tweet form').on('submit', function(e) {
    const $this = $(this);
    const $textarea = $this.children('textarea');
    e.preventDefault();
    // Validate form fields are filled 
    if ($textarea.val() === null || 
        $textarea.val() === "") {
          $this.closest('main.container')
            .prepend(`<div class="flash flash-warn">You forgot to type something.</div>`)
            .serialize();
    } 
    if ($textarea) {
      
    }
    $.post('/tweets', $this.serialize() )
      .done(function() {
        $this.children('textarea').val("");
      });
  })
  // renderTweets(data);
  loadTweets();
});