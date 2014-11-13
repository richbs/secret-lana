'use strict';

var _ = require('lodash');
var Comment = require('./Comment.model');

// Get list of Comments
exports.index = function(req, res) {
  Comment.find(function (err, Comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, Comments);
  });
};

// Get a single Comment
exports.show = function(req, res) {
  Comment.findById(req.params.id, function (err, Comment) {
    if(err) { return handleError(res, err); }
    if(!Comment) { return res.send(404); }
    return res.json(Comment);
  });
};

// Creates a new Comment in the DB.
exports.create = function(req, res) {
  Comment.create(req.body, function(err, Comment) {
    if(err) { return handleError(res, err); }
    return res.json(201, Comment);
  });
};

// Updates an existing Comment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, Comment) {
    if (err) { return handleError(res, err); }
    if(!Comment) { return res.send(404); }
    var updated = _.merge(Comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Comment);
    });
  });
};

// Deletes a Comment from the DB.
exports.destroy = function(req, res) {
  Comment.findById(req.params.id, function (err, Comment) {
    if(err) { return handleError(res, err); }
    if(!Comment) { return res.send(404); }
    Comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}