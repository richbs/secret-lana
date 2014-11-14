'use strict';

var express = require('express');
var controller = require('./Comment.controller');
var Comment = require('./Comment.model.js')
var router = express.Router();

router.param('comment', function (req, res, next, id) {
	var query = Comment.findById(id);
	query.exec(function(err, comment){
		if (err) { return next(err); }
		if (!comment) { return res.send(404); }
		req.comment = comment;
		return next();
	});
});

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.put('/:comment/upvote', controller.upvote)
module.exports = router;