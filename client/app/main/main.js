'use strict';

angular.module('secretLanaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/main.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
      	url: '/posts/{id}',
      	templateUrl: 'app/main/posts.html',
      	controller: 'PostsCtrl'
      });
  });
