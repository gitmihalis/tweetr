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
    
    // Saves a like to `db`
    saveLike: function(like, callback) {
      db.collection('tweets').findOneAndUpdate({_id: mongo.ObjectID(like.entity_id)},{ 
        $set: { liked_by: { [like.admirer]: Date.now() } },
        $inc: { likes: +1 } }
      );
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection('tweets').find({}).toArray(callback);
    },

  };
}
