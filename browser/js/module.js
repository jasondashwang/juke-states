'use strict';

var juke = angular.module('juke', ['ui.router']);


juke.config(function($stateProvider){
  $stateProvider.state('albums', {
    url: '/albums',
    templateUrl: '../states/albums.html',

    controller: function ($scope, $log, PlayerFactory, AlbumFactory) {

        AlbumFactory.fetchAll()
        .then(function (albums) {
          $scope.albums = albums;
          console.log(albums);
        })
        .catch($log.error); // $log service can be turned on and off; also, pre-bound

      }
  })
  .state('artists', {
    url: '/artists',
    templateUrl: '../states/artists.html',

    controller: 'ArtistsCtrl'

  })
  .state('album', {
    url: '/albums/:id',
    templateUrl: '../states/album.html',

    controller: 'AlbumCtrl'
  })

  .state('artist', {
    url: '/artists/:id',
    templateUrl: '../states/artist.html',

    controller: 'ArtistCtrl'
  })

});
