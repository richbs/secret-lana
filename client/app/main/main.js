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
      	templateUrl: '/posts.html',
      	controller: 'PostsCtrl'
      });
  });
