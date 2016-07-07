'use strict';

juke.factory('ArtistFactory', function ($http, $q, AlbumFactory, SongFactory) {

  var ArtistFactory = {};

  function getData (res) { return res.data; }

  ArtistFactory.fetchAll = function () {
    return $http.get('/api/artists')
    .then(getData);
  };

  ArtistFactory.fetchById = function (id) {
    var url = '/api/artists/' + id;
    return $q.all([$http.get(url), $http.get(url + '/songs'), $http.get(url + '/albums')])
    .then( function (responses) { return responses.map(getData); })
    .then( function (results) {
      var artist = results[0];
      var songs = results[1].map(SongFactory.convert);
      var albums = results[2].map(AlbumFactory.convert);
      artist.songs = songs;
      artist.albums = albums;
      return artist;
    });
  };

  ArtistFactory.fetchSongsById = function (id){
    return $http.get('/api/artists/' + id + '/songs')
    .then (function (res){ return res.data })
    .then(function (songs){
      songs.forEach(function(song){
        song.audioUrl = '/api/songs/' + song.id + '/audio'
      })
      return songs
    })
  }

  return ArtistFactory;

});
