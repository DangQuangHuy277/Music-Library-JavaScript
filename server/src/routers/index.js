const express = require('express');
const SongController = require('../controllers/songs');
const AlbumController = require('../controllers/albums');
const ArtistController = require('../controllers/artists');
const isAdministrator = require('../middlewares/isAdministrator');

const router = express.Router();

router.get('/songs', SongController.getAll);
router.post('/songs', isAdministrator, SongController.post);
router.get('/songs/:id', SongController.getById);
router.patch('/songs/:id', isAdministrator, SongController.updateById);
router.delete('/songs/:id', isAdministrator, SongController.deleteById);

router.get('/albums', AlbumController.getAll);
router.post('/albums', isAdministrator, AlbumController.post);
router.get('/albums/:id', AlbumController.getById);
router.patch('/albums/:id', isAdministrator, AlbumController.updateById);
router.delete('/albums/:id', isAdministrator, AlbumController.deleteById);

router.get('/artists', ArtistController.getAll);
router.post('/artists', isAdministrator, ArtistController.post);
router.get('/artists/:id', ArtistController.getById);
router.patch('/artists/:id', ArtistController.updateById);
router.delete('/artists/:id', isAdministrator, ArtistController.deleteById);

router.get('/artists/:id/albums', ArtistController.getAlbumByArtistId);
router.get('/artists/:id/songs', ArtistController.getSongByArtistId);
router.get('/albums/:id/songs', AlbumController.getSongByAlbumId);
router.get('/songs/:id/artist', SongController.getArtistBySongId);

module.exports = router;
