/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { Artist, Album, Song } = require('../src/models');

chai.use(chaiHttp);
const { expect } = chai;

describe('Artists', () => {
  describe('GET /api/artists', () => {
    before(async () => {
      await Artist.bulkCreate([
        {
          name: 'Test Artist 1',
          gender: 'male',
          birthdate: '1999-01-01',
        }]);
    });
    after(async () => {
      await Artist.destroy({
        where: {
          name: 'Test Artist 1',
        },
      });
    });
    it('should return an array of artist', async () => {
      const res = await chai.request(app).get('/api/artists');

      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('array');

      const firstArtist = res.body[0];
      console.log(firstArtist);
      expect(firstArtist).to.have.property('name');
      expect(firstArtist).to.have.property('gender');
      expect(firstArtist).to.have.property('birthdate');
    });
  });

  describe('POST /api/artists', () => {
    afterEach(async () => {
      await Artist.destroy({
        where: {
          name: 'New Test Artist',
        },
      });
    });
    it('should create a new artist if valid', async () => {
      const newArtist = {
        name: 'New Test Artist',
        gender: 'male',
        birthdate: '1990-01-01',
      };

      const res = await chai.request(app).post('/api/artists').send(newArtist);

      expect(res).to.have.status(201);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal(newArtist.name);
      expect(res.body.gender).to.equal(newArtist.gender);
      expect(res.body.birthdate).to.equal(newArtist.birthdate);
    });
    it('should return 422 error when missing property', async () => {
      const newArtist = {
        name: 'New Test Artist',
      };

      const res = await chai.request(app).post('/api/artists').send(newArtist);

      expect(res).to.have.status(422);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Missing not null property');
    });
  });

  describe('GET /api/artists/:id', () => {
    let artist;
    before(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });
    });
    after(async () => {
      await Artist.destroy({
        where: {
          id: artist.id,
        },
      });
    });
    it('Should return an artist with the given id', async () => {
      const res = await chai.request(app).get(`/api/artists/${artist.id}`);

      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal(artist.name);
      expect(res.body.gender).to.equal(artist.gender);
      expect(res.body.birthdate).to.equal(artist.birthdate);
    });
    it('Should return 400 error if id is not uuid', async () => {
      const res = await chai.request(app).get('/api/artists/123');

      expect(res).to.have.status(400);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid Artist ID');
    });
    it('Should return 404 error if artist not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).get(`/api/artists/${nonExistentID}`);

      expect(res).to.have.status(404);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Artist not found');
    });
  });

  describe('PUT /api/artists/:id', () => {
    let artist;
    before(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });
    });
    after(async () => {
      await Artist.destroy({
        where: {
          id: artist.id,
        },
      });
    });
    it('Should update an artist with the given id', async () => {
      const updatedArtist = {
        name: 'Updated Artist',
        gender: 'female',
        birthdate: '2000-01-01',
      };
      const res = await chai.request(app)
        .put(`/api/artists/${artist.id}`).send(updatedArtist);

      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal(updatedArtist.name);
      expect(res.body.gender).to.equal(updatedArtist.gender);
      expect(res.body.birthdate).to.equal(updatedArtist.birthdate);
    });
    it('Should return 400 error if id is not uuid', async () => {
      const res = await chai.request(app).put('/api/artists/123');

      expect(res).to.have.status(400);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid Artist ID');
    });
    it('Should return 422 error if missing property', async () => {
      const updatedArtist = {
        name: 'Updated Artist',
      };
      const res = await chai.request(app)
        .put(`/api/artists/${artist.id}`).send({ updatedArtist });

      expect(res).to.have.status(422);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Missing not null property');
    });
  });

  describe('DELETE /api/artists/:id', () => {
    let artist;
    before(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });
    });
    after(async () => {
      await Artist.destroy({
        where: {
          id: artist.id,
        },
      });
    });
    it('Should delete an artist with the given id', async () => {
      const res = await chai.request(app).delete(`/api/artists/${artist.id}`);

      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
    });
    it('Should return 400 error if id is not uuid', async () => {
      const res = await chai.request(app).delete('/api/artists/123');

      expect(res).to.have.status(400);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid Artist ID');
    });
    it('Should return 404 error if artist not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).delete(`/api/artists/${nonExistentID}`);

      expect(res).to.have.status(404);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Artist not found');
    });
  });

  describe('GET /api/artists/:id/albums', () => {
    let artist;
    let noAlbumArtist;
    let albums;
    before(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });
      noAlbumArtist = await Artist.create({
        name: 'No Album Artist',
        gender: 'female',
        birthdate: '1999-01-01',
      });
      albums = await Album.bulkCreate([
        {
          title: 'Test Album 1',
          releaseDate: '2019-01-01',
          ArtistId: artist.id,
        },
        {
          title: 'Test Album 2',
          releaseDate: '2019-01-01',
          ArtistId: artist.id,
        },
      ]);
    });
    after(async () => {
      await Album.destroy({
        where: {
          id: albums.map((album) => album.id),
        },
      });
      await Artist.destroy({
        where: {
          id: [artist.id, noAlbumArtist.id],
        },
      });
    });
    it('Should return all albums by artist with the given id', async () => {
      const res = await chai.request(app).get(`/api/artists/${artist.id}/albums`);

      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('array');
      for (let i = 0; i < res.body.length; i += 1) {
        expect(res.body[i]).to.have.property('id');
        expect(res.body[i]).to.have.property('title');
        expect(res.body[i]).to.have.property('releaseDate');
        expect(res.body[i]).to.have.property('ArtistId');
        expect(res.body[i].ArtistId).to.equal(artist.id);
      }
    });
    it('Should return 400 error if id is not uuid', async () => {
      const res = await chai.request(app).get('/api/artists/123/albums');

      expect(res).to.have.status(400);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid Artist ID');
    });
    it('Should return 404 error if artist not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).get(`/api/artists/${nonExistentID}/albums`);

      expect(res).to.have.status(404);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Artist not found');
    });
    it('Should return empty array if artist has no albums', async () => {
      const res = await chai.request(app).get(`/api/artists/${noAlbumArtist.id}/albums`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.be.empty;
    });
  });

  describe('GET /api/artists/:id/songs', () => {
    let artist;
    let noSongArtist;
    let songs;
    before(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });
      noSongArtist = await Artist.create({
        name: 'No Song Artist',
        gender: 'female',
        birthdate: '1999-01-01',
      });
      songs = await Song.bulkCreate([
        {
          title: 'Test Song 1',
          duration: 180,
        },
        {
          title: 'Test Song 2',
          duration: 180,
        },
      ]);
      await artist.addSongs(songs);
    });
    after(async () => {
      await Song.destroy({
        where: {
          id: songs.map((song) => song.id),
        },
        cascade: true,
      });
      await Artist.destroy({
        where: {
          id: [artist.id, noSongArtist.id],
        },
        cascade: true,
      });
    });
    it('Should return all songs by artist with the given id', async () => {
      const res = await chai.request(app).get(`/api/artists/${artist.id}/songs`);

      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('array');
      for (let i = 0; i < res.body.length; i += 1) {
        expect(res.body[i]).to.have.property('id');
        expect(res.body[i]).to.have.property('title');
        expect(res.body[i]).to.have.property('duration');
        // expect(res.body[i]).to.have.property('ArtistId');
        // expect(res.body[i].ArtistId).to.equal(artist.id);
      }
    });
    it('Should return 400 error if id is not uuid', async () => {
      const res = await chai.request(app).get('/api/artists/123/songs');

      expect(res).to.have.status(400);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid Artist ID');
    });
    it('Should return 404 error if artist not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).get(`/api/artists/${nonExistentID}/songs`);

      expect(res).to.have.status(404);
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Artist not found');
    });
    it('Should return empty array if artist has no songs', async () => {
      const res = await chai.request(app).get(`/api/artists/${noSongArtist.id}/songs`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.be.empty;
    });
  });
});
