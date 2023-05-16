module.exports = {
  async up(queryInterface/* , Sequelize */) {
    const mckId = (await queryInterface.sequelize.query(
      'SELECT id FROM "Artist" WHERE name = \'MCK\'',
    ))[0][0].id;
    console.log(mckId);
    const alanId = (await queryInterface.sequelize.query(
      'SELECT id FROM "Artist" WHERE name = \'Alan Walker\';',
    ))[0][0].id;
    console.log(alanId);
    queryInterface.bulkInsert('Album', [{
      title: '99%',
      releaseDate: new Date(2023, 2, 2),
      link: 'https://open.spotify.com/album/1vi1WySkgPGkbR8NnQzlXu?si=QgCejz1FRruMRJuQGM2U3w',
      ArtistId: mckId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Different World',
      releaseDate: new Date(2018, 11, 14),
      link: 'https://open.spotify.com/album/3nzuGtN3nXARvvecier4K0?si=G09QpiUbS0Ku0wwXgexgQg',
      ArtistId: alanId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface/* , Sequelize */) {
    queryInterface.bulkDelete('Album', null, {});
  },
};
