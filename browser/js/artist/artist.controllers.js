'use strict';

/* ARTISTS (PLURAL) CONTROLLER */

juke.controller('ArtistsCtrl', function ($scope, $log, ArtistFactory) {

  ArtistFactory.fetchAll()
  .then(function (artists) {
    $scope.artists = artists;
  })
  .catch($log.error);

});

/* ARTIST (SINGULAR) CONTROLLER */

juke.controller('ArtistCtrl', function ($stateParams, $scope, $log, ArtistFactory, PlayerFactory) {


  ArtistFactory.fetchById($stateParams.id)
    .then(function (artist) {
      $scope.artist = artist;
    })
    .catch($log.error);

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.artist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

});
