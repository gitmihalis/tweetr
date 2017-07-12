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
    "created_at": 1461116232227
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
    "created_at": 1461113959088
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
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

const createTweetElement = (tweet) => {
  const template = `
          <header>
            <img src="${tweet.user.avatars.small}" alt="default avatar">
            <h3>${tweet.user.name}</h3>
            <span>${tweet.user.handle}</span>
          </header>
          <div class="content">
            ${tweet.content.text}
          </div>
          <footer>
            ${tweet.created_at} days ago
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
  tweets.forEach( tweet => {
    // calls createTweetElement for each tweet
    $('#tweets').append( createTweetElement(tweet) );  
  });
  return renderTweets;
}


$(function() {
  renderTweets(data);
});