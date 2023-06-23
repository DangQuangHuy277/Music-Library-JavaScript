/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { Song, Artist, Album } = require('../src/models');

const { expect } = chai;
chai.use(chaiHttp);

describe('Albums', () => {
  describe('GET /api/albums', () => {
    let artist;
    before(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });

      await Album.create({
        title: 'Test Album',
        releaseDate: new Date(),
        link: 'https://example.com/album',
        ArtistId: artist.id,
      });
    });
    after(async () => {
      await Album.destroy({ where: { title: 'Test Album' } });
      await Artist.destroy({ where: { id: artist.id } });
    });
    it('should return a list of all albums', async () => {
      const res = await chai.request(app).get('/api/albums');

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('array');

      const firstAlbum = res.body[0];
      expect(firstAlbum).to.be.an('object');
      expect(firstAlbum).to.have.property('title');
      expect(firstAlbum).to.have.property('ArtistId');
      expect(firstAlbum).to.have.property('releaseDate');
    }).timeout(10000);
  });

  // describe('POST /api/albums', () => {
  //   let artist;

  //   beforeEach(async () => {
  //     artist = await Artist.create({
  //       name: 'Test Artist',
  //       gender: 'male',
  //       birthdate: '1999-01-01',
  //     });
  //   });

  //   afterEach(async () => {
  //     await Album.destroy({ where: { title: 'Test Album' } });
  //     await Artist.destroy({ where: { id: artist.id } });
  //   });

  //   it('should create a new album if valid', async () => {
  //     const newAlbum = {
  //       title: 'Test Album',
  //       releaseDate: new Date(),
  //       link: 'https://example.com/album',
  //       ArtistId: artist.id,
  //     };

  //     const res = await chai.request(app).post('/api/albums').send(newAlbum);

  //     expect(res).to.have.status(201);
  //     expect(res).to.be.json;

  //     const createdAlbum = res.body;
  //     expect(createdAlbum).to.be.an('object');
  //     expect(createdAlbum).to.have.property('id');
  //     expect(createdAlbum.title).to.equal(newAlbum.title);
  //     expect(createdAlbum.releaseDate).to.not.null;
  //   });

  //   it('should return a 422 error if anyone of title,releaseDate is null', async () => {
  //     const newAlbum = {
  //       link: 'https://example.com/album',
  //     };

  //     const res = await chai.request(app).post('/api/albums').send(newAlbum);

  //     expect(res).to.have.status(422);
  //     expect(res).to.be.json;
  //     expect(res.body.error).to.equal('title, releaseDate is required');
  //   });

  //   it('should return a 422 error if ArtistId is invalid', async () => {
  //     const newAlbum = {
  //       title: 'Test Album',
  //       releaseDate: new Date(),
  //       link: 'https://example.com/album',
  //       ArtistId: 'invalid-id',
  //     };

  //     const res = await chai.request(app).post('/api/albums').send(newAlbum);

  //     expect(res).to.have.status(422);
  //     expect(res).to.be.json;
  //     expect(res.body.error).to.equal('Invalid artist ID');
  //   });

  //   it('should return a 422 error if ArtistId don\'t exists', async () => {
  //     const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
  //     const newAlbum = {
  //       title: 'Test Album',
  //       releaseDate: new Date(),
  //       link: 'https://example.com/album',
  //       ArtistId: nonExistentID,
  //     };

  //     const res = await chai.request(app).post('/api/albums').send(newAlbum);
  //     expect(res).to.have.status(422);
  //     expect(res).to.be.json;
  //     expect(res.body.error).to.equal('This Artist of ArtistId doesn\'t exist in database');
  //   });
  // });

  describe('GET /albums/:id', () => {
    let artist;
    let album;

    beforeEach(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });

      album = await Album.create({
        title: 'Test Album',
        releaseDate: new Date(),
        link: 'https://example.com/album',
        ArtistId: artist.id,
      });
    });

    afterEach(async () => {
      await Album.destroy({ where: { id: album.id } });
      await Artist.destroy({ where: { id: artist.id } });
    });

    it('should return a 400 error if format id is wrong', async () => {
      const res = await chai.request(app).get('/api/albums/invalidid');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Invalid album ID');
    });

    it('should return a specific album by ID', async () => {
      const res = await chai.request(app).get(`/api/albums/${album.id}`);

      expect(res).to.have.status(200);
      expect(res).to.be.json;

      const foundAlbum = res.body;
      expect(foundAlbum).to.be.an('object');
      expect(foundAlbum.id).to.equal(album.id);
      expect(foundAlbum.title).to.equal(album.title);
      expect(foundAlbum.releaseDate).to.not.null;
      expect(foundAlbum.link).to.equal(album.link);
      expect(foundAlbum.artistId).to.equal(album.artistId);
    });

    it('should return a 404 error if the album does not exist', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).get(`/api/albums/${nonExistentID}`);

      expect(res).to.have.status(404);
      expect(res).to.be.json;
      expect(res.body.error).to.equal('Album not found');
    });
  });

  describe('patch /albums/:id', () => {
    let artist; let
      album;

    beforeEach(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });

      album = await Album.create({
        title: 'Test Album',
        releaseDate: new Date(),
        link: 'https://example.com/album',
        ArtistId: artist.id,
      });
    });

    afterEach(async () => {
      await Album.destroy({ where: { id: album.id } });
      await Artist.destroy({ where: { id: artist.id } });
    });

    it('should return a 400 error if format id is wrong', async () => {
      const res = await chai.request(app).patch('/api/albums/invalidid');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Invalid album ID');
    });

    it('should update a specific album by ID', async () => {
      const updatedAlbum = {
        title: 'Updated Album',
        releaseDate: new Date(),
        link: 'https://example.com/updated-album',
        ArtistId: artist.id,
      };

      const res = await chai.request(app).patch(`/api/albums/${album.id}`).send(updatedAlbum);

      expect(res).to.have.status(200);
      expect(res).to.be.json;

      const updated = res.body;
      expect(updated).to.be.an('object');
      expect(updated.id).to.equal(album.id);
      expect(updated.title).to.equal(updatedAlbum.title);
      expect(updated.link).to.equal(updatedAlbum.link);
      expect(updated.artistId).to.equal(updatedAlbum.artistId);
    });

    it('should return a 404 error if the album does not exist', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).patch(`/api/albums/${nonExistentID}`).send({
        title: 'Updated Album',
        releaseDate: new Date(),
        link: 'https://example.com/updated-album',
        ArtistId: artist.id,
      });

      expect(res).to.have.status(404);
      expect(res).to.be.json;
      expect(res.body.error).to.equal('Album not found');
    });
  });

  describe('DELETE /api/albums/:id', () => {
    let artist; let
      album;

    beforeEach(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });

      album = await Album.create({
        title: 'Test Album',
        releaseDate: new Date(),
        link: 'https://example.com/album',
        ArtistId: artist.id,
      });
    });

    afterEach(async () => {
      await Album.destroy({ where: { id: album.id } });
      await Artist.destroy({ where: { id: artist.id } });
    });

    it('should delete a specific album by ID', async () => {
      const res = await chai.request(app).delete(`/api/albums/${album.id}`);
      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;

      const deletedalbum = await Album.findByPk(album.id);
      expect(deletedalbum).to.be.null;
    });

    it('should return a 400 error if the album ID is not a valid UUID', async () => {
      const res = await chai.request(app).delete('/api/albums/invalid-uuid');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Invalid album ID');
    });

    it('should return a 404 error if the album ID is not found', async () => {
      const nonExistentID = 'd8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f';
      const res = await chai.request(app).delete(`/api/albums/${nonExistentID}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Album not found');
    });
  });

  describe('GET /api/albums/:id/songs', () => {
    let album; let songs; let
      artist;
    before(async () => {
      artist = await Artist.create({
        name: 'Test Artist',
        gender: 'male',
        birthdate: '1999-01-01',
      });

      album = await Album.create({
        title: 'Test Album',
        releaseDate: new Date(),
        link: 'https://example.com/album',
        ArtistId: artist.id,
      });
      songs = await Song.bulkCreate([
        {
          title: 'Test Song 1',
          duration: 180,
          AlbumId: album.id,
        },
        {
          title: 'Test Song 2',
          duration: 180,
          AlbumId: album.id,
        },
      ]);
    });
    after(async () => {
      await Song.destroy({
        where: { id: songs.map((s) => s.id) },
        cascade: true,
      });
      await Album.destroy({ where: { id: album.id } });
      await Artist.destroy({
        where: { id: artist.id },
        cascade: true,
      });
    });

    it('should return all songs for a specific album', async () => {
      const res = await chai.request(app).get(`/api/albums/${album.id}/songs`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');

      for (let i = 0; i < res.body.length; i += 1) {
        expect(res.body[i].AlbumId).to.equal(album.id);
      }
    });
    it('should return a 400 error if the album ID is not a valid UUID', async () => {
      const res = await chai.request(app).get('/api/albums/invalid-uuid/songs');
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Invalid album ID');
    });
    it('should return a 404 error if the album does not exist', async () => {
      const res = await chai.request(app).get('/api/albums/d8d7ef9c-8f88-4f33-9a3d-9b6f6fbdfe5f/songs');
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eq('Album not found');
    });
  });
});
