"use strict";

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post("/likes", function(req, res) {
    if (!req.body.entity_id) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const like = { admirer: "someUser000", entity_id: req.body.entity_id, is_liked: req.body.is_liked };

    DataHelpers.setLike(like, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
      res.status(201).send();
      }
    })
  })

  return tweetsRoutes;

}
