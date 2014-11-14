'use strict';

var express = require('express');
var controller = require('./Post.controller');
var Post = require('./Post.model');

var router = express.Router();

router.param('post', function (req, res, next, id) {
	var query = Post.findById(id);
	query.exec(function(err, post){
		if (err) { return next(err); }
		if (!post) { return res.send(404); }
		req.post = post;
		return next();
	});
})

router.get('/', controller.index);
router.get('/:post', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.put('/:post/upvote', controller.upvote);
router.post('/:post/comment', controller.comment);

module.exports = router;