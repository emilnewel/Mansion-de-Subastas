const artistService = () => {
  const artistDb = require("../data/db").Artist;

  const getAllArtists = (cb, errorCb) => {
    artistDb.find({}, (err, artists) => {
      if (err) {
        throw new Error(err);
      }
      cb(artists);
    });
  };

  const getArtistById = (id, cb, errorCb) => {
    artistDb.findById(id, (err, artist) => {
      if (err) {
        errorCb(err);
      } else {
        cb(artist);
      }
    });
  };

  const createArtist = (artist, cb, errorCb) => {
    artistDb.create(artist, (err, result) => {
      if (err) {
        errorCb(err);
      } else {
        cb(result);
      }
    });
  };

  return {
    getAllArtists,
    getArtistById,
    createArtist
  };
};

module.exports = artistService();
