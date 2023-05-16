/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { Song, Artist } = require('../src/models');

chai.use(chaiHttp);
const { expect } = chai;

describe('Songs', () => {
  describe('GET /api/songs', () => {
    before(async () => {
      await Song.create({
        title: 'Test Song',
        genre: 'Test Genre',
        duration: 180,
        link: 'https://www.example.com/test-song',
      });
    });
    after(async () => {
      await Song.destroy({
        where: {
          title: 'Test Song',
        },
      });
    });

    it('should return an array of songs with correct properties', async () => {
      const res = await chai.request(app).get('/api/songs');

      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('array');

      const firstSong = res.body[0];
      expect(firstSong).to.have.property('title');
      expect(firstSong).to.have.property('genre');
      expect(firstSong).to.have.property('duration');
    });
  });

  describe('POST /api/songs', () => {
    afterEach(async () => {
      await Song.destroy({
        where: {
          title: 'New Test Song',
        },
      });
    });
    it('should create a new song', async () => {
      const newSong = {
        title: 'New Test Song',
        genre: 'New Genre',
        duration: 180,
        link: 'https://www.example.com/new-song',
      };

      const res = await chai.request(app)
        .post('/api/songs')
        .send(newSong);

      expect(res).to.have.status(201);

      const createdSong = res.body;
      expect(createdSong).to.have.property('id');
      expect(createdSong).to.have.property('title', newSong.title);
      expect(createdSong).to.have.property('genre', newSong.genre);
      expect(createdSong).to.have.property('duration', newSong.duration);
      expect(createdSong).to.have.property('link', newSong.link);
    });
  });

  describe('GET /songs/:id', () => {
    let song;

    beforeEach(async () => {
      song = await Song.create({
        title: 'New Test Song',
        genre: 'New Genre',
        duration: 180,
        link: 'https://www.example.com/new-song',
      });
    });

    afterEach(async () => {
      await Song.destroy({
        where: {
          title: 'New Test Song',
        },
      });
    });

    it('should return a specific song by ID', async () => {
      const res = await chai.request(app).get(`/api/songs/${song.id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('id').eq(song.id.toString());
      expect(res.body).to.have.property('title').eq(song.title);
    });

    it('should return a 400 error if format id is wrong', async () => {
      const res = await chai.request(app).get('/api/songs/invalidid');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Invalid song ID');
    });

    it('should return a 404 error if the song ID is not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).get(`/api/songs/${nonExistentID}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Song not found');
    });
  });

  describe('put /api/songs/:id', () => {
    let song;

    beforeEach(async () => {
      song = await Song.create({ title: 'Test Song', duration: 180, link: 'https://example.com' });
    });

    afterEach(async () => {
      await Song.destroy({
        where: {
          id: song.id,
        },
      });
    });

    it('should update a specific song by ID', async () => {
      const updatedSong = { title: 'Updated Song', duration: 240, link: 'https://example.com/updated' };
      const res = await chai.request(app).put(`/api/songs/${song.id}`).send(updatedSong);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('id').eq(song.id.toString());
      expect(res.body).to.have.property('title').eq(updatedSong.title);
      expect(res.body).to.have.property('duration').eq(updatedSong.duration);
    });

    it('should return a 400 error if the song ID is not a valid UUID', async () => {
      const updatedSong = { title: 'Updated Song', duration: 240, link: 'https://example.com/updated' };
      const res = await chai.request(app).put('/api/songs/invalid-uuid').send(updatedSong);
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Invalid song ID');
    });

    it('should return a 404 error if the song ID is not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const updatedSong = { title: 'Updated Song', duration: 240, link: 'https://example.com/updated' };
      const res = await chai.request(app).put(`/api/songs/${nonExistentID}`).send(updatedSong);
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Song not found');
    });

    it('should return a 422 error if the title or duration is missing in the request body', async () => {
      const updatedSong = { link: 'https://example.com/updated' };
      const res = await chai.request(app).put(`/api/songs/${song.id}`).send(updatedSong);
      expect(res).to.have.status(422);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Title and duration are required');
    });
  });

  describe('DELETE /api/songs/:id', () => {
    let song;

    beforeEach(async () => {
      song = await Song.create({
        title: 'Test Song',
        genre: 'Test Genre',
        duration: 180,
        link: 'https://www.example.com/test-song',
      });
    });

    afterEach(async () => {
      await Song.destroy({ where: { id: song.id } });
    });

    it('should delete a specific song by ID', async () => {
      const res = await chai.request(app).delete(`/api/songs/${song.id}`);
      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;

      const deletedSong = await Song.findByPk(song.id);
      expect(deletedSong).to.be.null;
    });

    it('should return a 400 error if the song ID is not a valid UUID', async () => {
      const res = await chai.request(app).delete('/api/songs/invalid-uuid');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Invalid song ID');
    });

    it('should return a 404 error if the song ID is not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).delete(`/api/songs/${nonExistentID}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Song not found');
    });
  });

  describe('GET /api/songs/:id/artist', () => {
    let song; let
      artist;
    before(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1990-01-01',
      });
      song = await Song.create({
        title: 'Test Song',
        duration: 180,
        link: 'https://example.com',
        artistId: artist.id,
      });
      artist.addSongs(song);
    });
    after(async () => {
      await Song.destroy({ where: { id: song.id }, cascade: true });
      await Artist.destroy({ where: { id: artist.id }, cascade: true });
    });
    it('should return the artist of a specific song by ID', async () => {
      const res = await chai.request(app).get(`/api/songs/${song.id}/artist`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.have.property('id').eq(artist.id.toString());
      expect(res.body[0]).to.have.property('name').eq(artist.name);
    });
    it('should return a 400 error if the song ID is not a valid UUID', async () => {
      const res = await chai.request(app).get('/api/songs/invalid-uuid/artist');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Invalid song ID');
    });
    it('should return a 404 error if the song ID is not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).get(`/api/songs/${nonExistentID}/artist`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Song not found');
    });
  });
});
