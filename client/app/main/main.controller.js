'use strict';

angular.module('secretLanaApp')
  .factory('posts', ['$http', function($http){
    var o = {
      posts: [
        {title: 'post un', upvotes: 5},
        {title: 'post deux', upvotes: 2},
        {title: 'post three', upvotes: 15},
        {title: 'post quatre', upvotes: 9},
        {title: 'post cinq', upvotes: 4}
      ]
    };
    o.get = function(id) {
      return $http.get('/api/posts/' + id).then(function(res){
        return res.data;
      });
    };
    o.getAll = function() {
      return $http.get('/api/posts/').success(function(data){
        console.log(data);
        angular.copy(data, o.posts);
        console.log(o.posts);
      });
    };
    o.create = function(post) {
      return $http.post('/api/posts/', post).success(function (data) {
        o.posts.push(data);
      });
    };
    o.upvote = function(post) {
      return $http.put('/api/posts/' + post._id + '/upvote', post).success(function(data) {
        console.log(typeof(data));
        post.upvotes += 1;
      });
    };
    o.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comment', comment);
    };
    return o;
  }])
  .controller('PostsCtrl', ['$scope', '$stateParams', 'posts', 'post', function($scope, $stateParams, posts, post){
    $scope.post = post;

    $scope.addComment = function() {
      console.log(post);
      if($scope.body === '') { return; }
      posts.addComment(post.id, {
        body: $scope.body,
        author: 'user',
      });
      $scope.body = '';
    };
  }])
  .controller('MainCtrl', ['$scope', 'posts', function ($scope, posts) {
    $scope.posts = posts.posts;
    $scope.text = 'Rich';
    $scope.addPost = function(){
      if (!$scope.title || $scope.title === '') { return; }
      posts.create({
        title: $scope.title,
        link: $scope.link,
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };
  }]);
