module.exports = {
  async up(queryInterface/* , Sequelize */) {
    const album99Id = (await queryInterface.sequelize.query(
      'SELECT id FROM "Album" WHERE title = \'99%\'',
    ))[0][0].id;
    const mckId = (await queryInterface.sequelize.query(
      'SELECT id FROM "Artist" WHERE name = \'MCK\'',
    ))[0][0].id;
    const MCKsongs = await queryInterface.sequelize
      .query(`SELECT id FROM "Song" WHERE "AlbumId" = '${album99Id}'`);
    MCKsongs[0].forEach((song) => {
      queryInterface.bulkInsert('SongArtist', [{
        SongId: song.id,
        ArtistId: mckId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    });
    const differentWorldId = (await queryInterface.sequelize.query(
      'SELECT id FROM "Album" WHERE title = \'Different World\'',
    ))[0][0].id;
    const AlanWalkerId = (await queryInterface.sequelize.query(
      'SELECT id FROM "Artist" WHERE name = \'Alan Walker\'',
    ))[0][0].id;
    const AlanWalkersongs = await queryInterface.sequelize
      .query(`SELECT id FROM "Song" WHERE "AlbumId" = '${differentWorldId}'`);
    AlanWalkersongs[0].forEach((song) => {
      queryInterface.bulkInsert('SongArtist', [{
        SongId: song.id,
        ArtistId: AlanWalkerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    });

    const chanGaiId = await queryInterface.sequelize.query(
      'SELECT id FROM "Song" WHERE title = \'Chán gái 707\'',
    );
    const lowGId = await queryInterface.sequelize.query(
      'SELECT id FROM "Artist" WHERE name = \'Low G\'',
    );
    queryInterface.bulkInsert('SongArtist', [{
      SongId: chanGaiId[0][0].id,
      ArtistId: lowGId[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    const coEmId = await queryInterface.sequelize.query(
      'SELECT id FROM "Song" WHERE title = \'Có em\'',
    );
    const madihuId = await queryInterface.sequelize.query(
      'SELECT id FROM "Artist" WHERE name = \'Madihu\'',
    );
    queryInterface.bulkInsert('SongArtist', [{
      SongId: coEmId[0][0].id,
      ArtistId: madihuId[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface/* , Sequelize */) {
    await queryInterface.bulkDelete('SongArtist', null, {});
  },
};
