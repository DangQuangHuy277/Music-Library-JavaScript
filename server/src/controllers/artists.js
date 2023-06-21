const { Artist, Album } = require('../models');
const isUUID = require('../lib/uuid-validate');

exports.getAll = async (req, res) => {
  try {
    const result = await Artist.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error in getAll Artist controller: ${error.message}`);
  }
};

exports.post = async (req, res) => {
  try {
    const newArtist = req.body;
    if (!newArtist.name || !newArtist.gender || !newArtist.birthdate) {
      res.status(422).json({ error: 'Missing not null property' });
    }
    const result = await Artist.create(newArtist);
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error in post Artist controller: ${error.message}`);
  }
};

exports.getById = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) res.status(400).json({ error: 'Invalid Artist ID' });
    const result = await Artist.findByPk(ids);
    if (!result) res.status(404).json({ error: 'Artist not found' });
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error in getById Artist controller: ${error.message}`);
  }
};

exports.updateById = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) res.status(400).json({ error: 'Invalid Artist ID' });
    const updatedArtist = req.body;
    if (!updatedArtist.name || !updatedArtist.gender || !updatedArtist.birthdate) {
      res.status(422).json({ error: 'Missing not null property' });
    }
    const thisArtist = await Artist.findByPk(ids);
    if (!thisArtist) res.status(404).json({ error: 'Artist not found' });
    // eslint-disable-next-line no-unused-vars
    const [_, result] = await Artist.update(updatedArtist, {
      where: { id: ids },
      returning: true,
    });
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(`Error in updateById Artist controller: ${error.message}`);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) res.status(400).json({ error: 'Invalid Artist ID' });
    const thisArtist = await Artist.findByPk(ids);
    if (!thisArtist) res.status(404).json({ error: 'Artist not found' });
    await Artist.destroy({ where: { id: ids } });
    res.status(204).end();
  } catch (error) {
    console.error(`Error in deleteById Artist controller: ${error.message}`);
  }
};

exports.getAlbumByArtistId = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) res.status(400).json({ error: 'Invalid Artist ID' });
    const thisArtist = await Artist.findByPk(ids);
    if (thisArtist == null) res.status(404).json({ error: 'Artist not found' });

    const result = await Album.findAll({
      where: {
        ArtistId: ids,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error in getAllByArtistId Albums controller: ${error.message}`);
  }
};

exports.getSongByArtistId = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) {
      res.status(400).json({ error: 'Invalid Artist ID' });
    }
    const thisArtist = await Artist.findByPk(ids);
    if (thisArtist == null) res.status(404).json({ error: 'Artist not found' });
    const songs = await thisArtist.getSongs(
      {
        include: [{
          model: Artist,
          attributes: ['id', 'name'],
        }, {
          model: Album,
          attributes: ['id', 'title'],
        }],
      },

    );
    res.json(songs);
  } catch (error) {
    console.error(`Error in getAllByArtistId Song controller: ${error.message}`);
  }
};
