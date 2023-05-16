/* eslint-disable consistent-return */
const { Song } = require('../models');
const isUUID = require('../lib/uuid-validate');

exports.getAll = async (req, res) => {
  try {
    const result = await Song.findAll();
    res.json(result);
  } catch (error) {
    console.error(`Error in getAll song controller: ${error.message}`);
  }
};

exports.post = async (req, res) => {
  try {
    const newSong = req.body;
    const result = await Song.create(newSong);
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error in post Song controller: ${error.message}`);
  }
};

exports.getById = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) {
      return res.status(400).json({ error: 'Invalid song ID' });
    }
    const result = await Song.findOne({
      where: {
        id: ids,
      },
    });
    if (result == null) res.status(404).json({ error: 'Song not found' });
    res.json(result);
  } catch (error) {
    console.error(`Error in getById Song controller: ${error.message}`);
  }
};

exports.updateById = async (req, res) => {
  try {
    const ids = req.params.id;
    const updatedSong = req.body;
    if (!isUUID(ids)) {
      return res.status(400).json({ error: 'Invalid song ID' });
    }

    if (updatedSong.title == null || updatedSong.duration == null) {
      return res.status(422).json({ error: 'Title and duration are required' });
    }

    const thisSong = await Song.findOne({
      where: {
        id: ids,
      },
    });
    if (thisSong == null) res.status(404).json({ error: 'Song not found' });

    // eslint-disable-next-line no-unused-vars
    const [_, result] = await Song.update(updatedSong, {
      where: {
        id: ids,
      },
      returning: true,
    });
    res.json(result[0]);
  } catch (error) {
    console.error(`Error in updateById Song controller: ${error.message}`);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) {
      res.status(400).json({ error: 'Invalid song ID' });
      return;
    }
    const thisSong = await Song.findByPk(ids);
    if (thisSong == null) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }
    await Song.destroy({
      where: {
        id: ids,
      },
    });
    res.status(204).json({ message: 'Delete successfully' });
  } catch (error) {
    console.error(`Error in deleteById Song controller: ${error.message}`);
  }
};

exports.getArtistBySongId = async (req, res) => {
  try {
    const ids = req.params.id;
    if (!isUUID(ids)) {
      res.status(400).json({ error: 'Invalid song ID' });
    }
    const thisSong = await Song.findByPk(ids);
    if (thisSong == null) {
      res.status(404).json({ error: 'Song not found' });
    }
    const result = await thisSong.getArtists();
    if (thisSong.length === 0) res.status(404).json({ error: 'Artist not found' });
    res.json(result);
  } catch (error) {
    console.error(`Error in getArtistBySongId Song controller: ${error.message}`);
  }
};
