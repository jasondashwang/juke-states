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

  .state('artist.albums', {

    url:'/artists/:id/albums',
    templateUrl:'../states/artist.albums.html',
    resolve: {
      albums : function (AlbumFactory, $stateParams){
        return AlbumFactory.fetchByArtistId($stateParams.id)
      }
    },
    controller: function ($stateParams, $scope, $log, PlayerFactory, albums) {

          $scope.albums = albums;

      }

  })

  .state('artist.songs', {

    url:'/artists/:id/songs',
    templateUrl: '../states/artist.songs.html',
    resolve: {
      songs: function (ArtistFactory, $stateParams, $http){
        //requesting bad route would cause a silent error
        return ArtistFactory.fetchSongsById($stateParams.id)
      }
    },
    controller: function ($stateParams, $scope, $log, PlayerFactory, songs) {

        // ArtistFactory.fetchSongsById($stateParams.id)
        // .then(function (songs) {
        //   $scope.songs = songs;
        // })
        // .catch($log.error);
        $scope.songs = songs
         // $log service can be turned on and off; also, pre-bound
         $scope.getCurrentSong = function() {
           return PlayerFactory.getCurrentSong();
         };

         $scope.isPlaying = function(song) {
           return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
         };

         $scope.toggle = function(song) {
           if (song !== PlayerFactory.getCurrentSong()) {
             PlayerFactory.start(song, $scope.songs);
           } else if (PlayerFactory.isPlaying()) {
             PlayerFactory.pause();
           } else {
             PlayerFactory.resume();
           }
         };

      }
  })

});
