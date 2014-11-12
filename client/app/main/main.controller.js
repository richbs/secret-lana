'use strict';

angular.module('secretLanaApp')
  .factory('posts', [function(){
    var o = {
      posts: [
      {title: 'post un', upvotes: 5},
      {title: 'post deux', upvotes: 2},
      {title: 'post three', upvotes: 15},
      {title: 'post quatre', upvotes: 9},
      {title: 'post cinq', upvotes: 4}
    ]
    };
    return o;
  }])
  .controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function() {
      if($scope.body === '') { return; }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
  }]) 
  .controller('MainCtrl', ['$scope', 'posts', function ($scope, posts, $http) {
    $scope.posts = posts.posts;
    $scope.text = 'Rich';
    $scope.addPost = function(){
      if (!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link, 
        upvotes: $scope.title.length, 
        comments: [
          {author: 'Joe', body: 'Nice', upvotes:0},
          {author: 'Bob', body: 'Great work fella', upvotes:0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes +=1;
    };
  }]);
