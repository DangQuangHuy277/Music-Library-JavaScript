/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface/* , Sequelize */) {
    await queryInterface.dropTable('User');
  },
};
