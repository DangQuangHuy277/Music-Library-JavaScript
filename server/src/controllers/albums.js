/* eslint-disable no-unused-vars */
const { where } = require('sequelize');
const isUUID = require('validator/lib/isUUID');
const { Album, Artist } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const result = await Album.findAll({
      include: [
        {
          model: Artist,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(`Error in getAll Albums controller: ${error.message}`);
  }
};

exports.post = async (req, res) => {
  try {
    const newAlbum = req.body;
    if (newAlbum.title == null || newAlbum.releaseDate == null || newAlbum.artist == null) {
      res.status(422).json({ error: 'title, releaseDate, ArtistId is required' });
    }
    // if (!isUUID(newAlbum.artist)) {
    //   res.status(422).json({ error: 'Invalid artist ID' });
    // }

    const thisArtist = await Artist.findOne(
      {
        where: {
          name: newAlbum.artist,
        },
      },
    );
    console.log(thisArtist);
    if (thisArtist == null) {
      res.status(422).json({ error: 'This Artist doesn\'t exist in database' });
    }

    newAlbum.ArtistId = thisArtist.id;
    const result = await Album.create(newAlbum);
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error in post Albums controller: ${error.message}`);
  }
};

exports.getById = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids, 4)) res.status(400).json({ error: 'Invalid album ID' });
    const result = await Album.findByPk(
      ids,
      {
        include: [
          {
            model: Artist,
            attributes: ['id', 'name'],
          },
        ],
      },
    );
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
    if (!isUUID(ids, 4)) res.status(400).json({ error: 'Invalid album ID' });
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
    if (!isUUID(ids, 4)) res.status(400).json({ error: 'Invalid album ID' });
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
    if (!isUUID(ids, 4)) {
      res.status(400).json({ error: 'Invalid album ID' });
    }
    const result = await Album.findByPk(ids);
    if (result == null) res.status(404).json({ error: 'Album not found' });
    const songs = await result.getSongs({
      include: [
        {
          model: Artist,
          attributes: ['id', 'name'],
        },
        {
          model: Album,
          attributes: ['id', 'title'],
        },
      ],
    });
    res.json(songs);
  } catch (error) {
    console.error(`Error in getAllByAlbumId Song controller: ${error.message}`);
  }
};
