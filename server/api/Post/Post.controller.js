'use strict';

var _ = require('lodash');
var Post = require('./Post.model');
var Comment = require('../Comment/Comment.model')

// Get list of Posts
exports.index = function(req, res) {
  Post.find(function (err, Posts) {
    if(err) { return handleError(res, err); }
    return res.json(200, Posts);
  });
};

// Get a single Post
exports.show = function(req, res) {
  req.post.populate('comments', function(err, post){
    res.json(req.post)
  })
};

// Creates a new Post in the DB.
exports.create = function(req, res) {
  Post.create(req.body, function(err, Post) {
    if(err) { return handleError(res, err); }
    return res.json(201, Post);
  });
};

// Updates an existing Post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, Post) {
    if (err) { return handleError(res, err); }
    if(!Post) { return res.send(404); }
    var updated = _.merge(Post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Post);
    });
  });
};

// Deletes a Post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, Post) {
    if(err) { return handleError(res, err); }
    if(!Post) { return res.send(404); }
    Post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Increments vote count on Post
exports.upvote = function(req, res) {
  req.post.upvote(function(err, post){
    if (err) { return handleError(res, err); }
    res.json(post);
  });
};

// Create comments for Post
exports.comment = function(req, res) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.save(function(err, comment){
    if(err){ return next(err); }
    req.post.comments.push(comment);
    req.post.save(function(err, comment){
      if (err) { return handleError(res, err); }
    });
    res.json(comment);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}