"use strict";
const mongo = require('mongodb');
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },
    
    // Sets a like field on a `tweet`
    setLike: function(like, callback) {
      // query the tweets for the like and add | remove like
      if (like.is_liked === "false") {
        db.collection('tweets').findOneAndUpdate( { _id: mongo.ObjectID(like.entity_id) }, { 
          $set: { liked_by: { [like.admirer]: Date.now() } } 
        });
        console.log('tweet/likes was set')
      } else {
        db.collection('tweets').findOneAndUpdate( {_id: mongo.ObjectID(like.entity_id) }, { 
          $unset: { liked_by: { [like.admirer]: "" } } 
        });
      console.log('tweet/likes was unset')
      }
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection('tweets').find({}).toArray(callback);
    },

  };
}
