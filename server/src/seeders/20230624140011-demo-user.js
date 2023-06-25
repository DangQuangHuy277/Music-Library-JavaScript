/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface/* , Sequelize */) {
    await queryInterface.bulkInsert('User', [
      {
        username: 'admin1',
        email: 'admin1@test.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin2',
        email: 'admin2@test.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user1',
        email: 'user1@test.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user2',
        email: 'user2@test.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface/* , Sequelize */) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {});
  },
};
