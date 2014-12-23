'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  active: Boolean
});

CommentSchema.methods.upvote = function(c) {
	this.upvotes += 1;
	this.save(c);  
}

module.exports = mongoose.model('Comment', CommentSchema);
