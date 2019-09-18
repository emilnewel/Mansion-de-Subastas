const artService = () => {
  const artDb = require("../data/db").Art;

  const getAllArts = (cb, errorCb) => {
    artDb.find({}, (err, arts) => {
      if (err) {
        throw new Error(err);
      } else {
        cb(arts);
      }
    });
  };

  const getArtById = (id, cb, errorCb) => {
    artDb.findById(id, (err, art) => {
      if (err) {
        errorCb(err);
      } else {
        cb(art);
      }
    });
  };

  const createArt = (art, cb, errorCb) => {
    artDb.create(art, (err, result) => {
        if(err) {
            errorCb(err);
        } else {
            cb(result);
        }
    });
  };

  return {
    getAllArts,
    getArtById,
    createArt
  };
};

module.exports = artService();
