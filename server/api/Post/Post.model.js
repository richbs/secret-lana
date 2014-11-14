'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  active: Boolean
});

PostSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

module.exports = mongoose.model('Post', PostSchema);