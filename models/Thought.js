const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true },
  username: { type: String, required: true },
  reactions: [{
    reactionBody: { type: String, required: true },
    username: { type: String, required: true },
  }],
});

module.exports = mongoose.model('Thought', ThoughtSchema);
