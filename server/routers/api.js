const express = require('express');
const SongController = require('../src/controllers/songs');
const AlbumController = require('../src/controllers/albums');
const ArtistController = require('../src/controllers/artists');

const router = express.Router();

router.get('/songs', SongController.getAll);
router.post('/songs', SongController.post);
router.get('/songs/:id', SongController.getById);
router.put('/songs/:id', SongController.updateById);
router.delete('/songs/:id', SongController.deleteById);

router.get('/albums', AlbumController.getAll);
router.post('/albums', AlbumController.post);
router.get('/albums/:id', AlbumController.getById);
router.put('/albums/:id', AlbumController.updateById);
router.delete('/albums/:id', AlbumController.deleteById);

router.get('/artists', ArtistController.getAll);
router.post('/artists', ArtistController.post);
router.get('/artists/:id', ArtistController.getById);
router.put('/artists/:id', ArtistController.updateById);
router.delete('/artists/:id', ArtistController.deleteById);

router.get('/artists/:id/albums', ArtistController.getAlbumByArtistId);
router.get('/artists/:id/songs', ArtistController.getSongByArtistId);
router.get('/albums/:id/songs', AlbumController.getSongByAlbumId);
router.get('/songs/:id/artist', SongController.getArtistBySongId);

module.exports = router;
