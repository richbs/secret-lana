'use strict';

angular.module('secretLanaApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.posts = [
      {title: 'post un', upvotes: 5},
      {title: 'post deux', upvotes: 2},
      {title: 'post three', upvotes: 15},
      {title: 'post quatre', upvotes: 9},
      {title: 'post cinq', upvotes: 4}
    ];
    $scope.text = 'Rich';
    $scope.addPost = function(){
      $scope.posts.push({title: 'A new one!', upvotes: 0});
    };
  });
