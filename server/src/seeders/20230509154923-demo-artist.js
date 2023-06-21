module.exports = {
  async up(queryInterface/* , Sequelize */) {
    await queryInterface.bulkInsert('Artist', [
      {
        name: 'MCK',
        gender: 'male',
        birthdate: new Date(1992, 2, 2),
        nationality: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Low G',
        gender: 'male',
        birthdate: new Date(1997, 6, 23),
        nationality: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Eminem',
        gender: 'male',
        birthdate: new Date(1972, 7, 16),
        nationality: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Taylor Swirf',
        gender: 'female',
        birthdate: new Date(1989, 11, 13),
        nationality: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Alan Walker',
        gender: 'male',
        birthdate: new Date(1997, 7, 24),
        nationality: 'UK',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Sơn Tùng',
        gender: 'male',
        birthdate: new Date(1994, 6, 5),
        nationality: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Madihu',
        gender: 'male',
        birthdate: new Date(1994, 11, 28),
        nationality: 'Vietnam',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  async down(queryInterface/* , Sequelize */) {
    return queryInterface.bulkDelete('Artist', null, {});
  },
};
