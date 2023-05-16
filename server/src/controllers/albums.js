/* eslint-disable no-unused-vars */
const { Album, Artist } = require('../models');
const isUUID = require('../lib/uuid-validate');

exports.getAll = async (req, res) => {
  try {
    const result = await Album.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error in getAll Albums controller: ${error.message}`);
  }
};

exports.post = async (req, res) => {
  try {
    const newAlbum = req.body;
    if (newAlbum.title == null || newAlbum.releaseDate == null || newAlbum.ArtistId == null) {
      res.status(422).json({ error: 'title, releaseDate, ArtistId is required' });
    }
    if (!isUUID(newAlbum.ArtistId)) {
      res.status(422).json({ error: 'Invalid artist ID' });
    }

    const thisArtist = await Artist.findByPk(newAlbum.ArtistId);
    if (thisArtist == null) {
      res.status(422).json({ error: 'This Artist of ArtistId doesn\'t exist in database' });
    }

    const result = await Album.create(newAlbum);
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error in post Albums controller: ${error.message}`);
  }
};

exports.getById = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) res.status(400).json({ error: 'Invalid album ID' });
    const result = await Album.findByPk(ids);
    if (result == null) res.status(404).json({ error: 'Album not found' });
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error in getById Albums controller: ${error.message}`);
  }
};

exports.updateById = async (req, res) => {
  try {
    const ids = req.params.id;
    const updatedAlbum = req.body;
    if (!isUUID(ids)) res.status(400).json({ error: 'Invalid album ID' });
    if (updatedAlbum.title == null
        || updatedAlbum.releaseDate == null
        || updatedAlbum.ArtistId == null) {
      res.status(422).json({ error: 'title, releaseDate, ArtistId is required' });
    }
    const thisAlbum = await Album.findByPk(ids);
    if (thisAlbum == null) res.status(404).json({ error: 'Album not found' });

    const [_, result] = await Album.update(updatedAlbum, {
      where: {
        id: ids,
      },
      returning: true,
    });
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(`Error in updateById Albums controller: ${error.message}`);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) res.status(400).json({ error: 'Invalid album ID' });
    const thisAlbum = await Album.findByPk(ids);
    if (thisAlbum == null) res.status(404).json({ error: 'Album not found' });
    await Album.destroy({
      where: {
        id: ids,
      },
    });
    res.status(204).json();
  } catch (error) {
    console.error(`Error in deleteById Albums controller: ${error.message}`);
  }
};

exports.getSongByAlbumId = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) {
      res.status(400).json({ error: 'Invalid album ID' });
    }
    const result = await Album.findByPk(ids);
    if (result == null) res.status(404).json({ error: 'Album not found' });
    const songs = await result.getSongs();
    res.json(songs);
  } catch (error) {
    console.error(`Error in getAllByAlbumId Song controller: ${error.message}`);
  }
};
